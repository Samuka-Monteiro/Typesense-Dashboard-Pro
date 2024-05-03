"use client";

import React, { useContext } from "react";
import { TypesenseContext } from "@/context/typesense-context";
import { useQuery } from "@tanstack/react-query";
import ReactJson from "react-json-view";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge"

export default function Page({ params }: { params: { name: string } }) {
  const name = params.name;
  const { typesenseClient } = useContext(TypesenseContext);
  const { data: collection } = useQuery({
    queryKey: ["collections", name],
    queryFn: async () => await typesenseClient?.collections(name).retrieve(),
    enabled: typesenseClient ? true : false,
  });

  const facets = collection?.fields
    ?.filter((field) => field.facet)
    .map((field) => field.name);
  console.log(facets);

  const { data } = useQuery({
    queryKey: ["collections", name],
    queryFn: async () =>
      await typesenseClient?.collections(name).documents().search({
        q: "*",
        facet_by: facets,
      }),
    enabled: typesenseClient && facets ? true : false,
    staleTime: 0,
  });
  console.log("data ", data);
  /*  if (!invoice) {
    notFound();
  } */
  return (
    <div className="grid grid-cols-[200px_minmax(900px,_1fr)_100px] gap-12">
      <div>
        {data?.facet_counts?.map((facet, index) => (
          <div key={index}>
            <Accordion
              type="single"
              collapsible
              defaultValue={facet.field_name}
            >
              <AccordionItem value={facet.field_name}>
                <AccordionTrigger className="font-semibold">
                  {facet.field_name}
                </AccordionTrigger>
                <AccordionContent>
                  <ScrollArea type="always">
                    <div className="flex flex-col gap-5 max-h-64">
                    {facet.counts.map((count, iterator) => (
                      <div
                        key={iterator}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox id="terms" />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {count.value} <Badge variant="secondary" className="font-normal">{count.count}</Badge>
                        </label>
                      </div>
                    ))}
                    </div>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* <div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium leading-none">
                  {facet.field_name}
                </h4>
              </div>
              <Separator className="my-4" />
              {facet.counts.map((count, iterator) => (
                <div key={iterator} className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {count.value} ({count.count})
                  </label>
                </div>
              ))}
            </div> */}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-6">
        {data?.hits?.map((hit, index) => (
          <pre key={index} className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
            <ReactJson
              src={hit.document}
              collapseStringsAfterLength={20}
              enableClipboard={true}
              displayDataTypes={false}
              collapsed={1}
              iconStyle="square"
              onEdit={(data) => console.log("edit ", data)}
              onAdd={(data) => console.log("add ", data)}
              onDelete={(data) => console.log("delete ", data)}
              theme="grayscale:inverted"
              style={{
                border: "solid 1px",
                borderRadius: "6px",
                padding: "24px",
                borderColor: "#e5e5e5",
                backgroundColor: "#F3F4F666",
              }}
            />
          </pre>
        ))}
      </div>
    </div>
  );
}
