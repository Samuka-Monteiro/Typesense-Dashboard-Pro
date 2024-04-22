import { typesenseClient } from "@/lib/typesense-client";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { columns } from "@/ui/dashboard/collections/columns";
import { DataTable } from "@/ui/dashboard/collections/data-table";

async function getData(): Promise<CollectionSchema[]> {
  const collections = await typesenseClient.collections().retrieve();

  return collections;
}

export default async function Page() {
  const data = await getData();

  return (
    <div>
      <div className="pb-8">
        <h2 className="text-2xl font-bold pb-1">Collections</h2>
        <p className="text-sm">
          A collection contains a set of JSON documents, and defines the
          structure of these documents.
        </p>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
