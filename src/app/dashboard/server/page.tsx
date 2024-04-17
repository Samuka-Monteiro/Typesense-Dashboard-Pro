import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { typesenseClient } from "@/lib/typesense-client";
import { Activity } from "lucide-react";
import React from "react";
import { HealthResponse } from "typesense/lib/Typesense/Health";
import { MetricsResponse } from "typesense/lib/Typesense/Metrics";

async function getData(): Promise<{
  health: HealthResponse;
  metrics: MetricsResponse;
}> {
  const health = await typesenseClient.health.retrieve();
  const metrics = await typesenseClient.metrics.retrieve();
  //console.log("health ", health, metrics);
  return {
    health,
    metrics,
  };
}
export default async function ServerPage() {
  const data = await getData();
  return (
    <div>
      <Alert variant={data.health.ok ? "default" : "destructive"}>
        <Activity className="h-4 w-4" />
        <AlertTitle>{data.health.ok ? "Healthy" : "Unhealthy"}</AlertTitle>
        <AlertDescription>
          {data.health.ok
            ? "Thrilled to announce that the server is in optimal health."
            : "The server is currently experiencing technical difficulties and may not be operating at its best."}
        </AlertDescription>
      </Alert>
    </div>
  );
}
