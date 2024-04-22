import {
  ArrowUpDown,
  Copy,
  FileDown,
  FilePenLine,
  MoreHorizontal,
  ScanSearch,
  Telescope,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteDialog } from "@/ui/dashboard/delete-dialog";
import { useState } from "react";
import { CellContext } from "@tanstack/react-table";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

export default function CollumnActions({
  cell,
}: {
  cell: CellContext<CollectionSchema, unknown>;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>
            <Telescope className="mr-2 h-4 w-4" />
            View collection
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FilePenLine className="mr-2 h-4 w-4" />
            Update schema
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Clone schema
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileDown className="mr-2 h-4 w-4" />
            Download schema
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ScanSearch className="mr-2 h-4 w-4" />
            View collection schema
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete collection
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteDialog
        name={""}
        queryKey={["collections"]}
        entity="collections"
        config={{
          trigger: null,
          setOpen,
          open,
        }}
      />
    </>
  );
}
