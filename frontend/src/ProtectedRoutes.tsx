import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser } from './redux/auth/authSlice';
import { useAppSelector } from './redux/hooks';
import { verifyRoles } from './utils/utils';

const ProtectedAdminRoutes = () => {
    const user = useAppSelector(selectCurrentUser);

    return verifyRoles(user?.userRoles, 'Admin') ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedAdminRoutes;

export const ProtectedEditorRoutes = () => {
    const user = useAppSelector(selectCurrentUser);

    return verifyRoles(user?.userRoles, 'Editor') ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export const RequireAuth = () => {
    const token = useAppSelector(selectCurrentToken);
    const location = useLocation();

    return token ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};
