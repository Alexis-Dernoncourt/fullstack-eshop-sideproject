import { Container } from './AdminZone.style';
import AdminProductList from '../../components/AdminProductList/AdminProductList';

const AdminZone = () => {
    return (
        <Container>
            <h1>Admin Dashboard</h1>
            <section>
                <AdminProductList />
            </section>
        </Container>
    );
};

export default AdminZone;
