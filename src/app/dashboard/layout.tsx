"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Server,
  LibraryBig,
  Axis3d,
  Settings2,
  KeyRound,
  Check,
  ChevronsUpDown,
  Search,
  RefreshCcw,
  SquareEqual,
  WandSparkles,
  FilePlus,
  BookPlus,
  BookMinus,
  Download,
  Bolt,
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
import Link from "next/link";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <section className="flex flex-wrap h-screen">
      <aside className="px-4 py-8 border-r w-full max-w-xs">
        <div className="flex flex-col gap-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            asChild
          >
            <Link href="/dashboard/server">
              <Server className="mr-2 h-4 w-4" />
              Server status
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            asChild
          >
            <Link href="/dashboard">
              <LibraryBig className="mr-2 h-4 w-4" />
              Collections
            </Link>
          </Button>
          <div>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  {value
                    ? frameworks.find((framework) => framework.value === value)
                        ?.label
                    : "Select collection..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[287px] p-0">
                <Command>
                  <CommandInput placeholder="Search collection..." />
                  <CommandEmpty>No collection found.</CommandEmpty>
                  <CommandGroup>
                    <CommandList>
                      {frameworks.map((framework) => (
                        <CommandItem
                          key={framework.value}
                          value={framework.value}
                          onSelect={(currentValue) => {
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === framework.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {framework.label}
                        </CommandItem>
                      ))}
                    </CommandList>
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            {value && (
              <div className="p-2 mt-4">
                <Button variant="ghost" className="w-full justify-start">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <SquareEqual className="mr-2 h-4 w-4" />
                  Synonyms
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <WandSparkles className="mr-2 h-4 w-4" />
                  Curation
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BookPlus className="mr-2 h-4 w-4" />
                  Add documents
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BookMinus className="mr-2 h-4 w-4" />
                  Delete documents
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export documents
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bolt className="mr-2 h-4 w-4" />
                  Collection settings
                </Button>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className="w-full justify-start text-base"
            asChild
          >
            <Link href="/dashboard/aliases">
              <Axis3d className="mr-2 h-4 w-4" />
              Aliases
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base">
            <Settings2 className="mr-2 h-4 w-4" />
            Preset
          </Button>
          <Button variant="ghost" className="w-full justify-start text-base">
            <KeyRound className="mr-2 h-4 w-4" />
            API keys
          </Button>
        </div>
      </aside>

      <div className="flex-1 p-10">{children}</div>
    </section>
  );
}
