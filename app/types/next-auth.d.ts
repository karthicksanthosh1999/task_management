import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
        company: string;
        mobile: string;
    }

    interface Session {
        user: {
            id: string;
            role: string;
            company: string;
            mobile: string;
            email: string;
            mobile: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        role: string;
        company: string;
        mobile: string;
        email: string;
        mobile: string;
    }
}
