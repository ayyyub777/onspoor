// @ts-ignore

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "src/data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Badge } from "src/components/ui/badge";

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;

    return (
        <div className="flex flex-col gap-4 md:gap-2 md:flex-row md:items-center md:justify-between">
            <h1 className="text-xl leading-tight flex justify-between md:justify-normal items-center gap-4">
                <span>Resolvers</span>
                <Badge variant="secondary">
                    {table.getRowCount()} Resolvers
                </Badge>
            </h1>
            <div className="flex items-center space-x-2">
                {isFiltered && (
                    <Button
                        variant="link"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8"
                    >
                        <Cross2Icon className="mr-1 h-4 w-4" />
                        Reset
                    </Button>
                )}
                <Input
                    placeholder="Filter resolvers..."
                    value={
                        (table.getColumn("name")?.getFilterValue() as string) ??
                        ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("name")
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full h-8 md:w-[150px] lg:w-[250px]"
                />
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
