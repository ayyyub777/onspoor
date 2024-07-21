// @ts-ignore

import { ColumnDef } from "@tanstack/react-table";

import { priorities, statuses } from "../data/data";
import { Issue } from "@/schemas/issue";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Issue" />
        ),
        cell: ({ row }) => (
            <div className="w-[80px]">Issue-{row.getValue("id")}</div>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "title",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Title" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="max-w-[400px] truncate">
                        {row.getValue("title")}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = statuses.find(
                (status) => status.value === row.getValue("status")
            );

            if (!status) {
                return null;
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "priority",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Priority" />
        ),
        cell: ({ row }) => {
            const priority = priorities.find(
                (priority) => priority.value === row.getValue("priority")
            );

            if (!priority) {
                return null;
            }

            return (
                <div className="flex items-center">
                    {priority.icon && (
                        <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{priority.label}</span>
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: "assignee",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Assigned to" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="truncate">{row.getValue("assignee")}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Reported on" />
        ),
        cell: ({ row }) => {
            return (
                <div className="flex space-x-2">
                    <span className="truncate">
                        {new Date(
                            row.getValue("created_at")
                        ).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                        })}
                    </span>
                </div>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => <DataTableRowActions row={row} />,
    },
];
