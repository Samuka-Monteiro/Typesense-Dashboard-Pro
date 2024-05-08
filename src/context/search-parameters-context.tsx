"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import { SearchParameters } from "@/app/dashboard/search-config/data/schema";

interface SearchParametersContextProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  searchParameters?: SearchParameters;
  setSearchParameters: Dispatch<SetStateAction<SearchParameters | undefined>>;
}
export const SearchParametersContext =
  createContext<SearchParametersContextProps>(
    {} as SearchParametersContextProps
  );

export default function SearchParametersProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [searchParameters, setSearchParameters] = useState<SearchParameters>();

  return (
    <SearchParametersContext.Provider
      value={{ open, searchParameters, setOpen, setSearchParameters }}
    >
      {children}
    </SearchParametersContext.Provider>
  );
}
