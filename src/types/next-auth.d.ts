// types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {
        user: {
            roles?: string[];
            image?: string;
        } & DefaultSession["user"]
        accessToken?: string;
        idToken?: string;
        refreshToken?: string;
        error?: string;
    }

    interface Profile {
        roles?: string[];
        email?: string;
        name?: string;
        image?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        roles?: string[];
        accessToken?: string;
        refreshToken?: string;
        idToken?: string;
        expiresAt?: number;
        error?: string;
        email?: string;
        name?: string;
        image?: string;
    }
}
