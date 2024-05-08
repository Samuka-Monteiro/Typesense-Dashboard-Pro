import { SearchParameters } from "./schema";

export const defaultValues: SearchParameters = {
  collection: "",
  query_by: [],
  facet_by: [],
  prefix: true,
  prioritize_exact_match: true,
  prioritize_token_position: false,
  prioritize_num_matching_fields: false,
  enable_overrides: true,
  max_facet_values: 10,
  use_cache: false,
  cache_ttl: 60,
};
