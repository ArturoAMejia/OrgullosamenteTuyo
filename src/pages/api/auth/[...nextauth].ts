import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { checkUserEmailPassword, oAuthUser } from "@/database/dbAuth";
import { prisma } from "@/database/db";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" } as any,
        password: { label: "Password", type: "password" } as any,
      },
      async authorize({ username, password }) {
        // console.log({ email, password });
        return await checkUserEmailPassword(username, password);
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 1296000, /// 15d
    strategy: "jwt",
    updateAge: 86400, // cada día
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        user = user;

        switch (account.type) {
          case "credentials":
            token.user = await oAuthUser(user, account, token);
            break;

          case "oauth":
            token.user = await oAuthUser(user, account, token);
            break;
        }
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = token as any;
      user = user as any;
      return session;
    },
  },
};

export default NextAuth(authOptions);
