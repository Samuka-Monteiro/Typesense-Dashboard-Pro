import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex justify-between items-center pb-8">
      <div>
        <h2 className="text-2xl font-bold pb-1">Collections</h2>
        <p className="text-sm">
          A collection contains a set of JSON documents, and defines the
          structure of these documents.
        </p>
      </div>
      <Button asChild>
        <Link href="/dashboard/collections/new">Create collection</Link>
      </Button>
    </div>
  );
}
