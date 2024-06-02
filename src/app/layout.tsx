import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { inter } from "@/ui/fonts";
import TypesenseProvider from "@/context/typesense-context";

export const metadata: Metadata = {
  title: "Typesense Dashboard Pro",
  description:
    "Leverage the full power of Typesense with this professional dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <TypesenseProvider>
          <main>{children}</main>
        </TypesenseProvider>
        <Toaster position="top-center" richColors theme="light" />
      </body>
    </html>
  );
}
