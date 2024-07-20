import axios from "axios";

export async function isAuthenticated() {
    try {
        await axios.get("/api/user");
        return true;
    } catch (error) {
        return false;
    }
}

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

export async function logout() {
    await axios.post("/logout");
}
