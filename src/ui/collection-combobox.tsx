"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TypesenseContext } from "@/context/typesense-context";
import { UseFormSetValue } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function CollectionCombobox({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>> | UseFormSetValue<any>;
}) {
  const { typesenseClient } = React.useContext(TypesenseContext);
  const { data: collections } = useQuery({
    queryKey: ["collections"],
    queryFn: async () => await typesenseClient?.collections().retrieve(),
    enabled: typesenseClient ? true : false,
  });
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? collections?.find((collection) => collection.name === value)?.name
            : "Select collection..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search collection..." />
          <CommandEmpty>No collection found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {collections?.map((collection) => (
                <CommandItem
                  key={collection.name}
                  value={collection.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === collection.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {collection.name}
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
