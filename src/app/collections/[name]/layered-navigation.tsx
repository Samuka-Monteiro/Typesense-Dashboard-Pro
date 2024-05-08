"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import useSearchCollectionQuery from "@/hooks/use-search-collection-query";
import { Button } from "@/components/ui/button";
import { Eraser, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import clsx from "clsx";

export default function LayeredNavigation() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { data, filter_by } = useSearchCollectionQuery();

  function handleFilter(checked: boolean, fieldName: string, value: string) {
    const params = new URLSearchParams(searchParams);
    const previousFilters = params.getAll("filter_by");

    if (checked) {
      params.set(
        "filter_by",
        previousFilters.concat([`${fieldName}=${value}`]).join("&")
      );
    } else {
      const newFilters = previousFilters[0]
        .split("&")
        .filter((filter) => !filter.includes(`${fieldName}=${value}`));

      if (newFilters.length > 0) {
        params.set("filter_by", newFilters.join("&"));
      } else {
        params.delete("filter_by");
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <aside className="flex flex-col gap-6">
      {/* {filter_by && (
        <section>
          <div className="flex flex-col items-start gap-2">
            {filter_by?.split(" && ").map((filter, index) => {
              const slug = filter.split(":=");
              return (
                <Badge
                  key={index}
                  className="text-sm py-2 px-4 border cursor-pointer"
                  variant="secondary"
                  onClick={() =>
                    handleFilter(false, slug[0], slug[1].replace(/\[|\]/g, ""))
                  }
                >
                  {slug[0]}: {slug[1].replace(/\[|\]/g, "")}
                  <X className="ml-2 h-4 w-4" />
                </Badge>
              );
            })}
          </div>
          <Button
            variant="destructive"
            className="mt-4 underline"
            onClick={() => handleClearFilters()}
          >
            Clear all
            <Eraser className="ml-2 h-4 w-4" />
          </Button>
        </section>
      )} */}
      <div className="rounded-md px-4">
        {data?.facet_counts?.map((facet, index) => (
          <div key={index}>
            <Accordion
              type="single"
              collapsible
              defaultValue={facet.field_name}
            >
              <AccordionItem value={facet.field_name}>
                <AccordionTrigger
                  className={clsx("font-semibold", {
                    "pt-0": index === 0,
                  })}
                >
                  {facet.field_name}
                </AccordionTrigger>
                <AccordionContent>
                  {facet.stats.total_values > facet.counts.length && (
                    <div className="relative pb-4">
                      <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search option"
                        className="pl-8 w-full"
                        /* onChange={(e) => {
                          handleSearch(e.target.value);
                        }} */
                        value={searchParams.get("query")?.toString()}
                      />
                    </div>
                  )}
                  <ScrollArea type="always">
                    <div className="flex flex-col gap-5 max-h-64">
                      {facet.counts.map((count, iterator) => (
                        <div
                          key={iterator}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${facet.field_name}_${count.value}`}
                            onCheckedChange={(checked: boolean) =>
                              handleFilter(
                                checked,
                                facet.field_name,
                                count.value
                              )
                            }
                            checked={
                              filter_by
                                ?.split(" && ")
                                ?.includes(
                                  `${facet.field_name}:=[${count.value}]`
                                ) ?? false
                            }
                          />
                          <label
                            htmlFor={`${facet.field_name}_${count.value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {count.value}{" "}
                            <Badge variant="secondary" className="font-normal">
                              {count.count}
                            </Badge>
                          </label>
                        </div>
                      ))}
                      {facet.stats.total_values > facet.counts.length && (
                        <span>load more</span>
                      )}
                    </div>
                  </ScrollArea>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>
    </aside>
  );
}
