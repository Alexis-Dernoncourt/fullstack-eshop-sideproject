import {
    Container,
    ProfilInfosContainer,
    TitleContainer,
    AdminInfo,
    InfosTitle,
    TextZone,
    AdressZone,
    StyledLink,
} from './Dashboard.style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useLogoutMutation } from '../../redux/auth/authApiSlice';
import { deleteCartData, MadeCartLoading } from '../../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../styles/GeneralComponents';
import toast from 'react-hot-toast';
import { verifyRoles } from '../../utils/utils';
import { User } from '../../typescript/types';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../../components/Modal/Modal';
import {
    logOut,
    selectCurrentToken,
    selectCurrentUser,
    setCredentials,
} from '../../redux/auth/authSlice';
import { useGetProfileQuery } from '../../redux/user/userApiSlice';

const Dashboard = () => {
    const [showModal, setShowModal] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData: User = useAppSelector(selectCurrentUser);
    const token: string = useAppSelector(selectCurrentToken);
    const { data, isLoading, isError } = useGetProfileQuery({
        accessToken: token,
        userId: userData.userId,
    });

    const isAdmin: boolean = userData
        ? verifyRoles(userData.userRoles, 'Admin')
        : false;

    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            if (confirmLogout) {
                const result = await logout('').unwrap();
                dispatch(logOut());
                dispatch(MadeCartLoading());
                dispatch(deleteCartData());
                //persistor.purge();
                const message = result.message || 'Vous vous êtes déconnecté !';
                toast.success(message);
                setConfirmLogout(false);
                navigate('/');
            }
        } catch (error) {
            setConfirmLogout(false);
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            data &&
                !isError &&
                dispatch(
                    setCredentials({ user: data.userData, accessToken: token })
                );
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        handleLogout();
    }, [confirmLogout]);

    return (
        <Container>
            <ProfilInfosContainer border="none">
                {isLoading ? (
                    'Chargement...'
                ) : (
                    <>
                        <TitleContainer>
                            Bonjour{' '}
                            {userData && userData.adress?.firstName
                                ? userData.adress.firstName
                                : userData.username}{' '}
                            ! 😊
                        </TitleContainer>
                        {!isAdmin ? (
                            <Button onClick={() => setShowModal(true)}>
                                LOGOUT
                            </Button>
                        ) : (
                            <>
                                <AdminInfo>
                                    Vous êtes ADMINISTRATEUR et/ou ÉDITEUR
                                </AdminInfo>
                                <Button onClick={() => setShowModal(true)}>
                                    LOGOUT
                                </Button>
                            </>
                        )}

                        <InfosTitle>Vos informations :</InfosTitle>
                        <TextZone danger="">
                            Votre email : {userData?.email}
                        </TextZone>
                        <StyledLink
                            mb="false"
                            to="/password-update"
                            className="link"
                        >
                            Modifier votre mot-de-passe
                        </StyledLink>
                        {!userData?.validatedAccount && (
                            <div>
                                <TextZone danger="danger">
                                    Vous devez valider votre compte pour
                                    continuer
                                </TextZone>
                                <Link to="/confirm-email">
                                    Confirmer votre email
                                </Link>
                            </div>
                        )}
                        {userData.adress &&
                            userData.adress.firstName &&
                            userData.adress.lastName &&
                            userData.adress.postalCode &&
                            userData.adress.street &&
                            userData.adress.city && (
                                <AdressZone>
                                    <h5>Votre adresse :</h5>
                                    {userData.adress && (
                                        <>
                                            <TextZone danger="">
                                                {`${userData.adress.firstName} ${userData.adress.lastName}`}
                                            </TextZone>
                                            <TextZone danger="">
                                                {`${userData.adress.streetNumber} ${userData.adress.street}`}
                                            </TextZone>
                                            {userData.adress
                                                .adressComplement && (
                                                <TextZone danger="">
                                                    {
                                                        userData.adress
                                                            .adressComplement
                                                    }
                                                </TextZone>
                                            )}
                                            {userData.adress.appartment && (
                                                <TextZone danger="">
                                                    Étage:{' '}
                                                    {userData.adress.etage}
                                                </TextZone>
                                            )}
                                            <TextZone danger="">
                                                {userData.adress.postalCode}
                                            </TextZone>
                                            <TextZone danger="">
                                                {userData.adress.city}
                                            </TextZone>
                                        </>
                                    )}
                                </AdressZone>
                            )}
                        <StyledLink
                            mb="true"
                            to="/update-adress"
                            className="link"
                        >
                            {userData.adress &&
                            !userData.adress.firstName &&
                            !userData.adress.lastName &&
                            !userData.adress.postalCode &&
                            !userData.adress.street &&
                            !userData.adress.city
                                ? 'Vous devez renseigner votre adresse pour commander..'
                                : 'Modifer votre adresse'}
                        </StyledLink>
                    </>
                )}
            </ProfilInfosContainer>
            <ProfilInfosContainer border="left">
                <InfosTitle>Vos commandes :</InfosTitle>
                <TextZone danger="">
                    Vous n'avez pas effectué de commande pour le moment..
                </TextZone>
            </ProfilInfosContainer>
            {showModal &&
                ReactDOM.createPortal(
                    <Modal
                        modalText="Voulez-vous vraiment vous déconnecter ?"
                        ModalDangerInfo="Attention, votre panier sera également supprimé"
                        validTextBtn="OK"
                        setShowModal={setShowModal}
                        setConfirmAction={setConfirmLogout}
                        setAbortAction={setConfirmLogout}
                    />,
                    document.body
                )}
        </Container>
    );
};

export default Dashboard;
