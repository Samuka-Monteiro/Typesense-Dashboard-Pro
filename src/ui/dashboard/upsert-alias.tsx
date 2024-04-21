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
} from "@/components/ui/form";
import CollectionCombobox from "../collection-combobox";
import { useMutation } from "@tanstack/react-query";
import { TypesenseContext } from "@/context/typesense-context";

const schema = z.object({
  name: z.string().min(2, {
    message: "Alias name must be at least 2 characters.",
  }),
  collection: z.string(),
});

type UpsertAliasType = z.infer<typeof schema>;

export default function UpsertAlias() {
  const { typesenseClient, queryClient } = React.useContext(TypesenseContext);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      collection: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: UpsertAliasType) =>
      typesenseClient?.aliases().upsert(data.name, {
        collection_name: data.collection,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aliases"] });
    },
  });

  function onSubmit(data: UpsertAliasType) {
    mutation.mutate(data);
    form.reset()
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
                  <Input
                    {...field}
                    placeholder="Add a existing name for upserting"
                  />
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
                <CollectionCombobox
                  value={field.value}
                  setValue={(value: string) =>
                    form.setValue("collection", value)
                  }
                />
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
