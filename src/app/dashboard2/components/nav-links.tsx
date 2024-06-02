"use client";

import Link from "next/link";
import clsx from "clsx";
import {
  Server,
  LibraryBig,
  Settings2,
  KeyRound,
  Tags,
  Gem,
  LineChart,
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/dashboard2/server"
        className={clsx(
          "mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          {
            "bg-muted text-primary font-bold": pathname === "/dashboard2/server",
          }
        )}
      >
        <Server className="h-5 w-5 lg:h-4 lg:w-4" />
        Server status
      </Link>
      <Link
        href="/dashboard2"
        className={clsx(
          "mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          {
            "bg-muted text-primary font-bold": pathname === "/dashboard2",
          }
        )}
      >
        <LibraryBig className="h-5 w-5 lg:h-4 lg:w-4" />
        Collections
      </Link>
      <Link
        href="/dashboard2/aliases"
        className={clsx(
          "mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          {
            "bg-muted text-primary font-bold":
              pathname === "/dashboard2/aliases",
          }
        )}
      >
        <Tags className="h-5 w-5 lg:h-4 lg:w-4" />
        Aliases
      </Link>
      <Link
        href="#"
        className="mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <LineChart className="h-5 w-5 lg:h-4 lg:w-4" />
        Analytics Rules
      </Link>
      <Link
        href="#"
        className="mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Settings2 className="h-5 w-5 lg:h-4 lg:w-4" />
        Preset
      </Link>
      <Link
        href="/dashboard2/api-keys"
        className={clsx(
          "mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          {
            "bg-muted text-primary font-bold":
              pathname === "/dashboard2/api-keys",
          }
        )}
      >
        <KeyRound className="h-5 w-5 lg:h-4 lg:w-4" />
        API keys
      </Link>
      {/* <Link
        href="/dashboard2/search-config"
        className={clsx(
          "mx-[-0.65rem] lg:mx-0 flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          {
            "bg-muted text-primary font-bold":
              pathname === "/dashboard2/search-config",
          }
        )}
      >
        <Gem className="h-5 w-5 lg:h-4 lg:w-4" />
        Search config
      </Link> */}
    </>
  );
}
