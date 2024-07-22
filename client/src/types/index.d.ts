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

export interface Resolver {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface IssuesByDate {
    date: string;
    counts: {
        status: {
            backlog: number;
            todo: number;
            "in progress": number;
            done: number;
            canceled: number;
        };
        priority: {
            low: number;
            medium: number;
            high: number;
        };
    };
}
