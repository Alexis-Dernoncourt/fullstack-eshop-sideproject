import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import toast from 'react-hot-toast';
import { User } from '../../typescript/types';
import {
    selectCurrentToken,
    selectCurrentUser,
    setCredentials,
} from '../../redux/auth/authSlice';
import { useConfirmUserEmailMutation } from '../../redux/user/userApiSlice';

const ConfirmEmail = () => {
    const user: User = useAppSelector(selectCurrentUser);
    const token: string = useAppSelector(selectCurrentToken);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [confirmUserEmail, { isLoading, isError, error }] =
        useConfirmUserEmailMutation();

    const data: {
        userId: string;
        username: string;
        token: string;
    } = {
        userId: user.userId,
        username: user.username,
        token,
    };

    const validateEmail = async () => {
        try {
            const validEmail = await confirmUserEmail(data).unwrap();
            const updatedUser = {
                ...user,
                validatedAccount: true,
            };
            dispatch(setCredentials({ user: updatedUser, accessToken: token }));
            toast.success(`${validEmail.message}`);
            navigate('/dashboard');
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
