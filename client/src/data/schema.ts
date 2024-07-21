import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const issueSchema = z.object({
    id: z.number(),
    title: z.string(),
    status: z.string(),
    priority: z.string(),
    assignee: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

export type Issue = z.infer<typeof issueSchema>;
