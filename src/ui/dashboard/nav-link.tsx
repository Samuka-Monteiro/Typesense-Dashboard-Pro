"use client";

import Link from "next/link";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Server, LibraryBig, Axis3d, Settings2, KeyRound } from "lucide-react";
import CollectionActions from "@/ui/dashboard/collection-actions";
import { usePathname } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <div className="flex-1">
        <nav className="grid items-start text-sm font-medium lg:px-4 py-4">
          <Link
            href="/dashboard/server"
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              {
                "bg-muted text-primary font-bold":
                  pathname === "/dashboard/server",
              }
            )}
          >
            <Server className="h-4 w-4" />
            Server status
          </Link>
          <Link
            href="/dashboard"
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              {
                "bg-muted text-primary font-bold": pathname === "/dashboard",
              }
            )}
          >
            <LibraryBig className="h-4 w-4" />
            Collections
          </Link>
          <Link
            href="/dashboard/aliases"
            className={clsx(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
              {
                "bg-muted text-primary font-bold":
                  pathname === "/dashboard/aliases",
              }
            )}
          >
            <Axis3d className="h-4 w-4" />
            Aliases
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <Settings2 className="h-4 w-4" />
            Preset
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
          >
            <KeyRound className="h-4 w-4" />
            API keys
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Card x-chunk="dashboard-02-chunk-0">
          <CardHeader className="p-2 pt-0 md:p-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" className="w-full">
              Learn more
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );

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
