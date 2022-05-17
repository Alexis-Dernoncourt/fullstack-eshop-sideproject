import {
    Container,
    LinksContainer,
    Title,
    BtnContainer,
} from './AdminNavbar.style';
import { MdCreate, MdSettings } from 'react-icons/md';
import { RiAdminFill, RiLogoutBoxRLine } from 'react-icons/ri';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/userSlice';
import { persistor } from '../../redux/store';
import toast from 'react-hot-toast';

const AdminNavbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        try {
            const confirmLogout = window.confirm(
                'Voulez-vous vraiment vous déconnecter ?'
            );
            if (confirmLogout) {
                const logout = await dispatch(logoutUser());
                if (
                    logout.meta.requestStatus !== 'rejected' &&
                    logout.type !== '/auth/login/rejected'
                ) {
                    persistor.purge();
                    toast.success(`${logout.payload.message}`);
                    navigate('/');
                } else {
                    throw new Error(`Il y a eu une erreur...`);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container>
            <Title>Admin</Title>
            <LinksContainer>
                <BtnContainer to="/admin/products/add">
                    <span>Ajouter</span>
                    <MdCreate
                        style={{
                            height: '1.5em',
                            width: '1.5em',
                            marginLeft: '1rem',
                        }}
                    />
                </BtnContainer>
                <BtnContainer to="/admin">
                    <span>Gérer</span>
                    <MdSettings
                        style={{
                            height: '1.5em',
                            width: '1.5em',
                            marginLeft: '1rem',
                        }}
                    />
                </BtnContainer>
                <BtnContainer to="/dashboard">
                    <span>Dashboard</span>
                    <RiAdminFill
                        style={{
                            height: '1.5em',
                            width: '1.5em',
                            marginLeft: '1rem',
                        }}
                    />
                </BtnContainer>
                <BtnContainer to="#logout" onClick={(e) => handleLogout(e)}>
                    <span>Déconnexion</span>
                    <RiLogoutBoxRLine
                        style={{
                            height: '1.5em',
                            width: '1.5em',
                            marginLeft: '1rem',
                        }}
                    />
                </BtnContainer>
            </LinksContainer>
        </Container>
    );
};

export default AdminNavbar;
