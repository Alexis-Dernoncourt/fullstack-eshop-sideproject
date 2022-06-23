import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
    logOut,
    selectCurrentToken,
    setCredentials,
} from './redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useLogoutMutation } from './redux/auth/authApiSlice';
import { BiLoaderAlt } from 'react-icons/bi';

import useAxiosPrivate from './hooks/useAxiosPrivate';

const PersistLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token: string = useAppSelector(selectCurrentToken);
    const [logout] = useLogoutMutation();
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        const refresh = async () => {
            const controller = new AbortController();
            try {
                const userData = await axiosPrivate.get('/auth/refresh', {
                    signal: controller.signal,
                });

                if (isLoading && userData.request.status === 200) {
                    console.log('C OK');
                    dispatch(setCredentials({ ...userData.data }));
                }
            } catch (error: any) {
                console.log(error);
                if (error.response.status === 403) {
                    const result = await logout('').unwrap();
                    console.log(result);
                    dispatch(logOut());
                    navigate('/');
                }
                if (error.response.status === 401) {
                    dispatch(logOut());
                }
            } finally {
                setIsLoading(false);
            }

            return () => {
                controller.abort();
                setIsLoading(false);
            };
        };

        //refresh();
        !token && refresh();
    }, [dispatch, logout, navigate, token]);

    return isLoading ? (
        <div
            className="loader"
            style={{ marginTop: '10rem', textAlign: 'center' }}
        >
            <BiLoaderAlt
                style={{
                    height: '3.5em',
                    width: '3.5em',
                    color: 'var(--darkblue)',
                }}
            />
        </div>
    ) : (
        <Outlet />
    );
};

export default PersistLogin;
