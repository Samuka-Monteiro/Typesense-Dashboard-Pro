"use client";

import { createContext, useEffect, useState } from "react";
import { Client } from "typesense";
import { CollectionAliasSchema } from "typesense/lib/Typesense/Aliases";
import { CollectionSchema } from "typesense/lib/Typesense/Collection";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const TypesenseContext = createContext<{
  typesenseClient?: Client;
  queryClient: QueryClient;
}>({ queryClient });

export default function TypesenseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [typesenseClient, setTypesenseClient] = useState<Client>();

  useEffect(() => {
    const typesenseConfig = JSON.parse(
      window.localStorage.getItem("typesense") as string
    );

    if (typesenseConfig) {
      const client = new Client({
        nodes: [
          {
            host: typesenseConfig.host,
            port: typesenseConfig.port,
            protocol: typesenseConfig.protocol,
          },
        ],
        apiKey: typesenseConfig.apikey,
        connectionTimeoutSeconds: Number(
          process.env.NEXT_PUBLIC_TYPESENSE_CONNECTION_TIMEOUT
        ),
      });

      setTypesenseClient(client);
    }
  }, []);

  return (
    <TypesenseContext.Provider value={{ typesenseClient, queryClient }}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TypesenseContext.Provider>
  );
  /* 
  const [aliases, setAliases] = useState<CollectionAliasSchema[]>([]);
  const [collections, setCollections] = useState<CollectionSchema[]>([]);

  useEffect(() => {
    async function fetchCollections() {
      const typesense = JSON.parse(
        window.localStorage.getItem("typesense") as string
      );

      const typesenseClient = new Client({
        nodes: [
          {
            host: typesense.host,
            port: typesense.port,
            protocol: typesense.protocol,
          },
        ],
        apiKey: typesense.apikey,
        connectionTimeoutSeconds: Number(
          process.env.NEXT_PUBLIC_TYPESENSE_CONNECTION_TIMEOUT
        ),
      });

      const [collections, aliases] = await Promise.all([
        typesenseClient.collections().retrieve(),
        typesenseClient.aliases().retrieve(),
      ]);

      setCollections(collections);
      setAliases(aliases.aliases);
    }

    fetchCollections();
  }, []); */
}
