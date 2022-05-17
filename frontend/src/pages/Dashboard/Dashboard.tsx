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
import { selectUser, logoutUser } from '../../redux/userSlice';
import { deleteCartData, MadeCartLoading } from '../../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../styles/GeneralComponents';
import { persistor } from '../../redux/store';
import toast from 'react-hot-toast';
import { verifyRoles } from '../../utils/utils';
import { User } from '../../typescript/types';

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userData: User = useAppSelector(selectUser);

    const isAdmin: boolean = userData
        ? verifyRoles(userData.userRoles, 'Admin')
        : false;

    const handleLogout = async () => {
        try {
            const confirmLogout = window.confirm(
                'Voulez-vous vraiment vous déconnecter ? Attention, votre panier sera supprimé.'
            );

            if (confirmLogout) {
                const logout = await dispatch(logoutUser());
                if (
                    logout.meta.requestStatus !== 'rejected' &&
                    logout.type !== '/auth/login/rejected'
                ) {
                    dispatch(MadeCartLoading());
                    dispatch(deleteCartData());
                    persistor.purge();
                    const message =
                        logout.payload?.message ||
                        'Vous vous êtes déconnecté !';
                    toast.success(message);
                    navigate('/');
                } else {
                    const errorMessage = `Il y a eu une erreur, veuillez réessayer.`;
                    throw new Error(errorMessage);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <ProfilInfosContainer border="none">
                <TitleContainer>
                    Bonjour{' '}
                    {userData && userData.adress?.firstName
                        ? userData.adress.firstName
                        : userData.username}{' '}
                    ! 😊
                </TitleContainer>
                {!isAdmin ? (
                    <Button onClick={handleLogout}>LOGOUT</Button>
                ) : (
                    <>
                        <AdminInfo>
                            Vous êtes ADMINISTRATEUR et/ou ÉDITEUR
                        </AdminInfo>
                        <Button onClick={handleLogout}>LOGOUT</Button>
                    </>
                )}

                <InfosTitle>Vos informations :</InfosTitle>
                <TextZone danger="">Votre email : {userData?.email}</TextZone>
                <StyledLink
                    marginBottom={false}
                    to="/password-update"
                    className="link"
                >
                    Modifier votre mot-de-passe
                </StyledLink>
                {!userData?.validatedAccount && (
                    <div>
                        <TextZone danger="danger">
                            Vous devez valider votre compte pour continuer
                        </TextZone>
                        <Link to="/confirm-email">Confirmer votre email</Link>
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
                                    {userData.adress.adressComplement && (
                                        <TextZone danger="">
                                            {userData.adress.adressComplement}
                                        </TextZone>
                                    )}
                                    {userData.adress.appartment && (
                                        <TextZone danger="">
                                            Étage: {userData.adress.etage}
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
                    marginBottom={true}
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
            </ProfilInfosContainer>
            <ProfilInfosContainer border="left">
                <InfosTitle>Vos commandes :</InfosTitle>
                <TextZone danger="">
                    Vous n'avez pas effectué de commande pour le moment..
                </TextZone>
            </ProfilInfosContainer>
        </Container>
    );
};

export default Dashboard;
