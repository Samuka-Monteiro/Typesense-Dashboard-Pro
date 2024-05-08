"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { SearchParameters } from "../data/schema";
import { DataTableColumnHeader } from "@/components/app/DataTableColumnHeader";
import { DataTableRowActions } from "./data-table-row-actions";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<SearchParameters>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "collection",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Collection name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("collection")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "query_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Query by" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm px-1 font-normal">
        {row.getValue<string[]>("query_by")?.length} selected
      </Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "facet_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facet by" />
    ),
    cell: ({ row }) => (
      <Badge variant="secondary" className="rounded-sm px-1 font-normal">
        {row.getValue<string[]>("facet_by")?.length} selected
      </Badge>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
