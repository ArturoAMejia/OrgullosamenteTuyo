import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { Lato } from "next/font/google";

import { Session } from "next-auth";
import { queryClient } from "@/util/queryClient";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "400", "700", "900"],
  variable: "--font-lato",
});

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <main className={`${lato.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
