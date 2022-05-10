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
} from '../Login/Login.style';
import { useAppDispatch } from '../../redux/hooks';
import { registerUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

type FormData = {
    email: string;
    password: string;
};

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [validPassword, setValidPassword] = useState(false);
    const [validEmail, setValidEmail] = useState(false);

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
                const result = await dispatch(registerUser(data));
                if (
                    result.meta.requestStatus !== 'rejected' &&
                    result.type !== '/auth/login/rejected'
                ) {
                    toast.success(
                        `${result.payload.message}. Vous pouvez vous connecter.`
                    );
                    navigate('/login');
                } else {
                    const errorMessage = `Il y a eu une erreur...`;
                    throw new Error(errorMessage);
                }
            } catch (err: any) {
                console.log('erreur..', err);
                toast.error(`${err.message}`);
            }
        }
    };

    const handleValidInput: ChangeEventHandler<HTMLInputElement> = (event) => {
        if (event.target.name === 'email') {
            if (event.target.value.match(/.+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/)) {
                setValidEmail(true);
                clearErrors('email');
            } else {
                if (event.target.value === '') {
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
        } else if (event.target.name === 'password') {
            if (
                event.target.value.match(
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=.\-_*])([a-zA-Z0-9@#$%^&+=*.\-_]){3,}$/
                )
            ) {
                setValidPassword(true);
                clearErrors('password');
            } else {
                if (event.target.value === '') {
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
            <Title>Inscription</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Votre Email :
                    <Input
                        className={`${
                            errors && errors.email && !validEmail && 'error'
                        }`}
                        type="email"
                        {...register('email', {
                            onBlur: (event) => handleValidInput(event),
                        })}
                    />
                    {errors?.email && !validEmail && (
                        <ErrorSpan>{errors.email.message}</ErrorSpan>
                    )}
                </Label>
                <Label>
                    Votre Password :
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
                    disabled={!validPassword || !validEmail || !isDirty}
                >
                    M'inscrire
                </FormBtn>
                <RegisterLink to="/login" className="link">
                    Déjà inscrit ? Connectez-vous !
                </RegisterLink>
            </Form>
        </Container>
    );
};

export default Register;
