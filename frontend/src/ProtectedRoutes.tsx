import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken, selectCurrentUser } from './redux/auth/authSlice';
import { useAppSelector } from './redux/hooks';
import { User } from './typescript/types';
import { verifyRoles } from './utils/utils';

const ProtectedAdminRoutes = () => {
    const user: User = useAppSelector(selectCurrentUser);

    return verifyRoles(user?.userRoles, 'Admin') ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedAdminRoutes;

export const ProtectedEditorRoutes = () => {
    const user: User = useAppSelector(selectCurrentUser);

    return verifyRoles(user?.userRoles, 'Editor') ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export const RequireAuth = () => {
    const token: string = useAppSelector(selectCurrentToken);
    const user: User = useAppSelector(selectCurrentUser);
    const location = useLocation();

    return user && token ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location.pathname }} replace />
    );
};
