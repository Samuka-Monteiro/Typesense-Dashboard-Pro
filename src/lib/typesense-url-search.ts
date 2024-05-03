import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { SearchOptions } from "typesense/lib/Typesense/Documents";

/**
 * This class is intednded to convert typesene search option
 * into url search parameters
 */
export default class TypesenseUrlSearch {
  searchParams: ReadonlyURLSearchParams;

  constructor(searchParams: ReadonlyURLSearchParams) {
    this.searchParams = searchParams;
  }
  static convertToUrlSearchParams(
    searchOptions: SearchOptions
  ): URLSearchParams {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(searchOptions)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          for (const item of value) {
            searchParams.append(key, item);
          }
        } else {
          searchParams.append(key, value.toString());
        }
      }
    }

    return searchParams;
  }
}
