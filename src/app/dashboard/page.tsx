import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { columns } from "@/ui/dashboard/collections/columns";
import { DataTable } from "@/ui/dashboard/collections/data-table";
import TypesenseDataProvider from "@/lib/TypesenseDataProvider";

async function getData(): Promise<CollectionSchema[]> {
  const dataProvider = new TypesenseDataProvider();
  const collections = await dataProvider.getCollections()

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
