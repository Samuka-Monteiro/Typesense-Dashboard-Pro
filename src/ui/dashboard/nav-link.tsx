"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Server, LibraryBig, Axis3d, Settings2, KeyRound } from "lucide-react";
import CollectionActions from "@/ui/dashboard/collection-actions";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-4">
      <Button
        variant="ghost"
        className={clsx("w-full justify-start", {
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground":
            pathname === "/dashboard/server",
        })}
        asChild
      >
        <Link href="/dashboard/server">
          <Server className="mr-2 h-4 w-4" />
          Server status
        </Link>
      </Button>
      <Button
        variant="ghost"
        className={clsx("w-full justify-start", {
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground":
            pathname === "/dashboard",
        })}
        asChild
      >
        <Link href="/dashboard">
          <LibraryBig className="mr-2 h-4 w-4" />
          Collections
        </Link>
      </Button>
      <CollectionActions />
      <Button
        variant="ghost"
        className={clsx("w-full justify-start", {
          "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground":
            pathname === "/dashboard/aliases",
        })}
        asChild
      >
        <Link href="/dashboard/aliases">
          <Axis3d className="mr-2 h-4 w-4" />
          Aliases
        </Link>
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <Settings2 className="mr-2 h-4 w-4" />
        Preset
      </Button>
      <Button variant="ghost" className="w-full justify-start">
        <KeyRound className="mr-2 h-4 w-4" />
        API keys
      </Button>
    </div>
  );
}
