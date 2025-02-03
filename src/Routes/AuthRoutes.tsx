import React from "react";
import { useLocation, Navigate } from "react-router"
import { useAuth } from "../context/useAuth";

type Props = { children: React.ReactNode };

const AuthRoute = ({ children }: Props) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();

    return isLoggedIn() ? (
        <>
            {children}
        </>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default AuthRoute; 