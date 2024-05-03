"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import {
  ArrowDownUp,
  ChevronDown,
  FileDigit,
  FileSearch,
  Filter,
  Eraser,
  X,
} from "lucide-react";
import useCollectionQuery from "@/hooks/use-collection-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSearchCollectionQuery from "@/hooks/use-search-collection-query";
import { Badge } from "@/components/ui/badge";

export default function TopBar({ name }: { name: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const perPage = searchParams.get("per_page") || "12";
  const { data: collection } = useCollectionQuery(name);
  const { data, filter_by } = useSearchCollectionQuery();

  function handleHitsPerPage(hits: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (hits) {
      params.set("per_page", hits);
    } else {
      params.delete("per_page");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleQueryBy(checked: boolean, field: string) {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    const previousFilters = params.getAll("query_by");

    if (checked) {
      params.set("query_by", previousFilters.concat([`${field}`]).join(","));
    } else {
      const newFilters = previousFilters[0]
        .split(",")
        .filter((filter) => !filter.includes(`${field}`));

      if (newFilters.length > 0) {
        params.set("query_by", newFilters.join(","));
      } else {
        params.delete("query_by");
      }
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function handleClearFilters() {
    const params = new URLSearchParams(searchParams);
    params.delete("filter_by");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="pb-6 flex items-baseline justify-between gap-2">
      {filter_by ? (
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-start gap-2 flex-wrap max-w-4xl">
            {filter_by?.split(" && ").map((filter, index) => {
              const slug = filter.split(":=");
              return (
                <Badge
                  key={index}
                  className="cursor-pointer"
                  variant="secondary"
                  /* onClick={() =>
                    handleFilter(false, slug[0], slug[1].replace(/\[|\]/g, ""))
                  } */
                >
                  {slug[0]}: {slug[1].replace(/\[|\]/g, "")}
                  <X className="ml-2 h-4 w-4" />
                </Badge>
              );
            })}
          </div>
          <Button
            className="p-0"
            variant="link"
            onClick={() => handleClearFilters()}
          >
            Clear all
            <Eraser className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <span></span>
      )}
      <div className="flex items-center gap-2">
        <Select
          onValueChange={(value) => handleHitsPerPage(value)}
          value={perPage}
        >
          <SelectTrigger className="w-[160px]">
            <span className="text-muted-foreground">Hits per page: </span>
            <SelectValue placeholder="12" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="48">48</SelectItem>
              <SelectItem value="100">100</SelectItem>
              <SelectItem value="250">250</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Separator orientation="vertical" className="mx-2 hidden h-6 md:flex" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Search parameters
              <Settings className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Query parameters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FileDigit className="mr-2 h-4 w-4" />
                <span>Hits per page</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSearch className="mr-2 h-4 w-4" />
                <span>Query by</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter by</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort By</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Filter parameters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus className="mr-2 h-4 w-4" />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare className="mr-2 h-4 w-4" />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus className="mr-2 h-4 w-4" />
                <span>New Team</span>
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              Ranking and Sorting parameters
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FileDigit className="mr-2 h-4 w-4" />
                <span>Hits per page</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSearch className="mr-2 h-4 w-4" />
                <span>Query by</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter by</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort By</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Pagination parameters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FileDigit className="mr-2 h-4 w-4" />
                <span>Hits per page</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSearch className="mr-2 h-4 w-4" />
                <span>Query by</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter by</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort By</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Faceting parameters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FileDigit className="mr-2 h-4 w-4" />
                <span>Hits per page</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSearch className="mr-2 h-4 w-4" />
                <span>Query by</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter by</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort By</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Grouping parameters</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <FileDigit className="mr-2 h-4 w-4" />
                <span>Hits per page</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FileSearch className="mr-2 h-4 w-4" />
                <span>Query by</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Filter className="mr-2 h-4 w-4" />
                <span>Filter by</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ArrowDownUp className="mr-2 h-4 w-4" />
                <span>Sort By</span>
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>Others</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github className="mr-2 h-4 w-4" />
              <span>GitHub</span>
            </DropdownMenuItem>
            {/* <DropdownMenuItem>
            <Github className="mr-2 h-4 w-4" />
            <span>GitHub</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Cloud className="mr-2 h-4 w-4" />
            <span>API</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
        {/* <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4"
          >
            Query by
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Select fields to query</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <ScrollArea className="w-full block">
            <div className="max-h-96 w-full relative">
              {data?.fields
                ?.filter((field) => field.index)
                .map((field) => (
                  <DropdownMenuCheckboxItem
                    key={field.name}
                    checked={searchParams.get("query_by")?.split(",").includes(field.name) ? true : false}
                    onCheckedChange={(checked) =>
                      handleQueryBy(checked, field.name)
                    }
                  >
                    {field.name}
                  </DropdownMenuCheckboxItem>
                ))}
            </div>
          </ScrollArea>
        </DropdownMenuContent>
      </DropdownMenu> */}
      </div>
    </div>
  );
}
