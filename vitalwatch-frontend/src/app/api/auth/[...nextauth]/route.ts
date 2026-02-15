/**
 * VitalWatch NextAuth.js Configuration
 * Handles authentication with multiple providers
 */

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name: string;
    firstName: string;
    lastName: string;
    role: 'patient' | 'provider' | 'admin' | 'superadmin';
    avatar?: string;
    accessToken?: string;
    refreshToken?: string;
  }

  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    accessToken: string;
    refreshToken: string;
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
          }

          return {
            id: data.user.id,
            email: data.user.email,
            name: `${data.user.firstName} ${data.user.lastName}`,
            firstName: data.user.firstName,
            lastName: data.user.lastName,
            role: data.user.role,
            avatar: data.user.avatar,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.accessToken = user.accessToken || '';
        token.refreshToken = user.refreshToken || '';
      }

      // Handle Google OAuth - exchange for backend tokens
      if (account?.provider === 'google') {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/oauth/google`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                idToken: account.id_token,
                accessToken: account.access_token,
              }),
            }
          );

          const data = await response.json();
          if (response.ok) {
            token.id = data.user.id;
            token.role = data.user.role;
            token.firstName = data.user.firstName;
            token.lastName = data.user.lastName;
            token.accessToken = data.accessToken;
            token.refreshToken = data.refreshToken;
          }
        } catch (error) {
          console.error('Google OAuth exchange error:', error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role as 'patient' | 'provider' | 'admin' | 'superadmin';
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },

    async redirect({ url, baseUrl }) {
      // Handle role-based redirects after login
      if (url.startsWith(baseUrl)) {
        return url;
      }
      return baseUrl;
    },
  },

  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },

  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
