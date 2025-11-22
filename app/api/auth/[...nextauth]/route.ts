import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma"; // ✅ correct import

const handler = NextAuth({
  adapter: PrismaAdapter(prisma), // ✅ FIXED

  session: {
    strategy: "jwt",
  },

  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Please fill all inputs");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          throw new Error("User does not exist");
        }

        const verifiedPassword = await compare(
          // ✅ FIXED
          credentials.password,
          user.password
        );

        if (!verifiedPassword) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          company: user.company,
          mobile: user.mobile,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.company = user.company;
        token.mobile = user.mobile;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.company = token.company as string;
        session.user.mobile = token.mobile as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/",
    signOut: "/",
  },
});

export { handler as GET, handler as POST };
