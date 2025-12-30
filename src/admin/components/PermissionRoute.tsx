import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../contexts/AdminAuthContext';

interface PermissionRouteProps {
    children: React.ReactNode;
    requiredPermission: string;
}

export const PermissionRoute: React.FC<PermissionRouteProps> = ({
    children,
    requiredPermission
}) => {
    const { hasPermission, isSuperAdmin, getFirstAvailablePage } = useAdminAuth();

    // Super admins have access to everything
    if (isSuperAdmin()) {
        return <>{children}</>;
    }

    // Check if user has the required permission
    if (hasPermission(requiredPermission)) {
        return <>{children}</>;
    }

    // Redirect to first available page if no permission
    const firstPage = getFirstAvailablePage();
    return <Navigate to={firstPage} replace />;
};
