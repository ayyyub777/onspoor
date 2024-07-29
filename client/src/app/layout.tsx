import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "@/types";
import { getUser, isAuthenticated } from "src/actions/auth";
import { Spinner } from "src/components/ui/spinner";
import Navbar from "src/components/navbar";
import { ModalProvider } from "src/components/modal-provider";
import { RefreshProvider } from "src/context/refresh";
import { Toaster } from "src/components/ui/toaster";

export default function AppLayout() {
    const [isAuth, setIsAuth] = useState<Boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);

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
            <Navbar user={user} />
            <RefreshProvider>
                <ModalProvider />
                <Toaster />
                <Outlet />
            </RefreshProvider>
        </>
    );
}
