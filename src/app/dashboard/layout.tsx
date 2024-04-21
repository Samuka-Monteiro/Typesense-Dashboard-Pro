import * as React from "react";
import NavLinks from "@/ui/dashboard/nav-link";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-wrap h-screen">
      <aside className="px-4 py-8 border-r w-full max-w-xs">
        <NavLinks />
      </aside>
      <div className="flex-1 p-10">{children}</div>
    </section>
  );
}
