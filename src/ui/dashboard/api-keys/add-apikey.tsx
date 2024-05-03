"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const items = [
  {
    id: "recents",
    label: "Create",
  },
  {
    id: "home",
    label: "Delete",
  },
  {
    id: "applications",
    label: "Get",
  },
  {
    id: "desktop",
    label: "List",
  },
  {
    id: "downloads",
    label: "All",
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  collectionPermissions: z.array(
    z.enum(["create", "delete", "get", "list", "*"])
  ),
});

type FormType = z.infer<typeof FormSchema>;

export default function AddApikey() {
  const form = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  function onSubmit(data: FormType) {}

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="flex flex-row space-y-0 justify-between rounded-md border p-4">
              <div>
                <FormLabel className="text-base">Collection actions</FormLabel>
                <FormDescription>
                  Select the permisions you want to grant for the collections.
                </FormDescription>
              </div>
              <div className="flex gap-x-8">
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="space-y-0 flex flex-col items-center"
                          /* className="flex flex-col justify-center space-y-0 space-x-0 ml-0" */
                        >
                          <FormLabel className="font-normal pb-2">
                            {item.label}
                          </FormLabel>
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
        <Button type="submit">Create API key</Button>
      </form>
    </Form>
  );
}
