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
        token: string;
    } = {
        userId: user.userId,
        username: user.username,
        token: user.accessToken,
    };

    const validateEmail = async () => {
        try {
            const validEmail = await dispatch(confirmUserEmail(data));
            if (
                validEmail.meta.requestStatus === 'fulfilled' &&
                validEmail.type === '/user/confirm-email/fulfilled'
            ) {
                toast.success(`${validEmail.payload.message}`);
                navigate('/dashboard');
            } else if (
                validEmail.meta.requestStatus === 'rejected' &&
                validEmail.type === '/user/confirm-email/rejected'
            ) {
                const errorMessage = `${validEmail}`;
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log(error);

            //toast.error(`${error.data.payload.message}`);
        }
    };

    useEffect(() => {
        validateEmail();
    }, []);

    return <></>;
};

export default ConfirmEmail;
