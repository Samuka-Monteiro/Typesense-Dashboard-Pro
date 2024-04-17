import React from "react";
import {
  Server,
  LibraryBig,
  Axis3d,
  Settings2,
  KeyRound,
  Check,
  ChevronsUpDown,
} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { typesenseClient } from "@/lib/typesense-client";

async function getCollections(): Promise<CollectionSchema[]> {
  const collections = await typesenseClient.collections().retrieve();

  return collections;
}

export default async function MenuItemCollection() {
  const collections = await getCollections();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("next.js");

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
            ? collections.find((collection) => collection.name === value)?.name
            : "Select collection..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search collection..." />
          <CommandEmpty>No collection found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {collections.map((collection) => (
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
