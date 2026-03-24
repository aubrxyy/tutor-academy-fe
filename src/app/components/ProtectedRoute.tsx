import { Navigate, Outlet, useLocation } from "react-router";
import { type AppRole, useAuth } from "../auth/AuthContext";

interface ProtectedRouteProps {
  allowRoles: AppRole[];
}

export default function ProtectedRoute({ allowRoles }: ProtectedRouteProps) {
  const location = useLocation();
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    const redirectTarget = `${location.pathname}${location.search}${location.hash}`;
    return (
      <Navigate
        to={`/login?redirect=${encodeURIComponent(redirectTarget)}`}
        replace
      />
    );
  }

  if (!hasRole(...allowRoles)) {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}
