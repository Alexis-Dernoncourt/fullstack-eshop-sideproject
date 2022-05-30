import { ChangeEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
    Container,
    Title,
    Form,
    Input,
    Label,
    ErrorSpan,
    FormBtn,
    RegisterLink,
} from '../../pages/Login/Login.style';
import { useAppSelector } from '../../redux/hooks';
import { useUpdatePasswordMutation } from '../../redux/user/userApiSlice';
import {
    selectCurrentToken,
    selectCurrentUser,
} from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User } from '../../typescript/types';

interface FormData {
    password: string;
    passwordUpdate: string;
    userId: string;
}

const PasswordUpdateForm = () => {
    const navigate = useNavigate();
    const [validPassword, setValidPassword] = useState(false);
    const [validNewPassword, setValidNewPassword] = useState(false);
    const user: User = useAppSelector(selectCurrentUser);
    const token: string = useAppSelector(selectCurrentToken);
    const [updatePassword, { isLoading, isError, error }] =
        useUpdatePasswordMutation();
    console.log(isLoading, isError, error);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isDirty },
    } = useForm<FormData>({
        defaultValues: { password: '', passwordUpdate: '' },
    });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        if (
            data.password.match(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
            ) &&
            data.passwordUpdate.match(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
            )
        ) {
            try {
                const dataToSend = {
                    formData: { ...data },
                    token,
                };
                const result = await updatePassword(dataToSend).unwrap();
                console.log(result);
                toast.success(`${result.message}`);
                navigate('/dashboard');
            } catch (err) {
                console.log('erreur..', err);
                toast.error(`${err}`);
            }
        }
    };

    const handleValidPassword: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.name === 'password') {
            if (
                e.target.value.match(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
                )
            ) {
                setValidPassword(true);
                errors?.password && clearErrors('password');
            } else {
                if (e.target.value === '') {
                    setError('password', {
                        type: 'required',
                        message: 'Ce champs est requis. ',
                    });
                } else {
                    setError('password', {
                        type: 'invalid',
                        message: 'Votre mot-de-passe est invalide.',
                    });
                    setValidPassword(false);
                }
            }
        } else if (e.target.name === 'passwordUpdate') {
            if (
                e.target.value.match(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
                )
            ) {
                setValidNewPassword(true);
                errors?.passwordUpdate && clearErrors('passwordUpdate');
            } else {
                if (e.target.value === '') {
                    setError('passwordUpdate', {
                        type: 'required',
                        message: 'Ce champs est requis. ',
                    });
                } else {
                    setError('passwordUpdate', {
                        type: 'invalid',
                        message: 'Votre mot-de-passe est invalide.',
                    });
                    setValidNewPassword(false);
                }
            }
        }
    };

    return (
        <Container>
            <Title>Modifier votre mot-de-passe</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Votre Password :
                    <small style={{ display: 'block' }}>
                        *Entrez votre mot-de-passe initial.
                    </small>
                    <Input
                        className={`${
                            errors &&
                            errors?.password &&
                            !validPassword &&
                            'error'
                        }`}
                        type="password"
                        {...register('password', {
                            required: 'Le mot-de-passe initial est requis.',
                            onChange: (e) => handleValidPassword(e),
                        })}
                    />
                    {errors.password && !validPassword && (
                        <ErrorSpan>
                            {errors && errors.password.message}
                        </ErrorSpan>
                    )}
                </Label>

                <Label>
                    Votre nouveau mot-de-passe :
                    <small style={{ display: 'block' }}>
                        *Au moins 8 caractères, dont 1 majuscule, 1 chiffre et 1
                        caractère spécial.
                    </small>
                    <Input
                        className={`${
                            errors &&
                            errors.passwordUpdate &&
                            !validNewPassword &&
                            'error'
                        }`}
                        type="password"
                        {...register('passwordUpdate', {
                            required: 'Le mot-de-passe est requis.',
                            onChange: (e) => handleValidPassword(e),
                        })}
                    />
                    {errors.passwordUpdate && !validNewPassword && (
                        <ErrorSpan>
                            {errors && errors.passwordUpdate.message}
                        </ErrorSpan>
                    )}
                </Label>
                <input
                    type="hidden"
                    value={user.userId}
                    {...register('userId')}
                />
                <FormBtn
                    type="submit"
                    disabled={!validPassword || !validNewPassword || !isDirty}
                >
                    Modifier le MDP
                </FormBtn>
                <RegisterLink to="/dashboard" className="link">
                    Annuler
                </RegisterLink>
            </Form>
        </Container>
    );
};

export default PasswordUpdateForm;
