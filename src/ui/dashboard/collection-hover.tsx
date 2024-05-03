"use client";

import { Axis3d, CalendarDays, FileJson, Files, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { TypesenseContext } from "@/context/typesense-context";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import clsx from "clsx";

export default function CollectionHover({ name }: { name: string }) {
  const { typesenseClient } = useContext(TypesenseContext);
  const { data: aliases } = useQuery({
    queryKey: ["aliases"],
    queryFn: async () => await typesenseClient?.aliases().retrieve(),
    enabled: typesenseClient ? true : false,
  });
  const { data } = useQuery({
    queryKey: ["collections", name],
    queryFn: async () => await typesenseClient?.collections(name).retrieve(),
    enabled: typesenseClient ? true : false,
  });

  if (!data) {
    return (
      <Button variant="link" asChild className="p-0">
        <Link href={`/collections/${name}`}>{name}</Link>
      </Button>
    );
  }

  const collectionAliases = aliases?.aliases.filter(
    (alias) => alias.collection_name === name
  );
  const date = new Date(data.created_at * 1000);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link" asChild className="p-0">
          <Link href={`/collections/${name}`}>
            {name}
            {collectionAliases && collectionAliases.length > 0 && (
              <Tag className="ml-2 h-4 w-4" />
            )}
          </Link>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{name}</h4>
          <div className="flex items-center pt-2">
            <Files className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Documents count: {data.num_documents}
            </span>
          </div>
          <div className="flex items-center pt-2">
            <FileJson className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Schema fields: {data.fields?.length}
            </span>
          </div>
          {collectionAliases && collectionAliases.length > 0 && (
            <div className="flex items-center pt-2">
              <Tag className="mr-2 h-4 w-4 opacity-70" />{" "}
              <span className="text-xs text-muted-foreground">
                {clsx("Alias", {
                  es: collectionAliases.length > 1,
                })}
                {": "}
                {collectionAliases.map((alias) => alias.name).join(",")}
              </span>
            </div>
          )}
          <div className="flex items-center pt-2">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
            <span className="text-xs text-muted-foreground">
              Created {date.toLocaleString()}
            </span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
