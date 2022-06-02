import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
    logOut,
    selectCurrentToken,
    setCredentials,
} from './redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import axiosConfig from './utils/axiosConfig';
import { useLogoutMutation } from './redux/auth/authApiSlice';

const PersistLogin = () => {
    console.log('refresh coucou');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token: string = useAppSelector(selectCurrentToken);
    const [logout] = useLogoutMutation();

    useEffect(() => {
        const refresh = async () => {
            const controller = new AbortController();
            try {
                const userData = await axiosConfig.get('/auth/refresh', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                    signal: controller.signal,
                });

                if (userData.request.status === 200) {
                    dispatch(setCredentials({ ...userData.data }));
                }
            } catch (error: any) {
                console.log(error);
                if (
                    error.response.status === 403 ||
                    error.response.status === 401
                ) {
                    const result = await logout('').unwrap();
                    console.log(result);
                    dispatch(logOut());
                    navigate('/');
                }
            }

            return () => {
                controller.abort();
            };
        };

        //refresh();
        !token && refresh();
    }, []);

    return <Outlet />;
};

export default PersistLogin;
