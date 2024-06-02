"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from 'next/navigation'
import { useCookie } from "react-use";

const formSchema = z.object({
  host: z.string(),
  port: z.coerce.number(),
  protocol: z.enum(["http", "https"]),
  apikey: z.string(),
});

export type TypesenseConnection = z.infer<typeof formSchema>;

export default function ConnectForm() {
  const [_, updateCookie] = useCookie("typesense.connection");
  const router = useRouter();
  const form = useForm<TypesenseConnection>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      protocol: "http",
    },
  });

  function onSubmit(values: TypesenseConnection) {
    updateCookie(JSON.stringify(values))
    router.push('/dashboard')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Host</FormLabel>
                <FormControl>
                  <Input placeholder="localhost" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="port"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Port</FormLabel>
                <FormControl>
                  <Input placeholder="8108" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="protocol"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Protocol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="http" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="http">http</SelectItem>
                    <SelectItem value="https">https</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apikey"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel>Api Key</FormLabel>
                <FormControl>
                  <Input placeholder="xyz" {...field} className="mt-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Connect
        </Button>
      </form>
    </Form>
  );
}
