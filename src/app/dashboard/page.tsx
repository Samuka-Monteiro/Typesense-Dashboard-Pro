import { typesenseClient } from "@/lib/typesense-client";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import Header from "./header";

async function getData(): Promise<CollectionSchema[]> {
  const collections = await typesenseClient.collections().retrieve();

  return collections;
}
export default async function DashboardPage() {
  const data = await getData();

  return (
    <div>
      <Header></Header>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
