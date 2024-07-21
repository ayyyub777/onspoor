import { z } from "zod";

export const resolverSchema = z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Resolver = z.infer<typeof resolverSchema>;
