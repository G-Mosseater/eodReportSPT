import NextAuth from "next-auth";
import { User } from "../../../models/schema";
import { connectDatabase } from "../../../helpers/db";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
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

      async authorize(credentials: any) {
        try {
          await connectDatabase();
          const user = await User.findOne({ email: credentials?.email }).select(
            "+password",
          );
          if (!user) {
            throw new Error("User not found");
          }
          const isValidPassword = await bcrypt.compare(
            credentials?.password ?? "",
            user.password,
          );
          if (!isValidPassword) {
            throw new Error("Invalid password");
          }
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (err) {
          return null;
        }
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
});

export { handler as GET, handler as POST };
