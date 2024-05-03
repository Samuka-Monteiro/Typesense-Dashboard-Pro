import { TypesenseContext } from "@/context/typesense-context";
import { getUrlFilterParams } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useParams } from "next/navigation";
import { useContext } from "react";

export default function useSearchCollectionQuery() {
  const { typesenseClient } = useContext(TypesenseContext);
  const searchParams = useSearchParams();
  const params = useParams();

  const name = params.name as string;
  const query = searchParams.get("query") || "*";
  const query_by = searchParams.get("query_by") || undefined;
  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 12;
  const filter_by = getUrlFilterParams(searchParams);

  const data = useQuery({
    queryKey: ["collections", name, { query, per_page, page, filter_by, query_by }],
    queryFn: async () =>
      await typesenseClient
        ?.collections(name)
        .documents()
        .search({
          q: query_by ? query : "*", // fallback to wildcard if no query_by specified
          query_by,
          facet_by: "*",
          per_page,
          page,
          filter_by,
        }),
    enabled: typesenseClient ? true : false,
  });

  return { ...data, filter_by };
}
