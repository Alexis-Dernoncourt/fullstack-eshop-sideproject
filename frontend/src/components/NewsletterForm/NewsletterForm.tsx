import {
    NewsletterContainer,
    Form,
    Input,
    ErrorSpan,
    SubmitBtn,
} from './NewsletterForm.style';
import { TitleH2 } from '../../styles/GeneralComponents';
import { ChangeEventHandler, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormI {
    email: string;
}

const NewsletterForm = () => {
    const [validEmail, setValidEmail] = useState(false);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormI>({
        defaultValues: {
            email: '',
        },
    });

    const handleValidInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        if (e.target.value.match(/.+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/)) {
            setValidEmail(true);
            clearErrors('email');
        } else {
            if (e.target.value === '' && !validEmail) {
                clearErrors('email');
            } else {
                setError('email', {
                    type: 'invalid',
                    message: 'Cette adresse email est invalide. ',
                });
                setValidEmail(false);
            }
        }
    };

    const onSubmit = async (data: FormI) => {
        if (data.email.match(/.+@.+\.[a-zA-Z]{2,}$/)) {
            console.log(data);
            reset();
        }
    };

    return (
        <NewsletterContainer>
            <TitleH2>Inscrivez-vous à notre NEWSLETTER !</TitleH2>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    className={`${
                        errors && errors.email && !validEmail && 'error'
                    }`}
                    type="email"
                    placeholder="Votre email"
                    {...register('email', {
                        onChange: (e) => handleValidInput(e),
                    })}
                />
                {errors?.email && !validEmail && (
                    <ErrorSpan>*{errors.email.message}</ErrorSpan>
                )}
                <div>
                    <SubmitBtn type="submit" disabled={!isDirty || !validEmail}>
                        M'inscrire
                    </SubmitBtn>
                </div>
            </Form>
        </NewsletterContainer>
    );
};

export default NewsletterForm;
