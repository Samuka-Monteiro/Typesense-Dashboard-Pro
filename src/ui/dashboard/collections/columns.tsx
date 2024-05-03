"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { DataTableColumnHeader } from "@/components/app/DataTableColumnHeader";
import CollumnActions from "./collumn-actions";
import CollectionHover from "../collection-hover";

export const columns: ColumnDef<CollectionSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Collection name" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;

      return <CollectionHover name={name} />;
    },
  },
  {
    accessorKey: "num_documents",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Documents count" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" />
    ),
    cell: ({ row }) => {
      const date = new Date((row.getValue("created_at") as number) * 1000);

      return date.toLocaleString();
    },
  },
  {
    id: "actions",
    header: () => <span className="font-bold">Actions</span>,
    cell: (cell) => <CollumnActions cell={cell} />,
  },
];
