"use client";

import { createContext, useEffect, useState } from "react";
import { Client } from "typesense";
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
}
