import React from "react";
import { columns } from "@/ui/dashboard/aliases/columns";
import UpsertAlias from "@/ui/dashboard/upsert-alias";
import { DataTable } from "@/ui/dashboard/aliases/data-table";

export default async function AliasesPage() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-2xl font-bold pb-1">Aliases</h2>
        <p className="text-sm">
          An alias is a virtual collection name that points to a real
          collection. If you&apos;re familiar with symbolic links on Linux,
          it&apos;s very similar to that.
        </p>
      </div>
      <UpsertAlias />
      <DataTable columns={columns} />
    </div>
  );
}
