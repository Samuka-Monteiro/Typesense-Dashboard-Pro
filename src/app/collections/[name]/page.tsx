"use client";

import { TypesenseContext } from "@/context/typesense-context";
import useSearchCollectionQuery from "@/hooks/use-search-collection-query";
import { getUrlFilterParams } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";
import { ReadonlyURLSearchParams } from "next/navigation";
import { useContext } from "react";
import ReactJson from "react-json-view";

export default function Page() {
  const { data } = useSearchCollectionQuery();

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(350px,_1fr))] gap-2 overflow-hidden">
      {data?.hits?.map((hit, index) => (
        <ReactJson
          key={index}
          src={hit.document}
          collapseStringsAfterLength={20}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          collapsed={1}
          iconStyle="square"
          theme="rjv-default"
          style={{
            border: "solid 1px",
            borderRadius: "6px",
            padding: "24px",
            borderColor: "#e5e5e5",
          }}
          name={"document"}
        />
      ))}
    </div>
  );
}
