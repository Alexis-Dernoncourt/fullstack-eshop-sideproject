import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './redux/hooks';
import { userState } from './typescript/types';
import { verifyRoles } from './utils/utils';

const ProtectedAdminRoutes = () => {
    const user: userState = useAppSelector((state) => state.user);

    return verifyRoles(user?.userData?.userRoles, 'Admin') ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default ProtectedAdminRoutes;

export const ProtectedEditorRoutes = () => {
    const user: userState = useAppSelector((state) => state.user);

    return verifyRoles(user?.userData?.userRoles, 'Editor') ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};
