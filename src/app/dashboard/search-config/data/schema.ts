import { z } from "zod";

export const schema = z.object({
  collection: z.string(),
  query_by: z.array(z.string()),
  /* preset: z.string(), */
  prefix: z.boolean(),
  prioritize_exact_match: z.boolean(),
  prioritize_token_position: z.boolean(),
  prioritize_num_matching_fields: z.boolean(),
  enable_overrides: z.boolean(),
  max_facet_values: z.coerce.number(),
  facet_by: z.array(z.string()),
  use_cache: z.boolean(),
  cache_ttl: z.coerce.number(),
});

export type SearchParameters = z.infer<typeof schema>;
