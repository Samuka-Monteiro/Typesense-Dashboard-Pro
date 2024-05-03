import { TypesenseContext } from "@/context/typesense-context";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export default function useCollectionQuery(name: string) {
  const { typesenseClient } = useContext(TypesenseContext);

  const data = useQuery({
    queryKey: ["collections", name],
    queryFn: async () => await typesenseClient?.collections(name).retrieve(),
    enabled: typesenseClient ? true : false,
  });

  return { ...data };
}
