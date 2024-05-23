"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../lib/registry";
import { NextAuthProvider } from "@/utils/provider";

import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout(props: React.PropsWithChildren) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextAuthProvider>
        <html>
          <body className={inter.className}>
            <StyledComponentsRegistry>
              {props.children}
            </StyledComponentsRegistry>
          </body>
        </html>
      </NextAuthProvider>
    </QueryClientProvider>
  );
}
