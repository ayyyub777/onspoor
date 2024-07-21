import { FormEventHandler, useState, useTransition } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { InputError } from "../components/ui/input-error";
import { login } from "../actions/auth";

export default function Login() {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });

    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleLogin = async () => {
        setProcessing(true);
        try {
            await login(values.email, values.password);
            navigate("/issues");
        } catch (error: any) {
            setErrors({
                email: error.response?.data?.errors?.email || null,
                password: error.response?.data?.errors?.password || null,
            });
        } finally {
            setProcessing(false);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        startTransition(() => {
            handleLogin();
        });
    };

    return (
        <div className="h-screen flex items-center">
            <Card className="mx-auto w-[384px] max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl leading-tight">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                                value={values.email}
                                autoComplete="email"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                required
                                name="password"
                                value={values.password}
                                autoComplete="current-password"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.password} />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing || isPending}
                        >
                            {processing ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
