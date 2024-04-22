"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TypesenseContext } from "@/context/typesense-context";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React, { Dispatch, ReactNode, SetStateAction } from "react";

export function DeleteDialog({
  name,
  queryKey,
  entity,
  config,
}: {
  name: string;
  queryKey: string[];
  entity: "collections" | "aliases";
  config?: {
    trigger?: ReactNode;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
  };
}) {
  const { typesenseClient, queryClient } = React.useContext(TypesenseContext);
  const mutation = useMutation({
    mutationFn: async (name: string) =>
      entity === "aliases"
        ? typesenseClient?.aliases(name).delete()
        : typesenseClient?.collections(name).delete(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return (
    <AlertDialog open={config?.open} onOpenChange={config?.setOpen}>
      {config ? (
        config.trigger
      ) : (
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
      )}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(name)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
