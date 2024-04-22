"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/app/DataTableColumnHeader";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "../delete-dialog";
import Link from "next/link";

export const columns: ColumnDef<CollectionAliasSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Alias name" />
    ),
  },
  {
    accessorKey: "collection_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target collection" />
    ),
    cell: ({ row }) => {
      const collectionName = row.getValue("collection_name") as string;

      return (
        <Button variant="link" asChild className="p-0">
          <Link href={`/dashboard/collections/${collectionName}`}>
            {collectionName}
          </Link>
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="font-bold">Action</span>,
    cell: ({ row }) => {
      const alias = row.original;

      return <DeleteDialog name={alias.name} queryKey={["aliases"]} entity="aliases" />;
    },
  },
];
