import type { Metadata } from "next";
import { Aleo } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers/query-provider";

const aleo = Aleo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChattyAppy | Stay Connected with Friends",
  description: "Utilizing typescript, next.js, and socket.io",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"></link>
      </head>
      <QueryProvider>
        <body className={aleo.className}>{children}</body>
      </QueryProvider>
    </html>
  );
}
