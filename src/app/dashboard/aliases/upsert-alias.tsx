"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";

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
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { typesenseClient } from "@/lib/typesense-client";

const schema = z.object({
  name: z.string().min(2, {
    message: "Alias name must be at least 2 characters.",
  }),
  collection: z.string(),
});

interface Props {
  collections: CollectionSchema[];
}

export default function UpsertAlias({ collections }: Props) {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      collection: "",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    toast.promise(
      typesenseClient.aliases().upsert(data.name, {
        collection_name: data.collection,
      }),
      {
        loading: "Loading...",
        success: (data) => {
          return `Alias has been upserted`;
        },
        error: "Error",
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-0 bg-gray-100 rounded-md p-8 border"
      >
        <div className="flex w-full max-w-4xl items-center space-x-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1 flex-1">
                <FormLabel>Alias name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-1 self-end flex-1 relative">
                <FormLabel>Target collection</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? collections.find(
                              (collection) => collection.name === field.value
                            )?.name
                          : "Select collection"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search collection..." />
                      <CommandEmpty>No collection found.</CommandEmpty>
                      <CommandGroup>
                        <CommandList>
                          {collections.map((collection) => (
                            <CommandItem
                              value={collection.name}
                              key={collection.name}
                              onSelect={() => {
                                form.setValue("collection", collection.name);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  collection.name === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
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
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="self-end">
            Upsert
          </Button>
        </div>
      </form>
    </Form>
  );
}
