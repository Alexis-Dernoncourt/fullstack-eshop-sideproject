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
//import { persistor } from '../../redux/store';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Modal from '../Modal/Modal';
import { logOut } from '../../redux/auth/authSlice';
import { useLogoutMutation } from '../../redux/auth/authApiSlice';

const AdminNavbar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [confirmLogout, setConfirmLogout] = useState(false);
    const [logout] = useLogoutMutation();

    const handleLogout = async () => {
        try {
            if (confirmLogout) {
                const result = await logout('').unwrap();
                dispatch(logOut());
                //persistor.purge();
                toast.success(`${result.message}`);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleLogout();
    }, [confirmLogout]);

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
                <BtnContainer to="#logout" onClick={() => setShowModal(true)}>
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
            {showModal &&
                ReactDOM.createPortal(
                    <Modal
                        modalText="Voulez-vous vraiment vous déconnecter ?"
                        ModalDangerInfo="Vous devrez vous reconnecter la prochaine fois"
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

export default AdminNavbar;
