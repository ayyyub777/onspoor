import axios from "axios";

export async function login(email: string, password: string) {
    try {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/login", {
            email,
            password,
        });
    } catch (error) {
        console.error(error);
    }
}
