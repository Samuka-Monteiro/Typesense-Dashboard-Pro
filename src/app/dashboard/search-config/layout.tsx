import { ReactNode } from "react";
import SearchParametersProvider from "@/context/search-parameters-context";

export default function Layout({ children }: { children: ReactNode }) {
  return <SearchParametersProvider>{children}</SearchParametersProvider>;
}
