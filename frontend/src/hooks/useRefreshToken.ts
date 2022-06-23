import { selectCurrentToken, setCredentials } from '../redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import axios from '../utils/axiosConfig';

const useRefreshToken = () => {
    const token: string = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();

    const refresh = async () => {
        const response = await axios.get('/auth/refresh', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });
        dispatch(
            setCredentials((prev: any) => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return { ...prev, accessToken: response.data.accessToken };
            })
        );
        return response.data.accessToken;
    };
    return refresh;
};

export default useRefreshToken;
