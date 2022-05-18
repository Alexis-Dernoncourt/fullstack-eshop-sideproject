import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles';
import jwt_decode from 'jwt-decode';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getRefreshToken, logoutUser } from './redux/userSlice';
import { persistor } from './redux/store';
import { verifyRoles } from './utils/utils';
import { userState } from './typescript/types';
import { useSearchParams } from 'react-router-dom';

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
import ProtectedAdminRoutes from './ProtectedRoutes';
import AddProduct from './pages/AddProduct/AddProduct';
import AdminNavbar from './components/AdminNavbar/AdminNavbar';
import ProductUpdateForm from './pages/ProductUpdateForm/ProductUpdateForm';
import StripeSuccess from './pages/StripeSuccess/StripeSuccess';
import StripeCancel from './pages/StripeCancel/StripeCancel';
import ProductByCategoryList from './pages/ProductsByCategoryList/ProductsByCategoryList';

const App = () => {
    let [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    console.log(category);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user: userState = useAppSelector((state) => state.user);
    const token = user?.userData?.accessToken;
    let expirationTokenDate: number;
    let sessionExpirationDate: number;
    const isAdmin: boolean = user?.userData
        ? verifyRoles(user.userData.userRoles, 'Admin')
        : false;

    if (token) {
        const decoded: {
            userInfos: { roles: string[]; userId: string };
            sessionExpire: number;
            exp: number;
            iat: number;
        } = jwt_decode(`${token}`);
        expirationTokenDate = decoded.exp;
        sessionExpirationDate = decoded.sessionExpire;
    }

    const handleLogout = async () => {
        try {
            const logout = await dispatch(logoutUser());
            if (
                logout.meta.requestStatus !== 'rejected' &&
                logout.type !== '/auth/login/rejected'
            ) {
                persistor.purge();
                navigate('/');
            } else {
                const errorMessage = `Il y a eu une erreur...`;
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (
            user.authenticated &&
            expirationTokenDate &&
            new Date(expirationTokenDate * 1000) <= new Date(Date.now())
        ) {
            dispatch(getRefreshToken());
        }

        if (
            user.authenticated &&
            sessionExpirationDate &&
            new Date(sessionExpirationDate * 1000) <= new Date(Date.now())
        ) {
            //session expired
            //clean data & logout
            toast.error('Votre session a expiré. Veuillez vous reconnecter.');
            handleLogout();
        }

        const refresh = setInterval(() => {
            if (
                user.authenticated &&
                sessionExpirationDate &&
                new Date(sessionExpirationDate * 1000) <= new Date(Date.now())
            ) {
                //session expired
                //clean data & logout
                toast.error(
                    'Votre session a expiré. Veuillez vous reconnecter.'
                );
                handleLogout();
            }
            if (
                user.authenticated &&
                expirationTokenDate &&
                new Date(expirationTokenDate * 1000) <= new Date(Date.now())
            ) {
                dispatch(getRefreshToken());
            }
        }, 180000);

        return () => {
            clearInterval(refresh);
        };
    }, []);

    return (
        <>
            <GlobalStyles />
            {user && isAdmin && <AdminNavbar />}
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
                    element={
                        !user.authenticated ? <Register /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/login"
                    element={
                        !user.authenticated ? <Login /> : <Navigate to="/" />
                    }
                />
                <Route
                    path="/payment/success"
                    element={
                        user.authenticated ? (
                            <StripeSuccess />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/payment/cancel"
                    element={
                        user.authenticated ? (
                            <StripeCancel />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route element={<ProtectedAdminRoutes />}>
                    <Route
                        path="/admin"
                        element={
                            user.authenticated ? (
                                <AdminZone />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/admin/products/add"
                        element={
                            user.authenticated ? (
                                <AddProduct />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/admin/products/update"
                        element={
                            user.authenticated ? (
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
                        user.authenticated &&
                        !user?.userData?.validatedAccount ? (
                            <ConfirmEmail />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/password-update"
                    element={
                        user.authenticated ? (
                            <PasswordUpdateForm />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route
                    path="/update-adress"
                    element={
                        user.authenticated ? (
                            <AdressUpdateForm />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
                <Route path="/cart" element={<Cart />} />
                <Route path="/products" element={<ProductList />} />
                <Route
                    path={`/products/filter`}
                    element={<ProductByCategoryList />}
                />
                <Route path="/products/:id" element={<Product />} />
                <Route
                    path="/dashboard"
                    element={
                        user.authenticated ? (
                            <Dashboard />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
        </>
    );
};

export default App;
