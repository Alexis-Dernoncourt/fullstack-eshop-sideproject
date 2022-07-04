import {
    Container,
    Title,
    InfoSpan,
    Form,
    FormSectionContainer,
    FormSideSection,
    Input,
    TextArea,
    Label,
    ErrorSpan,
    FormBtn,
    AbortLink,
} from './AddProduct.style';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ChangeEvent } from 'react';
//import { User } from '../../typescript/types';
import { useAddProductMutation } from '../../redux/products/productsApiSlice';
import { selectCurrentToken } from '../../redux/auth/authSlice';

interface FormData {
    title: string;
    textContent: string;
    productInfo: string;
    price: string;
    image: string;
    categories: string;
    tailles: string;
    couleurs: string;
    published: boolean;
}

const AddProduct = () => {
    const navigate = useNavigate();
    const [addProduct] = useAddProductMutation();
    //const user: User = useAppSelector(selectCurrentUser);
    const token: string = useAppSelector(selectCurrentToken);

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isDirty, isSubmitting },
    } = useForm<FormData>({
        defaultValues: {
            title: '',
            textContent: '',
            productInfo: '',
            image: '',
            price: '',
            categories: '',
            tailles: '',
            couleurs: '',
            published: false,
        },
    });

    const onSubmit: SubmitHandler<FormData> = async (data, event) => {
        const formData = new FormData(event!.target);

        try {
            const postArticle = await addProduct({
                token,
                formData,
            }).unwrap();
            console.log('addProductResult=>', postArticle);
            reset();
            toast.success(`${postArticle.message}`);
            navigate('/admin');
        } catch (err: any) {
            console.log('erreur..', err);
            toast.error(`${err.message ? err.message : err.data?.message}`);
        }
    };

    const checkImagesErrors = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files[0].size > 10 * 1000 * 1000) {
                setError('image', {
                    type: 'invalid',
                    message: 'Le fichier est trop grand : 10Mo maximum.',
                });
            } else if (
                e.target.files[0].type !==
                ('image/jpeg' || 'image/jpg' || 'image/png')
            ) {
                setError('image', {
                    type: 'invalid',
                    message:
                        "Ce type de fichier n'est pas accepté. Vuillez ajouter uniquement un fichier au format jpeg ou png.",
                });
            } else {
                clearErrors('image');
            }
        }
    };

    return (
        <div>
            <Container>
                <Title>Ajouter un produit</Title>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <InfoSpan>
                        Les champs marqués d'un astérisque (*) sont
                        obligatoires.
                    </InfoSpan>
                    <FormSectionContainer>
                        <FormSideSection>
                            <Label>
                                *Titre :
                                <Input
                                    className={`${
                                        errors && errors?.title && 'error'
                                    }`}
                                    type="text"
                                    {...register('title', {
                                        required: 'Ce champs est requis.',
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[a-zA-Z '\-àäâéêëç]+$/i
                                            )
                                                ? setError('title', {
                                                      type: 'invalid',
                                                      message:
                                                          'Entrez un titre valide.',
                                                  })
                                                : clearErrors('title'),
                                    })}
                                />
                                {errors.title && (
                                    <ErrorSpan>
                                        {errors && errors.title.message}
                                    </ErrorSpan>
                                )}
                            </Label>

                            <Label>
                                *Description :
                                <TextArea
                                    className={`${
                                        errors && errors?.textContent && 'error'
                                    }`}
                                    {...register('textContent', {
                                        required: 'Ce champs est requis.',
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[a-zA-Z0-9 '\-&!?()àäâéêëùûüç]+$/i
                                            )
                                                ? setError('textContent', {
                                                      type: 'invalid',
                                                      message:
                                                          'Entrez une description valide.',
                                                  })
                                                : clearErrors('textContent'),
                                    })}
                                />
                                {errors.textContent && (
                                    <ErrorSpan>
                                        {errors && errors.textContent.message}
                                    </ErrorSpan>
                                )}
                            </Label>

                            <Label>
                                *Categories :
                                <small style={{ display: 'block' }}>
                                    Séparez les mots EN MINUSCULE par une
                                    virgule sans ajouter d'espace.
                                </small>
                                <Input
                                    className={`${
                                        errors && errors?.categories && 'error'
                                    }`}
                                    type="text"
                                    {...register('categories', {
                                        required: 'Ce champs est requis.',
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[a-zàäâéêëùûüç,]+$/
                                            )
                                                ? setError('categories', {
                                                      type: 'invalid',
                                                      message:
                                                          "Saisie invalide: uniquement des mots déparés par une virgule sans ajout d'espace.",
                                                  })
                                                : clearErrors('categories'),
                                    })}
                                />
                                {errors.categories && (
                                    <ErrorSpan>
                                        {errors && errors.categories.message}
                                    </ErrorSpan>
                                )}
                            </Label>

                            <Label>
                                Information mise en avant (un seul mot) :
                                <Input
                                    className={`${
                                        errors && errors?.productInfo && 'error'
                                    }`}
                                    type="text"
                                    {...register('productInfo', {
                                        maxLength: {
                                            value: 10,
                                            message: '10 caractères maximum...',
                                        },
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[a-zA-Z '\-àäâéêëùûüç!]*$/i
                                            )
                                                ? setError('productInfo', {
                                                      type: 'invalid',
                                                      message:
                                                          'Saisie invalide. Veuillez vérifier.',
                                                  })
                                                : clearErrors('productInfo'),
                                    })}
                                />
                                {errors.productInfo && (
                                    <ErrorSpan>
                                        {errors && errors.productInfo.message}
                                    </ErrorSpan>
                                )}
                            </Label>

                            <Label>
                                *Image :
                                <Input
                                    className={`${
                                        errors && errors?.image && 'error'
                                    }`}
                                    type="file"
                                    {...register('image', {
                                        required: 'Ce champs est requis.',
                                        onChange: (e) => checkImagesErrors(e),
                                    })}
                                />
                                {errors.image && (
                                    <ErrorSpan>
                                        {errors && errors.image.message}
                                    </ErrorSpan>
                                )}
                            </Label>
                        </FormSideSection>
                        <FormSideSection>
                            <Label>
                                *Prix :
                                <Input
                                    className={`${
                                        errors && errors?.price && 'error'
                                    }`}
                                    type="text"
                                    {...register('price', {
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[0-9]{1,5}([.]{0,1}[0-9]{0,2})$/
                                            )
                                                ? setError('price', {
                                                      type: 'invalid',
                                                      message:
                                                          'Entrez un prix valide (ex: 12 ou: 12.99).',
                                                  })
                                                : clearErrors('price'),
                                    })}
                                />
                                {errors.price && (
                                    <ErrorSpan>
                                        {errors && errors.price.message}
                                    </ErrorSpan>
                                )}
                            </Label>

                            <Label>
                                Cochez cette case si vous souhaitez publier
                                directement :
                                <Input
                                    type="checkbox"
                                    {...register('published', {
                                        onBlur: (e) => console.log(e),
                                    })}
                                />
                            </Label>

                            <Label
                                style={{
                                    width: '100%',
                                    borderTop: 'var(--lightgray) 0.2rem solid',
                                    fontSize: 'var(--fz-xl)',
                                    paddingTop: '2rem',
                                    display: 'block',
                                    textAlign: 'center',
                                    marginTop: '6rem',
                                }}
                            >
                                Options
                            </Label>

                            <Label>
                                *Taille(s) :
                                <small style={{ display: 'block' }}>
                                    Séparez les mots EN MAJUSCULE par une
                                    virgule.
                                </small>
                                <Input
                                    className={`${
                                        errors && errors?.tailles && 'error'
                                    }`}
                                    type="text"
                                    {...register('tailles', {
                                        required: 'Ce champs est requis.',
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[A-Z0-9,]+$/
                                            )
                                                ? setError('tailles', {
                                                      type: 'invalid',
                                                      message:
                                                          "Invalide: uniquement des mots en majuscule séparés par une virgule sans espace. (Ex: 'M,L,XL' ou '41,42'...)",
                                                  })
                                                : clearErrors('tailles'),
                                    })}
                                />
                                {errors.tailles && (
                                    <ErrorSpan>
                                        {errors && errors.tailles.message}
                                    </ErrorSpan>
                                )}
                            </Label>

                            <Label>
                                *Couleur(s) :
                                <small style={{ display: 'block' }}>
                                    Séparez les mots par une virgule.
                                </small>
                                <Input
                                    className={`${
                                        errors && errors?.couleurs && 'error'
                                    }`}
                                    type="text"
                                    {...register('couleurs', {
                                        required: 'Ce champs est requis.',
                                        onBlur: (e) =>
                                            !e.target.value.match(
                                                /^[a-zA-Z, ]+$/i
                                            )
                                                ? setError('couleurs', {
                                                      type: 'invalid',
                                                      message:
                                                          "Invalide: uniquement des mots séparés par une virgule. (Ex: 'Rouge, bleu,vert')",
                                                  })
                                                : clearErrors('couleurs'),
                                    })}
                                />
                                {errors.couleurs && (
                                    <ErrorSpan>
                                        {errors && errors.couleurs.message}
                                    </ErrorSpan>
                                )}
                            </Label>
                        </FormSideSection>
                    </FormSectionContainer>

                    <FormBtn type="submit" disabled={!isDirty || isSubmitting}>
                        Ajouter
                    </FormBtn>
                    <AbortLink to="/admin" className="link">
                        Annuler
                    </AbortLink>
                </Form>
            </Container>
        </div>
    );
};

export default AddProduct;
