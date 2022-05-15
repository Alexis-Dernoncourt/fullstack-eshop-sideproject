import {
    Container,
    ProfilInfosContainer,
    TitleContainer,
    InfosTitle,
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
            <ProfilInfosContainer>
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
                        <p>Vous êtes ADMINISTRATEUR et/ou ÉDITEUR</p>
                        <Button onClick={handleLogout}>LOGOUT</Button>
                    </>
                )}

                <InfosTitle>Vos informations :</InfosTitle>
                <p>Votre email : {userData?.email}</p>
                <Link
                    to="/password-update"
                    className="link"
                    style={{
                        width: 'max-content',
                        margin: '0 auto',
                        color: 'var(--darkblue)',
                    }}
                >
                    Modifier votre mot-de-passe
                </Link>
                {!userData?.validatedAccount && (
                    <div>
                        <p style={{ color: 'var(--red)', fontWeight: 'bold' }}>
                            Vous devez valider votre compte pour continuer
                        </p>
                        <Link to="/confirm-email">Confirmer votre email</Link>
                    </div>
                )}
                {userData.adress &&
                    userData.adress.firstName &&
                    userData.adress.lastName &&
                    userData.adress.postalCode &&
                    userData.adress.street &&
                    userData.adress.city && (
                        <div
                            style={{
                                border: '0.1rem solid lightgrey',
                                borderRadius: '1rem',
                                padding: '1.5rem 2rem',
                                margin: '2rem auto 0.5rem',
                            }}
                        >
                            <h5>Votre adresse :</h5>
                            {userData.adress && (
                                <>
                                    <p>
                                        {`${userData.adress.firstName} ${userData.adress.lastName}`}
                                    </p>
                                    <p>{`${userData.adress.streetNumber} ${userData.adress.street}`}</p>
                                    {userData.adress.adressComplement && (
                                        <p>
                                            {userData.adress.adressComplement}
                                        </p>
                                    )}
                                    {userData.adress.appartment && (
                                        <p>Étage: {userData.adress.etage}</p>
                                    )}
                                    <p>{userData.adress.postalCode}</p>
                                    <p>{userData.adress.city}</p>
                                </>
                            )}
                        </div>
                    )}
                <Link
                    to="/update-adress"
                    className="link"
                    style={{
                        width: 'max-content',
                        margin: '0 auto 2rem',
                        color: 'var(--darkblue)',
                    }}
                >
                    {userData.adress &&
                    !userData.adress.firstName &&
                    !userData.adress.lastName &&
                    !userData.adress.postalCode &&
                    !userData.adress.street &&
                    !userData.adress.city
                        ? 'Vous devez renseigner votre adresse pour commander..'
                        : 'Modifer votre adresse'}
                </Link>
            </ProfilInfosContainer>
            <ProfilInfosContainer style={{ borderLeft: '2px solid lightgray' }}>
                <InfosTitle>Vos commandes :</InfosTitle>
                <p>Vous n'avez pas effectué de commande pour le moment..</p>
            </ProfilInfosContainer>
        </Container>
    );
};

export default Dashboard;
