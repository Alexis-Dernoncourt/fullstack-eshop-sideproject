import { useEffect } from 'react';
import { Container } from './AdminZone.style';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { accessAdminZone, adminDataFromSlice } from '../../redux/adminSlice';
import { AdminData, User } from '../../typescript/types';
import AdminProductList from '../../components/AdminProductList/AdminProductList';

const AdminZone = () => {
    const dispatch = useAppDispatch();

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
            const result = await dispatch(accessAdminZone(data));
            if (
                result.meta.requestStatus !== 'rejected' &&
                result.type !== '/admin/accessAdminZone/rejected'
            ) {
                //setText(result.payload.message);
            } else if (
                result.meta.requestStatus === 'rejected' &&
                result.type === '/admin/accessAdminZone/rejected'
            ) {
                const errorMessage = `Il y a eu une erreur...`;
                throw new Error(errorMessage);
            }
        } catch (err: any) {
            console.log('erreur..', err);
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
                    margin: '2rem 0',
                }}
            >
                {adminData.status === 'loading' && <p>Chargement...</p>}
            </div>
            <div>
                <AdminProductList />
            </div>
        </Container>
    );
};

export default AdminZone;
