import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "@/types";
import { getUser, isAuthenticated, logout } from "../actions/auth";
import { Spinner } from "../components/ui/spinner";
import Navbar from "../components/ui/navbar";
import { ModalProvider } from "../components/modal-provider";

export default function AppLayout() {
    const [isAuth, setIsAuth] = useState<Boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);

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

        const checkUser = async () => {
            const result = await getUser();
            if (result) {
                setUser(result);
            } else {
                setUser(null);
            }
        };

        checkAuth();
        checkUser();
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
        <>
            <ModalProvider />
            <Navbar user={user} />
            <Outlet />
        </>
    );
}
