import { Client } from "typesense";

export const client = new Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST as string,
      port: Number(process.env.NEXT_PUBLIC_TYPESENSE_PORT),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL as string,
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY as string,
  connectionTimeoutSeconds: Number(
    process.env.NEXT_PUBLIC_TYPESENSE_CONNECTION_TIMEOUT
  ),
});
