import { typesenseClient } from "@/lib/typesense-client";
import React from "react";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import UpsertAlias from "./upsert-alias";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";

async function getData(): Promise<{
  aliases: CollectionAliasSchema[];
  collections: CollectionSchema[];
}> {
  const data = await typesenseClient.aliases().retrieve();
  const collections = await typesenseClient.collections().retrieve();

  return { aliases: data.aliases, collections };
}

export default async function AliasesPage() {
  const data = await getData();
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
      <UpsertAlias collections={data.collections} />
      <DataTable columns={columns} data={data.aliases} />
    </div>
  );
}
