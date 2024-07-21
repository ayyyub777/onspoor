"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { issueSchema } from "../data/schema";
import { useDeleteIssueModal } from "src/hooks/use-delete-issue-modal";
import { useIssueFormModal } from "src/hooks/use-issue-form-modal";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const issue = issueSchema.parse(row.original);
    const issueFormModal = useIssueFormModal();
    const deleteIssueModal = useDeleteIssueModal();

    const handleEdit = () => {
        let params = new URLSearchParams(window.location.search);
        params.set("id", row.getValue("id"));
        params.set("title", row.getValue("title"));
        params.set("status", row.getValue("status"));
        params.set("priority", row.getValue("priority"));
        params.set("assignee", row.getValue("assignee"));

        let newUrl = window.location.pathname + "?" + params.toString();
        history.pushState(null, "", newUrl);

        issueFormModal.onOpen();
    };

    const handleDelete = () => {
        let params = new URLSearchParams(window.location.search);
        params.set("id", row.getValue("id"));
        params.set("title", row.getValue("title"));

        let newUrl = window.location.pathname + "?" + params.toString();
        history.pushState(null, "", newUrl);

        deleteIssueModal.onOpen();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
                <DropdownMenuItem>Duplicate</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete}>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
