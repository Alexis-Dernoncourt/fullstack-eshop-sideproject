import { ChangeEventHandler, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../redux/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';
import { User } from '../../typescript/types';
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

type FormData = {
    email: string;
};

const ResetPassword = () => {
    const [validEmail, setValidEmail] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const user: User = useAppSelector(selectCurrentUser);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormData>({ defaultValues: { email: '' } });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        if (data.email.match(/.+@.+\.[a-zA-Z]{2,}$/)) {
            setIsLoading(true);
            try {
                const result: any = await axios.post('/auth/reset-password', {
                    email: data.email,
                });
                console.log(result);
                if (result.status === 200) {
                    toast.success(`${result.data.message}`);
                    reset();
                    navigate('/');
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
        }
    };

    return (
        <Container>
            <Title>Changer de mot de passe</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Votre Email
                    <Input
                        className={`${
                            errors && errors.email && !validEmail && 'error'
                        }`}
                        type="email"
                        placeholder="Entrez votre adresse mail..."
                        {...register('email', {
                            onChange: (e) => handleValidInput(e),
                        })}
                    />
                    {errors?.email && !validEmail && (
                        <ErrorSpan>{errors.email.message}</ErrorSpan>
                    )}
                </Label>
                <FormBtn
                    type="submit"
                    disabled={!validEmail || !isDirty || isLoading}
                >
                    {!isLoading ? 'Envoyer' : 'Envoi..'}
                </FormBtn>
                {!user ? (
                    <RegisterLink to="/login" className="link">
                        Retour à la page de connexion
                    </RegisterLink>
                ) : (
                    <RegisterLink to="/dashboard" className="link">
                        Annuler
                    </RegisterLink>
                )}
            </Form>
        </Container>
    );
};

export default ResetPassword;
