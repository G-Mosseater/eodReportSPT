import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../models/schema";
import { connectDatabase } from "../helpers/db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        await connectDatabase();

        const email = credentials?.email?.toLowerCase().trim();
        const user = await User.findOne({ email }).select("+password");

        if (!user) return null;

        const isValidPassword = await bcrypt.compare(
          credentials?.password ?? "",
          user.password
        );

        if (!isValidPassword) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          name: token.name,
        };
      }
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.BETTER_AUTH_SECRET,
};