import { NextAuthOptions, Session, Account, Profile } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"
import { JWT } from "next-auth/jwt"

const clientId = process.env.AZURE_AD_CLIENT_ID
const clientSecret = process.env.AZURE_AD_CLIENT_SECRET
const tenantId = process.env.AZURE_AD_TENANT_ID

if (!clientId || !clientSecret || !tenantId) {
    throw new Error('Required environment variables are missing');
}

export const authOptions: NextAuthOptions = {
    providers: [
        AzureADProvider({
            clientId,
            clientSecret,
            tenantId,
            authorization: {
                params: {
                    scope: "openid profile email offline_access"
                }
            }
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60, // 24 horas
    },
    callbacks: {
        async jwt({ token, account, profile }: { 
            token: JWT; 
            account: Account | null; 
            profile?: Profile;
        }): Promise<JWT> {
            if (account && profile) {
                return {
                    accessToken: account.access_token,
                    roles: profile.roles || [],
                    email: profile.email,
                    name: profile.name,
                    image: (profile as any).picture || (profile as any).photo || null
                }
            }
            return token
        },
        async session({ session, token }: {
            session: Session;
            token: JWT;
        }): Promise<Session> {
            if (session.user) {
                // Solo pasar información esencial a la sesión
                session.user.roles = token.roles || []
                session.user.email = token.email
                session.user.image = token.image
                session.accessToken = token.accessToken
            }
            return session
        }
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET
}