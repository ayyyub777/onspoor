// @ts-ignore

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "src/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { resolverSchema } from "src/schemas/resolver";

import { useDeleteResolverModal } from "src/hooks/use-delete-resolver-modal";
import { useResolverFormModal } from "src/hooks/use-resolver-form-modal";

interface DataTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function DataTableRowActions<TData>({
    row,
}: DataTableRowActionsProps<TData>) {
    const resolver = resolverSchema.parse(row.original);
    const resolverFormModal = useResolverFormModal();
    const deleteResolverModal = useDeleteResolverModal();

    const handleEdit = () => {
        let params = new URLSearchParams(window.location.search);
        params.set("id", row.getValue("id"));
        params.set("name", row.getValue("name"));
        params.set("email", row.getValue("email"));

        let newUrl = window.location.pathname + "?" + params.toString();
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, "", newUrl);

        resolverFormModal.onOpen();
    };

    const handleDelete = () => {
        let params = new URLSearchParams(window.location.search);
        params.set("id", row.getValue("id"));
        params.set("name", row.getValue("name"));

        let newUrl = window.location.pathname + "?" + params.toString();
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, "", newUrl);

        deleteResolverModal.onOpen();
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
