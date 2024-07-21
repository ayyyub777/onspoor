"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Badge } from "./ui/badge";

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
                <span>Issue tracking</span>
                <Badge variant="secondary">{table.getRowCount()} Issues</Badge>
            </h1>
            <div className="flex items-center space-x-2">
                {isFiltered && (
                    <Button
                        variant="link"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8"
                    >
                        <Cross2Icon className="h-4 w-4" />
                        Reset
                    </Button>
                )}
                <Input
                    placeholder="Filter issues..."
                    value={
                        (table
                            .getColumn("title")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("title")
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-full h-8 md:w-[150px] lg:w-[250px]"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {table.getColumn("priority") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("priority")}
                        title="Priority"
                        options={priorities}
                    />
                )}
                <DataTableViewOptions table={table} />
            </div>
        </div>
    );
}
