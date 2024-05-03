import { ReactNode } from "react";
import LayeredNavigation from "./layered-navigation";
import TopBar from "./top-bar";
import Search from "./Search";
import CollectionPagination from "./pagination";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
  params: { name: string };
}

export default function Layout({ children, params }: LayoutProps) {
  const name = params.name;

  return (
    <div className="py-4 lg:py-6 container">
      <Button variant="link" className="p-0 text-base" asChild>
        <Link href="/dashboard">
          <MoveLeft className="mr-2 h-6 w-6" />
          Back to Dashboard
        </Link>
      </Button>
      <div className="pb-6 pt-4 flex justify-between flex-wrap gap-2 items-baseline">
        <h1 className="text-2xl md:text-3xl font-black max-w-4xl leading-snug">
          {decodeURIComponent(name)}
        </h1>
        <Search />
      </div>
      <TopBar name={name} />
      <div className="grid grid-cols-[minmax(0,330px)1fr] gap-6">
        <LayeredNavigation />
        <div>
          {children}
          <div className="pt-6">
            <CollectionPagination />
          </div>
        </div>
      </div>
    </div>
  );
}
