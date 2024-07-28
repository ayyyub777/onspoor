import { z } from "zod";

export const resolverSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
});

export type Resolver = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
};
