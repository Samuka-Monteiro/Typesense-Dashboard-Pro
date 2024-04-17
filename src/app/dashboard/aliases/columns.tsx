"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/app/DataTableColumnHeader";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { typesenseClient } from "@/lib/typesense-client";
import { toast } from "sonner";

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
        <Button variant="link" asChild>
          <Link href={`/dashboard/collections/${collectionName}`}>
            {collectionName}
          </Link>
        </Button>
      );
    },
  },
  {
    id: "actions",
    header: ({ column }) => <span className="font-bold">Action</span>,
    cell: ({ row }) => {
      const alias = row.original;

      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  toast.promise(typesenseClient.aliases(alias.name).delete(), {
                    loading: "Loading...",
                    success: (data) => {
                      return `Alias has been deleted`;
                    },
                    error: "Error",
                  })
                }
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete alias</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
];
