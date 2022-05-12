import { useEffect, useState } from 'react';
import { Container } from './AdminZone.style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { accessAdminZone, adminDataFromSlice } from '../../redux/adminSlice';
import { AdminData, User } from '../../typescript/types';
import AdminProductList from '../../components/AdminProductList/AdminProductList';
import toast from 'react-hot-toast';

const AdminZone = () => {
    const dispatch = useAppDispatch();
    const [text, setText] = useState('');

    const user: {
        userData: User;
        status: string;
        pending: boolean;
        authenticated: boolean;
        message: string;
        error: boolean;
    } = useAppSelector((state) => state.user);
    const adminData: AdminData = useAppSelector(adminDataFromSlice);
    const token: string = user?.userData?.accessToken;

    const getAdminData = async () => {
        try {
            const data = token;
            const result: any = await dispatch(accessAdminZone(data));
            if (
                result.meta.requestStatus === 'fulfilled' &&
                result.type === '/admin/accessAdminZone/fulfilled'
            ) {
                setText(result.payload.message);
            } else if (
                result.meta.requestStatus === 'rejected' &&
                result.type === '/admin/accessAdminZone/rejected'
            ) {
                const errorMessage = result.error.message;
                throw new Error(errorMessage);
            }
        } catch (err: any) {
            toast.error(`${err}`);
        }
    };

    useEffect(() => {
        getAdminData();
    }, []);

    return (
        <Container>
            <h1>Admin Dashboard</h1>
            <div
                style={{
                    fontSize: '2rem',
                    color: 'var(--red)',
                    margin: '2rem 0 1rem',
                }}
            >
                {adminData.status === 'loading' && <p>Chargement...</p>}
                {text && (
                    <p
                        style={{ textAlign: 'center', color: 'var(--blue)' }}
                    >{`${text}`}</p>
                )}
            </div>
            <div>
                <AdminProductList />
            </div>
        </Container>
    );
};

export default AdminZone;
