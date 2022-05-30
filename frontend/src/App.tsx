import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles';
import { useAppSelector } from './redux/hooks';
import { verifyRoles } from './utils/utils';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Announcement from './components/Announcement/Announcement';
import Footer from './components/Footer/Footer';
import Product from './pages/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import Cart from './pages/Cart/Cart';
import Dashboard from './pages/Dashboard/Dashboard';
import ConfirmEmail from './pages/ConfirmEmail/ConfirmEmail';
import PasswordUpdateForm from './components/PasswordUpdateForm/PasswordUpdateForm';
import AdressUpdateForm from './pages/AdressUpdateForm/AdressUpdateForm';
import AdminZone from './pages/AdminZone/AdminZone';
import ProtectedAdminRoutes, { RequireAuth } from './ProtectedRoutes';
import AddProduct from './pages/AddProduct/AddProduct';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import ProductUpdateForm from './pages/ProductUpdateForm/ProductUpdateForm';
import StripeSuccess from './pages/StripeSuccess/StripeSuccess';
import StripeCancel from './pages/StripeCancel/StripeCancel';
import ProductByCategoryList from './pages/ProductsByCategoryList/ProductsByCategoryList';

import { selectCurrentUser, selectCurrentToken } from './redux/auth/authSlice';

const App = () => {
    const user = useAppSelector(selectCurrentUser);
    const token = useAppSelector(selectCurrentToken);

    const isAdmin: boolean = user
        ? verifyRoles(user.userRoles, 'Admin')
        : false;

    return (
        <>
            <GlobalStyles />
            {user && token && isAdmin && <AdminNavbar />}
            <Announcement />
            <Navbar />
            <Toaster
                toastOptions={{
                    duration: 4000,
                    position: 'top-center',
                    style: {
                        boxShadow: '0px 0px 25px black',
                        padding: '16px',
                        fontSize: 'var(--fz-md)',
                    },
                }}
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/register"
                    element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<ProductList />} />
                <Route
                    path={`/products/filter`}
                    element={<ProductByCategoryList />}
                />
                <Route path="/products/:id" element={<Product />} />
                <Route
                    path="/payment/success"
                    element={user ? <StripeSuccess /> : <Navigate to="/" />}
                />
                <Route
                    path="/payment/cancel"
                    element={user ? <StripeCancel /> : <Navigate to="/" />}
                />
                <Route element={<RequireAuth />}>
                    <Route element={<ProtectedAdminRoutes />}>
                        <Route
                            path="/admin"
                            element={user ? <AdminZone /> : <Navigate to="/" />}
                        />
                        <Route
                            path="/admin/products/add"
                            element={
                                user ? <AddProduct /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/admin/products/update"
                            element={
                                user ? (
                                    <ProductUpdateForm />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                    </Route>
                    <Route
                        path="/confirm-email"
                        element={
                            user && !user?.validatedAccount ? (
                                <ConfirmEmail />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/password-update"
                        element={
                            user ? <PasswordUpdateForm /> : <Navigate to="/" />
                        }
                    />
                    <Route
                        path="/update-adress"
                        element={
                            user ? <AdressUpdateForm /> : <Navigate to="/" />
                        }
                    />
                </Route>

                <Route
                    path="/dashboard"
                    element={user ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
