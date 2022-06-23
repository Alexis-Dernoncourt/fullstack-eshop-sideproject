import { axiosPrivate } from '../utils/axiosConfig';
import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import { useAppSelector } from '../redux/hooks';
import { selectCurrentToken } from '../redux/auth/authSlice';

const useAxiosPrivate = () => {
    const token: string = useAppSelector(selectCurrentToken);
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config: any) => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log(newAccessToken);
                    prevRequest.headers[
                        'Authorization'
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [token, refresh]);

    return axiosPrivate;
};

export default useAxiosPrivate;
