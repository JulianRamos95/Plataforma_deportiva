import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode;
    adminOnly?: boolean;
}

function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
    const token = localStorage.getItem("token");
    const rol = localStorage.getItem("rol");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (adminOnly && rol !== "ADMIN") {
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;