import axios from "axios";

export async function login(email: string, password: string) {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/login", {
        email,
        password,
    });
}

export async function register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string
) {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/register", {
        name,
        email,
        password,
        password_confirmation,
    });
}
