import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";
import { prisma } from "./database";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  async function middleware(req: any) {
    if (req.nextUrl.pathname.startsWith("/") && !req.nextauth.token)
      return NextResponse.rewrite(new URL("/auth/login", req.url));

    // if (req.nextUrl.pathname.startsWith("/auth/login") && req.nextauth.token)
    //   return NextResponse.rewrite(new URL("/", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/colaboradores",
    "/configuracion",
    "/equipos",
    "/respuestas-cuestionario",
  ],
};
