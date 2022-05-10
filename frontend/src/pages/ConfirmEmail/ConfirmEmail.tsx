import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { confirmUserEmail, selectUser } from '../../redux/userSlice';
import toast from 'react-hot-toast';
import { User } from '../../typescript/types';

const ConfirmEmail = () => {
    const user: User = useAppSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const data: {
        userId: string;
        username: string;
    } = {
        userId: user.userId,
        username: user.username,
    };

    const validateEmail = async () => {
        try {
            const validEmail = await dispatch(confirmUserEmail(data));
            if (
                validEmail.meta.requestStatus !== 'rejected' &&
                validEmail.type !== '/auth/login/rejected' &&
                validEmail.type !== '/auth/login/fulfilled'
            ) {
                toast.success(`${validEmail.payload.message}`);
                navigate('/dashboard');
            } else {
                const errorMessage = `${validEmail}`;
                throw new Error(errorMessage);
            }
        } catch (error) {}
    };

    useEffect(() => {
        validateEmail();
    }, []);

    return <></>;
};

export default ConfirmEmail;
