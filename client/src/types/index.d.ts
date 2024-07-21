export interface ApiResponse<T = any> {
    status: "success" | "error";
    message: string | null;
    data?: T;
    errors?: Record<string, string[]>;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
}
