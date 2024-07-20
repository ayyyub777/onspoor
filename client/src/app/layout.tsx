import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated, logout } from "../actions/auth";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Spinner } from "../components/ui/spinner";

export default function AppLayout() {
    const [isAuth, setIsAuth] = useState<Boolean | null>(null);

    const handleLogout = async () => {
        await logout();
        setIsAuth(false);
    };

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

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Outlet />
            <Button onClick={handleLogout}>Logout</Button>
        </div>
    );
}
