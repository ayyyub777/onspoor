import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../actions/auth";
import { useEffect, useState } from "react";
import { Spinner } from "../components/ui/spinner";

export default function AuthLayout() {
    const [isAuth, setIsAuth] = useState<Boolean | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const result = await isAuthenticated();
            if (result) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        };

        checkAuth();
    }, []);

    if (isAuth === null) {
        return (
            <Spinner className="w-screen h-screen flex justify-center items-center" />
        );
    }

    if (isAuth) {
        return <Navigate to="/issues" replace />;
    }

    return (
        <>
            <Outlet />
        </>
    );
}
