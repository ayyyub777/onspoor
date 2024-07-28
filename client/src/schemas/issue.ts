import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required"),
    status: z.string().min(1, "Status is required"),
    priority: z.string().min(1, "Priority is required"),
    assignee: z.string().min(1, "Assignee is required"),
});

export type Issue = {
    id: number;
    title: string;
    status: string;
    priority: string;
    assignee: string;
    created_at: string;
    updated_at: string;
};
