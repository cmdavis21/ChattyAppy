import type { Metadata } from "next";
import { Aleo } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const aleo = Aleo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChattyAppy | Stay Connected with Friends",
  description: "Utilizing typescript, next.js, and socket.io",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={aleo.className}>
        <head>
          <link rel="icon" href="chat-logo.png" type="image/icon" />
        </head>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
