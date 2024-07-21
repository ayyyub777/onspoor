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
import { register } from "../actions/auth";

export default function Register() {
    const [isPending, startTransition] = useTransition();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        password: null,
        password_confirmation: null,
    });

    const [processing, setProcessing] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleRegister = async () => {
        setProcessing(true);
        try {
            await register(
                values.name,
                values.email,
                values.password,
                values.password_confirmation
            );
            navigate("/issues");
        } catch (error: any) {
            setErrors({
                name: error.response?.data?.errors?.name || null,
                email: error.response?.data?.errors?.email || null,
                password: error.response?.data?.errors?.password || null,
                password_confirmation:
                    error.response?.data?.errors?.password_confirmation || null,
            });
        } finally {
            setProcessing(false);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        startTransition(() => {
            handleRegister();
        });
    };

    return (
        <div className="h-screen flex items-center">
            <Card className="mx-auto w-[384px] max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl leading-tight">
                        Register
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid gap-4" onSubmit={submit}>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="name"
                                name="name"
                                placeholder="Username"
                                required
                                value={values.name}
                                autoComplete="username"
                                onChange={handleInputChange}
                            />
                            <InputError message={errors.email} />
                        </div>
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
                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                placeholder="••••••••"
                                required
                                name="password_confirmation"
                                value={values.password_confirmation}
                                autoComplete="current-password"
                                onChange={handleInputChange}
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing || isPending}
                        >
                            {processing ? "Registering..." : "Register"}
                        </Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
