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
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { selectUser, updateAdress } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User } from '../../typescript/types';

interface FormData {
    firstName: string;
    lastName: string;
    postalCode: string;
    city: string;
    street: string;
    adressComplement: string;
    streetNumber: string;
    appartment: boolean;
    etage: number;
}

interface DataToSend extends FormData {
    token: string;
}

const AdressUpdateForm = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user: User = useAppSelector(selectUser);

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormData>({
        defaultValues: {
            firstName: user?.adress?.firstName ? user.adress.firstName : '',
            lastName: user?.adress?.lastName ? user.adress.lastName : '',
            postalCode: user?.adress?.postalCode ? user.adress.postalCode : '',
            city: user?.adress?.city ? user.adress.city : '',
            street: user?.adress?.street ? user.adress.street : '',
            adressComplement: user?.adress?.adressComplement
                ? user.adress.adressComplement
                : '',
            streetNumber: user?.adress?.streetNumber
                ? user.adress.streetNumber
                : '',
            appartment: user?.adress?.appartment || false,
            etage: user?.adress?.etage || 0,
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data: FormData) => {
        try {
            const dataToSend: DataToSend = {
                ...data,
                token: user.accessToken,
            };
            const result = await dispatch(updateAdress(dataToSend));
            if (
                result.meta.requestStatus !== 'rejected' &&
                result.type !== '/user/updatePassword/rejected'
            ) {
                toast.success(`${result.payload.message}`);
                reset();
                navigate('/dashboard');
            } else {
                const errorMessage = `Il y a eu une erreur...`;
                throw new Error(errorMessage);
            }
        } catch (err: any) {
            console.log('erreur..', err);
            toast.error(`${err.message}`);
        }
    };

    return (
        <Container>
            <Title>Modifier votre adresse</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Label>
                    Votre prénom :
                    <Input
                        className={`${errors && errors?.firstName && 'error'}`}
                        type="text"
                        {...register('firstName', {
                            required: 'Ce champs est requis.',
                            onBlur: (e) =>
                                !e.target.value.match(/^[a-zA-Z '\-àäâéêëç]+$/i)
                                    ? setError('firstName', {
                                          type: 'invalid',
                                          message: 'Entrez un prénom valide.',
                                      })
                                    : clearErrors('firstName'),
                        })}
                    />
                    {errors.firstName && (
                        <ErrorSpan>
                            {errors && errors.firstName.message}
                        </ErrorSpan>
                    )}
                </Label>

                <Label>
                    Votre nom :
                    <Input
                        className={`${errors && errors?.lastName && 'error'}`}
                        type="text"
                        {...register('lastName', {
                            required: 'Ce champs est requis.',
                            onBlur: (e) =>
                                !e.target.value.match(/^[a-zA-Z '\-àäâéêëç]+$/i)
                                    ? setError('lastName', {
                                          type: 'invalid',
                                          message: 'Entrez un nom valide.',
                                      })
                                    : clearErrors('lastName'),
                        })}
                    />
                    {errors.lastName && (
                        <ErrorSpan>
                            {errors && errors.lastName.message}
                        </ErrorSpan>
                    )}
                </Label>

                <Label>
                    Votre numéro de rue :
                    <Input
                        className={`${
                            errors && errors?.streetNumber && 'error'
                        }`}
                        type="text"
                        {...register('streetNumber', {
                            required: 'Ce champs est requis.',
                            onBlur: (e) =>
                                !e.target.value.match(/^[a-zA-Z0-9 -]+$/)
                                    ? setError('streetNumber', {
                                          type: 'invalid',
                                          message:
                                              'Saisie invalide. Veuillez vérifier.',
                                      })
                                    : clearErrors('streetNumber'),
                        })}
                    />
                    {errors.streetNumber && (
                        <ErrorSpan>
                            {errors && errors.streetNumber.message}
                        </ErrorSpan>
                    )}
                </Label>

                <Label>
                    Rue - chemin :
                    <Input
                        className={`${errors && errors?.street && 'error'}`}
                        type="text"
                        {...register('street', {
                            required: 'Ce champs est requis.',
                            onBlur: (e) =>
                                !e.target.value.match(/^[a-zA-Z '\-àäâéêëç]+$/i)
                                    ? setError('street', {
                                          type: 'invalid',
                                          message:
                                              'Entrez un nom de rue valide.',
                                      })
                                    : clearErrors('street'),
                        })}
                    />
                    {errors.street && (
                        <ErrorSpan>{errors && errors.street.message}</ErrorSpan>
                    )}
                </Label>

                <Label>
                    Complément d'adresse :
                    <Input
                        className={`${
                            errors && errors?.adressComplement && 'error'
                        }`}
                        type="text"
                        {...register('adressComplement', {
                            onBlur: (e) =>
                                !e.target.value.match(
                                    /^[a-zA-Z0-9 '\-àäâéêëç]*$/i
                                )
                                    ? setError('adressComplement', {
                                          type: 'invalid',
                                          message:
                                              "Entrez un complément d'adresse valide.",
                                      })
                                    : clearErrors('adressComplement'),
                        })}
                    />
                    {errors.adressComplement && (
                        <ErrorSpan>
                            {errors && errors.adressComplement.message}
                        </ErrorSpan>
                    )}
                </Label>

                <Label>
                    Cochez cette case si vous habitez un appartement :
                    <Input
                        type="checkbox"
                        {...register('appartment', {
                            onBlur: (e) => console.log(e),
                        })}
                    />
                </Label>

                <Label>
                    Étage :
                    <Input
                        className={`${errors && errors?.etage && 'error'}`}
                        type="number"
                        {...register('etage', {
                            onBlur: (e) =>
                                parseInt(e.target.value) < 0 &&
                                setValue('etage', 0),
                        })}
                    />
                    {errors.etage && (
                        <ErrorSpan>{errors && errors.etage.message}</ErrorSpan>
                    )}
                </Label>

                <Label>
                    Code postal :
                    <Input
                        className={`${errors && errors?.postalCode && 'error'}`}
                        type="text"
                        {...register('postalCode', {
                            required: 'Ce champs est requis.',
                            onBlur: (e) =>
                                !e.target.value.match(/^[0-9]{5}$/)
                                    ? setError('postalCode', {
                                          type: 'invalid',
                                          message:
                                              'Entrez un code postal valide.',
                                      })
                                    : clearErrors('postalCode'),
                        })}
                    />
                    {errors.postalCode && (
                        <ErrorSpan>
                            {errors && errors.postalCode.message}
                        </ErrorSpan>
                    )}
                </Label>

                <Label>
                    Ville :
                    <Input
                        className={`${errors && errors?.city && 'error'}`}
                        type="text"
                        {...register('city', {
                            required: 'Ce champs est requis.',
                            onBlur: (e) =>
                                !e.target.value.match(/^[a-zA-Z '\-àäâéêëç]+$/i)
                                    ? setError('city', {
                                          type: 'invalid',
                                          message: 'Entrez une ville valide.',
                                      })
                                    : clearErrors('city'),
                        })}
                    />
                    {errors.city && (
                        <ErrorSpan>{errors && errors.city.message}</ErrorSpan>
                    )}
                </Label>

                <FormBtn type="submit" disabled={!isDirty}>
                    Mettre à jour
                </FormBtn>
                <RegisterLink to="/dashboard" className="link">
                    Annuler
                </RegisterLink>
            </Form>
        </Container>
    );
};

export default AdressUpdateForm;
