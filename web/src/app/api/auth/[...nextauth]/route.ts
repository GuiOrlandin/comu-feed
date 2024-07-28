import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await axios.post("http://localhost:3333/users", {
          email: user.email,
          name: user.name,
          password_hash: randomUUID(),
          avatar: user.image,
        });
      } catch (error) {
        if (
          error instanceof AxiosError &&
          error.response?.data.message === "Email ja em uso"
        ) {
          return true;
        }

        console.error("Erro ao salvar usuário no banco de dados:", error);
        return false;
      }

      return true;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
