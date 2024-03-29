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
    ForgotPwd,
} from './Login.style';
import { useAppDispatch } from '../../redux/hooks';
import { setCredentials } from '../../redux/auth/authSlice';
import { useLoginMutation } from '../../redux/auth/authApiSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type FormData = {
    email: string;
    password: string;
};

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [validPassword, setValidPassword] = useState(false);
    const [validEmail, setValidEmail] = useState(false);
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isDirty },
    } = useForm<FormData>({ defaultValues: { email: '', password: '' } });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        if (
            data.email.match(/.+@.+\.[a-zA-Z]{2,}$/) &&
            data.password.match(
                /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
            )
        ) {
            try {
                const result: any = await login(data).unwrap();
                console.log(result);
                dispatch(setCredentials({ ...result }));
                toast.success(`${result.message}`);
                navigate('/dashboard');
            } catch (err: any) {
                console.log(err);
                if (!err.originalStatus) {
                    console.error(`No server response...`);
                } else if (err.response?.status === 400) {
                    toast.error(`Missing email or password...`);
                } else if (err.response?.status === 401) {
                    toast.error(`Unauthorized`);
                }

                toast.error(`${err.data.message}`);
            }
        }
    };

    const handleValidInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.name === 'email') {
            if (e.target.value.match(/.+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/)) {
                setValidEmail(true);
                clearErrors('email');
            } else {
                if (e.target.value === '') {
                    setError('email', {
                        type: 'required',
                        message: 'Ce champs est requis.. ',
                    });
                } else {
                    setError('email', {
                        type: 'invalid',
                        message: 'Cette adresse email est invalide. ',
                    });
                    setValidEmail(false);
                }
            }
        } else if (e.target.name === 'password') {
            if (
                e.target.value.match(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
                )
            ) {
                setValidPassword(true);
                clearErrors('password');
            } else {
                if (e.target.value === '') {
                    setError('password', {
                        type: 'required',
                        message: 'Ce champs est requis.. ',
                    });
                } else {
                    setError('password', {
                        type: 'invalid',
                        message: 'Votre mot-de-passe est invalide. ',
                    });
                    setValidPassword(false);
                }
            }
        }
    };

    return (
        <Container>
            <Title>Connexion</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Email
                    <Input
                        className={`${
                            errors && errors.email && !validEmail && 'error'
                        }`}
                        type="email"
                        {...register('email', {
                            onBlur: (e) => handleValidInput(e),
                        })}
                    />
                    {errors?.email && !validEmail && (
                        <ErrorSpan>{errors.email.message}</ErrorSpan>
                    )}
                </Label>
                <Label>
                    Password
                    <Input
                        className={`${
                            errors &&
                            errors.password &&
                            !validPassword &&
                            'error'
                        }`}
                        type="password"
                        {...register('password', {
                            onChange: (e) => handleValidInput(e),
                        })}
                    />
                    {errors?.password && !validPassword && (
                        <ErrorSpan>
                            {errors && errors.password.message}
                        </ErrorSpan>
                    )}
                    <small>
                        *Au moins 8 caractères, dont 1 majuscule, 1 chiffre et 1
                        caractère spécial.
                    </small>
                </Label>
                <FormBtn
                    type="submit"
                    disabled={
                        !validPassword || !validEmail || !isDirty || isLoading
                    }
                >
                    {!isLoading ? 'Me connecter' : 'Connexion..'}
                </FormBtn>
                <RegisterLink to="/register" className="link">
                    Pas de compte ? Inscrivez-vous !
                </RegisterLink>
                <ForgotPwd to="/reset-password" className="link">
                    J'ai oublié mon mot de passe
                </ForgotPwd>
            </Form>
        </Container>
    );
};

export default Login;
