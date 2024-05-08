import type { Metadata } from "next";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export const metadata: Metadata = {
  title: "Collection's search configuration",
  description: "Typesense collection search configuration page.",
};

export default function Page() {
  return (
    <div>
      <div className="pb-8">
        <h2 className="text-2xl font-bold pb-1">
          Collection&apos;s Search Configuration
        </h2>
        <p className="text-sm">
          An alias is a virtual collection name that points to a real
          collection. If you&apos;re familiar with symbolic links on Linux,
          it&apos;s very similar to that.
        </p>
      </div>
      <DataTable columns={columns} />
    </div>
  );
}
