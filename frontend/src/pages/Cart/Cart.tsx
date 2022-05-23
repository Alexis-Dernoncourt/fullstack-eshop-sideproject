import {
    Container,
    EmptyInfoDiv,
    CartContentContainer,
    CartItemsContainer,
    CartItem,
    DeleteCart,
    ImgContainer,
    ItemImg,
    ContentContainer,
    Infos,
    Details,
    ItemTitle,
    BtnContainer,
    SpanBtnText,
    DeleteBtnContainer,
    UpdateBtnContainer,
    ConfirmBtnContainer,
    AbortBtnContainer,
    RightCartSection,
    FormContainer,
    StyledH2,
    StyledH1,
    AlertText,
    StyledLink,
    InputContainer,
} from './Cart.style';

import {
    selectAllCartItems,
    MadeCartLoading,
    deleteProduct,
    MadeCartIdle,
    updateCartItem,
    deleteCartData,
} from '../../redux/cartSlice';
import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import PriceFormat from '../../components/PriceFormat/PriceFormat';
import { CgClose } from 'react-icons/cg';
import { MdEdit, MdCheck } from 'react-icons/md';
import toast from 'react-hot-toast';
import { useGetAllPublishedQuery } from '../../redux/apiSlice';
import QuantityBtn from '../../components/QuantityBtn/QuantityBtn';
import { SubmitHandler, useForm } from 'react-hook-form';
import ProductOptionsInput from '../../components/ProductOptionsInput/ProductOptionsInput';
import { useLocation } from 'react-router-dom';
import { Button } from '../../styles/GeneralComponents';
import {
    CartProduct,
    Product,
    ProductItems,
    ProductUpdateType,
    userState,
} from '../../typescript/types';
import ReactDOM from 'react-dom';
import Modal from '../../components/Modal/Modal';

const Cart = () => {
    // const sleep = (ms: number) =>
    //     new Promise((resolve) => setTimeout(resolve, ms));
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { data, isLoading, isError } = useGetAllPublishedQuery('Products');
    const { status } = useAppSelector((state) => state.shoppingAppCart);
    const [updateArticle, setUpdateArticle] = useState(false);
    const [articleToUpdate, setArticleToUpdate] = useState('');
    const [quantity, setQuantity] = useState(1);
    const {
        register,
        setValue,
        handleSubmit,
        reset,
        formState: { errors, isDirty, isSubmitting, isValid },
    } = useForm<ProductUpdateType>({ mode: 'onChange' });

    const [showModal, setShowModal] = useState(false);
    const [productId, setProductId] = useState('');
    const [confirmDeleteArticle, setConfirmDeleteArticle] = useState(false);
    const [deleteCart, setDeleteCart] = useState(false);
    const [deleteCartConfirm, setDeleteCartConfirm] = useState(false);
    const allItemsInCart: ProductItems = useAppSelector(selectAllCartItems);
    const user: userState = useAppSelector((state) => state.user);
    const token = user?.userData?.accessToken;

    const handleDeleteProductFromCart = (data: string) => {
        if (confirmDeleteArticle) {
            dispatch(MadeCartLoading());
            try {
                dispatch(deleteProduct(data));
            } catch (error) {
                console.log('errrorrrr');
                setConfirmDeleteArticle(false);
            } finally {
                dispatch(MadeCartIdle());
                toast.success('Article supprimé du panier !');
                setConfirmDeleteArticle(false);
            }
        }
    };

    const handleUpdateArticle = (uid: string) => {
        reset();
        setQuantity(1);
        setUpdateArticle(true);
        setArticleToUpdate(uid);
    };

    const handleAbort = () => {
        setUpdateArticle(false);
        reset();
        setQuantity(1);
    };

    const handleDelete = () => {
        setDeleteCart(true);
        setShowModal(true);
    };

    const handleDeleteProduct = (uid: string) => {
        setProductId(uid);
        setShowModal(true);
    };

    const handleDeleteCart = async () => {
        if (deleteCartConfirm) {
            dispatch(MadeCartLoading());
            try {
                dispatch(deleteCartData());
            } catch (error) {
                console.log('errrorrrr');
                setDeleteCart(false);
            } finally {
                dispatch(MadeCartIdle());
                toast.success('Votre panier a bien été supprimé.');
                reset();
                setUpdateArticle(false);
                setDeleteCart(false);
            }
        }
    };

    useEffect(() => {
        handleDeleteCart();
        return () => {
            deleteCart && setDeleteCart(false);
        };
    }, [showModal, deleteCartConfirm]);

    useEffect(() => {
        handleDeleteProductFromCart(productId);
    }, [showModal, confirmDeleteArticle]);

    useEffect(() => {
        setProductId('');
    }, []);

    const onSubmit: SubmitHandler<ProductUpdateType> = (
        data: ProductUpdateType
    ) => {
        if (isValid) {
            dispatch(MadeCartLoading());
            //await sleep(2000);
            try {
                dispatch(updateCartItem(data));
            } catch (error) {
                console.log('errrorrrr');
            } finally {
                dispatch(MadeCartIdle());
                toast.success("L'article a été mis à jour !");
                reset();
                setUpdateArticle(false);
            }
        }
    };

    const findOneItem = (id: string) => {
        const foundItem: Product = data?.products?.filter(
            (el: Product) => el._id === id
        )[0];
        return foundItem.options;
    };

    const amountOfItemsInCart = () => {
        const total = allItemsInCart
            ?.map((item: CartProduct) => {
                return item.quantity * item.unitPrice;
            })
            .reduce((prev: number, next: number) => prev + next, 0);
        return total;
    };

    const handlePayment = async () => {
        const dataToSend = {
            items: allItemsInCart,
            amount: amountOfItemsInCart() * 10,
        };
        const payment = await fetch(
            'http://localhost:3000/api/stripe/create-checkout-session',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(dataToSend),
            }
        );
        const res: { url: (string | Location) & Location } =
            await payment.json();

        if (!payment.ok)
            return payment.json().then((json) => Promise.reject(json));
        if (payment.ok) {
            window.location = res.url;
        }
    };

    return (
        <>
            {status === 'loading' && (
                <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        margin: '2rem 0',
                        fontSize: 'var(--fz-xl)',
                    }}
                >
                    Chargement...
                </div>
            )}
            <Container>
                {allItemsInCart && allItemsInCart.length > 0 ? (
                    <CartContentContainer>
                        <CartItemsContainer>
                            <DeleteCart onClick={handleDelete}>
                                Vider le panier
                            </DeleteCart>
                            {allItemsInCart.map((item: CartProduct) => (
                                <CartItem key={item.uid}>
                                    {!updateArticle && (
                                        <ImgContainer>
                                            <ItemImg src={item.image} />
                                        </ImgContainer>
                                    )}
                                    <ContentContainer>
                                        <ItemTitle>
                                            {item.productName}
                                        </ItemTitle>
                                        {(!updateArticle ||
                                            articleToUpdate !== item.uid) && (
                                            <>
                                                <div>
                                                    {item.couleur && (
                                                        <Infos>
                                                            Couleur:{' '}
                                                            {item.couleur}
                                                        </Infos>
                                                    )}
                                                    <Infos>
                                                        Taille: {item.taille}
                                                    </Infos>
                                                </div>
                                                <Infos>
                                                    Quantité: {item.quantity}
                                                </Infos>
                                            </>
                                        )}
                                        {updateArticle &&
                                            articleToUpdate === item.uid && (
                                                <FormContainer
                                                    onSubmit={handleSubmit(
                                                        onSubmit
                                                    )}
                                                >
                                                    <input
                                                        type="hidden"
                                                        value={item.uid}
                                                        {...register('uid')}
                                                    />
                                                    {item.couleur && (
                                                        <InputContainer>
                                                            Couleur:
                                                            <ProductOptionsInput
                                                                register={
                                                                    register
                                                                }
                                                                defaultVal={
                                                                    item.couleur
                                                                }
                                                                errors={errors}
                                                                options={findOneItem(
                                                                    item.productid
                                                                )}
                                                                fieldName="couleur"
                                                                page="cart"
                                                            />
                                                        </InputContainer>
                                                    )}
                                                    <InputContainer>
                                                        Taille:
                                                        <ProductOptionsInput
                                                            register={register}
                                                            defaultVal={
                                                                item.taille
                                                            }
                                                            errors={errors}
                                                            options={findOneItem(
                                                                item.productid
                                                            )}
                                                            fieldName="taille"
                                                            page="cart"
                                                        />
                                                    </InputContainer>
                                                    <InputContainer>
                                                        Quantité:{' '}
                                                        <QuantityBtn
                                                            quantity={quantity}
                                                            setQuantity={
                                                                setQuantity
                                                            }
                                                            defaultVal={
                                                                item.quantity
                                                            }
                                                            register={register}
                                                            setValue={setValue}
                                                            page="cart"
                                                        />
                                                    </InputContainer>
                                                    <ConfirmBtnContainer
                                                        type="submit"
                                                        disabled={
                                                            isSubmitting ||
                                                            (!isDirty &&
                                                                quantity ===
                                                                    item.quantity)
                                                        }
                                                    >
                                                        OK
                                                        <MdCheck
                                                            style={{
                                                                height: '1.5em',
                                                                width: '1.5em',
                                                            }}
                                                        />
                                                    </ConfirmBtnContainer>
                                                </FormContainer>
                                            )}
                                        {pathname === '/cart' &&
                                        updateArticle &&
                                        articleToUpdate === item.uid ? null : (
                                            <Details>
                                                Prix unitaire:{' '}
                                                <b>
                                                    <PriceFormat
                                                        price={item.unitPrice}
                                                    />
                                                </b>
                                            </Details>
                                        )}
                                    </ContentContainer>
                                    <BtnContainer>
                                        <DeleteBtnContainer
                                            onClick={() =>
                                                handleDeleteProduct(item.uid)
                                            }
                                        >
                                            <SpanBtnText>Supprimer</SpanBtnText>
                                            <CgClose
                                                style={{
                                                    height: '1.5em',
                                                    width: '1.5em',
                                                }}
                                            />
                                        </DeleteBtnContainer>
                                        {(!updateArticle ||
                                            articleToUpdate !== item.uid) && (
                                            <UpdateBtnContainer
                                                onClick={() =>
                                                    handleUpdateArticle(
                                                        item.uid
                                                    )
                                                }
                                            >
                                                <SpanBtnText>
                                                    Modifier
                                                </SpanBtnText>
                                                <MdEdit
                                                    style={{
                                                        height: '1.5em',
                                                        width: '1.5em',
                                                    }}
                                                />
                                            </UpdateBtnContainer>
                                        )}
                                        {updateArticle &&
                                            articleToUpdate === item.uid && (
                                                <AbortBtnContainer
                                                    onClick={() =>
                                                        handleAbort()
                                                    }
                                                >
                                                    <SpanBtnText>
                                                        Annuler
                                                    </SpanBtnText>
                                                </AbortBtnContainer>
                                            )}
                                    </BtnContainer>
                                </CartItem>
                            ))}
                        </CartItemsContainer>
                        <RightCartSection>
                            <StyledH2>Résumé de votre commande :</StyledH2>
                            <div>
                                <div style={{ marginTop: '2rem' }}>
                                    Sous-total:{' '}
                                    <PriceFormat
                                        price={amountOfItemsInCart()}
                                    />
                                </div>
                                <div>Réduction(s) : 0%</div>
                                <div>Frais de port estimés : Gratuit</div>
                            </div>
                            <StyledH1 style={{ marginTop: '3rem' }}>
                                Total:{' '}
                                <PriceFormat price={amountOfItemsInCart()} />
                            </StyledH1>
                            {user.authenticated ? (
                                user.userData?.validatedAccount ? (
                                    user.userData?.adress?.city &&
                                    user.userData?.adress?.postalCode &&
                                    user.userData?.adress?.street &&
                                    user.userData?.adress?.streetNumber ? (
                                        <Button
                                            type="button"
                                            onClick={handlePayment}
                                        >
                                            Commander
                                        </Button>
                                    ) : (
                                        <>
                                            <AlertText>
                                                Veuillez renseigner votre
                                                adresse pour pouvoir passer
                                                commande.
                                            </AlertText>
                                            <StyledLink
                                                to="/update-adress"
                                                className="link"
                                            >
                                                Renseigner mon adresse de
                                                livraison
                                            </StyledLink>
                                        </>
                                    )
                                ) : (
                                    <>
                                        <AlertText>
                                            Veuillez confirmer votre compte via
                                            l'email qui vous a été envoyé pour
                                            pouvoir passer commande. Pensez
                                            aussi à renseigner votre adresse de
                                            livraison !
                                        </AlertText>
                                        <StyledLink
                                            to="/update-adress"
                                            className="link"
                                        >
                                            Renseigner mon adresse de livraison
                                        </StyledLink>
                                    </>
                                )
                            ) : (
                                <AlertText>
                                    Veuillez vous connecter avant de pouvoir
                                    passer commande.
                                </AlertText>
                            )}
                        </RightCartSection>
                        {showModal &&
                            deleteCart &&
                            ReactDOM.createPortal(
                                <Modal
                                    modalText="Voulez-vous vraiment supprimer votre panier ?"
                                    ModalDangerInfo="Cette action est irréversible"
                                    validTextBtn="OK"
                                    setShowModal={setShowModal}
                                    setConfirmAction={setDeleteCartConfirm}
                                />,
                                document.body
                            )}
                        {showModal &&
                            productId &&
                            productId !== '' &&
                            !deleteCart &&
                            ReactDOM.createPortal(
                                <Modal
                                    modalText="Voulez-vous vraiment supprimer cet article ?"
                                    ModalDangerInfo="Cette action est irréversible"
                                    validTextBtn="OK"
                                    setShowModal={setShowModal}
                                    setConfirmAction={setConfirmDeleteArticle}
                                />,
                                document.body
                            )}
                    </CartContentContainer>
                ) : (
                    <>
                        <EmptyInfoDiv>
                            <div>
                                <div
                                    style={{
                                        display: 'block',
                                        width: '100%',
                                        fontSize: '7rem',
                                        marginBottom: '2rem',
                                    }}
                                >
                                    <img
                                        src="https://emojipedia-us.s3.amazonaws.com/source/skype/289/man-shrugging_1f937-200d-2642-fe0f.png"
                                        alt="Emoji haussant les épaules"
                                        width="160"
                                        height="160"
                                    />
                                </div>
                                Il n'y a pas encore d'article(s) dans votre
                                panier...
                            </div>
                        </EmptyInfoDiv>
                    </>
                )}
            </Container>
        </>
    );
};

export default Cart;
