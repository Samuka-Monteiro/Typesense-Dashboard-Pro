import { Client } from "typesense";
import { cookies } from "next/headers";
import { TypesenseConnection } from "@/ui/connect-form";

export default class TypesenseDataProvider {
  client: Client;

  constructor() {
    const typesenseConnection: TypesenseConnection = JSON.parse(
      cookies().get("typesense.connection")?.value as string
    );

    this.client = new Client({
      nodes: [
        {
          host: typesenseConnection.host,
          port: typesenseConnection.port,
          protocol: typesenseConnection.protocol,
        },
      ],
      apiKey: typesenseConnection.apikey,
      connectionTimeoutSeconds: Number(
        process.env.NEXT_PUBLIC_TYPESENSE_CONNECTION_TIMEOUT
      ),
    });
  }

  async getCollections() {
    return await this.client.collections().retrieve();
  }
}
