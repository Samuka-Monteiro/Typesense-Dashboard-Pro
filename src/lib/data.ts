import { ReadonlyURLSearchParams } from "next/navigation";

export function getUrlFilterParams(searchParams: ReadonlyURLSearchParams) {
  const filters = searchParams.get("filter_by")?.split("&");

  const filterBy = filters
    ?.map((filter) => {
      const data = filter.split("=");
      return `${data[0]}:=[${data[1]}]`;
    })
    .join(" && ");

  return filterBy;
}
