import { TypesenseContext } from "@/context/typesense-context";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useCollectionsQuery() {
  const { typesenseClient } = React.useContext(TypesenseContext);

  const data = useQuery({
    queryKey: ["collections"],
    queryFn: async () => await typesenseClient?.collections().retrieve(),
    enabled: typesenseClient ? true : false,
  });

  return { ...data };
}
