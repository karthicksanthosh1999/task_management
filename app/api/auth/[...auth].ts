
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import axios from 'axios';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: 'email', placeholder: "Enter your email" },
                password: { label: "Password", type: 'password', placeholder: "Enter your password" },
            },
            async authorize(credentials, req) {
                const user = await axios.post(`/api/users`, { credentials })
                if (!user) {
                    return null
                }
                return user
            }
        }),
    ],
    pages: {
        signIn: "/login",
        signOut: "/",
        error: "/errorPage"
    }
})