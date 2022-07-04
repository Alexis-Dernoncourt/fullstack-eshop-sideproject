import { useLocation } from 'react-router-dom';
import { ChangeEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from '../../utils/axiosConfig';
import {
    Container,
    Title,
    Form,
    Input,
    Label,
    ErrorSpan,
    FormBtn,
    RegisterLink,
} from '../Login/Login.style';
import { User } from '../../typescript/types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logOut, selectCurrentUser } from '../../redux/auth/authSlice';
import { useLogoutMutation } from '../../redux/auth/authApiSlice';

type FormData = {
    newPassword: string;
};

const ResetPasswordForm = () => {
    const [validPassword, setValidPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const resetToken = location.pathname.split('/')[2];
    console.log(resetToken);

    const user: User = useAppSelector(selectCurrentUser);
    const dispatch = useAppDispatch();
    const [logout] = useLogoutMutation();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormData>({ defaultValues: { newPassword: '' } });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        if (
            data.newPassword.match(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
            )
        ) {
            setIsLoading(true);
            try {
                const result: any = await axios.post(
                    '/auth/update-password',
                    {
                        newPassword: data.newPassword,
                    },
                    {
                        headers: { Authorization: `Bearer ${resetToken}` },
                    }
                );
                console.log(result);
                if (result.status === 200) {
                    toast.success(`${result.data.message}`);
                    reset();
                    if (user) {
                        await logout('').unwrap();
                        dispatch(logOut());
                        toast.success(
                            'Vous êtes déconnecté suite à votre modification de mot de passe. Veuillez vous reconnecter.'
                        );
                        navigate('/login');
                    } else {
                        navigate('/');
                    }
                }
                setIsLoading(false);
            } catch (err: any) {
                console.log(err);
                toast.error(`${err.response?.data?.message}`);
                setIsLoading(false);
            }
        }
    };

    const handleValidInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.name === 'newPassword') {
            if (
                e.target.value.match(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
                )
            ) {
                setValidPassword(true);
                clearErrors('newPassword');
            } else {
                if (e.target.value === '') {
                    setError('newPassword', {
                        type: 'required',
                        message: 'Ce champs est requis.. ',
                    });
                } else {
                    setError('newPassword', {
                        type: 'invalid',
                        message: 'Le mot de passe est invalide. ',
                    });
                    setValidPassword(false);
                }
            }
        }
    };

    return (
        <Container>
            <Title>Entrez votre nouveau mot de passe</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Votre mot de passe
                    <Input
                        className={`${
                            errors &&
                            errors.newPassword &&
                            !validPassword &&
                            'error'
                        }`}
                        type="password"
                        placeholder="Entrez votre nouveau mot de passe..."
                        {...register('newPassword', {
                            onChange: (e) => handleValidInput(e),
                        })}
                    />
                    {errors?.newPassword && !validPassword && (
                        <ErrorSpan>{errors.newPassword.message}</ErrorSpan>
                    )}
                </Label>
                <FormBtn
                    type="submit"
                    disabled={!validPassword || !isDirty || isLoading}
                >
                    {!isLoading ? 'Envoyer' : 'Envoi..'}
                </FormBtn>
                <RegisterLink to="/login" className="link">
                    Retour à la page de connexion
                </RegisterLink>
            </Form>
        </Container>
    );
};

export default ResetPasswordForm;
