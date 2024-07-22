import React from "react";
import ReactDOM from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import axios from "axios";
import "./index.css";
import Login from "./auth/login";
import Register from "./auth/register";
import Issues from "./app/issues";
import AppLayout from "./app/layout";
import AuthLayout from "./auth/layout";
import Resolvers from "./app/resolvers";
import Reports from "./app/reports";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to="/login" replace />,
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "issues",
                element: <Issues />,
            },
            {
                path: "resolvers",
                element: <Resolvers />,
            },
            {
                path: "reports",
                element: <Reports />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;
