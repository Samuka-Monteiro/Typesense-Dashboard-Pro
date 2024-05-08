"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Asterisk } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCollectionsQuery from "@/hooks/use-collections-query";
import CollectionCombobox from "@/ui/collection-combobox";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SearchParameters, schema } from "../data/schema";
import { SearchParametersContext } from "@/context/search-parameters-context";
import { useContext, useEffect } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
import { defaultValues } from "../data/data";

export default function AddSearchParametersModal() {
  const { open, searchParameters, setOpen, setSearchParameters } = useContext(
    SearchParametersContext
  );
  const { data: searchParametersConfigs, setItem } =
    useLocalStorage<SearchParameters[]>("search_parameters");
  const { data: collections } = useCollectionsQuery();
  const form = useForm<SearchParameters>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const collectionName = form.watch("collection");
  const collection = collections?.find(
    (collection) => collection.name === collectionName
  );
  const indexFields = collection?.fields
    ?.filter((field) => field.index)
    .map((field) => ({
      value: field.name,
      label: field.name,
    }))
    .concat([{ value: "*", label: "All", icon: Asterisk }]);
  const facetFields = collection?.fields
    ?.filter((field) => field.facet)
    .map((field) => ({
      value: field.name,
      label: field.name,
    }))
    .concat([{ value: "*", label: "All", icon: Asterisk }]);

  // It's recommended to reset inside useEffect after submission.
  useEffect(() => {
    form.reset();
  }, [form, form.formState.isSubmitSuccessful]);

  useEffect(() => {
    form.reset(searchParameters ?? defaultValues);
  }, [form, searchParameters]);

  function onSubmit(data: SearchParameters) {
    const parameters = searchParametersConfigs.filter(
      (parameter) => parameter.collection !== data.collection
    );
    setItem(JSON.stringify([data].concat(parameters)));
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        asChild
        onClick={() => {
          console.log("click 1");
          setSearchParameters(undefined);
          console.log("click 1", searchParameters);
        }}
      >
        <Button variant="default" size="sm" className="ml-auto lg:flex">
          Add search config
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Search Parameters</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&lsquo;re
            done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="collection"
              render={({ field }) => (
                <FormItem>
                  <CollectionCombobox
                    value={field.value}
                    setValue={(value: string) => {
                      form.reset();
                      form.setValue("collection", value);
                    }}
                  />
                </FormItem>
              )}
            />
            <Accordion
              type="single"
              collapsible
              className="w-full pb-4"
              defaultValue="item-1"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger>Query & Filter paramenters</AccordionTrigger>
                <AccordionContent className="flex items-center gap-2 flex-wrap">
                  <FormField
                    control={form.control}
                    name="query_by"
                    render={({ field }) => (
                      <FormItem>
                        <DataTableFacetedFilter
                          title="query_by"
                          options={indexFields || []}
                          value={field.value}
                          setValue={(value: string[]) =>
                            form.setValue("query_by", value)
                          }
                        />
                      </FormItem>
                    )}
                  />
                  {/* <DataTableFacetedFilter title="preset" options={statuses} /> */}
                  <FormField
                    control={form.control}
                    name="prefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="prefix">Prefix</Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  Ranking and Sorting paramenters
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-2 gap-2">
                  <FormField
                    control={form.control}
                    name="prioritize_exact_match"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="prioritize-exact-match"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="prioritize-exact-match">
                              Prioritize exact match
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prioritize_token_position"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="prioritize-token-position"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="prioritize-token-position">
                              Prioritize token position
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="prioritize_num_matching_fields"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="prioritize-num-matching-fields"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="prioritize-num-matching-fields">
                              Prioritize num matching fields
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enable_overrides"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="enable-overrides"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="enable-overrides">
                              Enable overides
                            </Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Faceting paramenters</AccordionTrigger>
                <AccordionContent className="flex items-end gap-2">
                  <FormField
                    control={form.control}
                    name="max_facet_values"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs">
                          Max facet values
                        </FormLabel>
                        <FormControl>
                          <Input type="number" className="h-8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="facet_by"
                    render={({ field }) => (
                      <FormItem>
                        <DataTableFacetedFilter
                          title="facet_by"
                          options={facetFields || []}
                          value={field.value}
                          setValue={(value: string[]) =>
                            form.setValue("facet_by", value)
                          }
                        />
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger>Caching paramenters</AccordionTrigger>
                <AccordionContent className="flex flex-wap items-end gap-2">
                  <FormField
                    control={form.control}
                    name="cache_ttl"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs">Cache ttl</FormLabel>
                        <FormControl>
                          <Input type="number" className="h-8" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="enable_overrides"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center space-x-2 mb-1">
                            <Switch
                              id="use-cache"
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                            <Label htmlFor="use-cache">Use cache</Label>
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <DialogFooter>
              <Button type="submit">Save config</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
