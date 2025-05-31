/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { connectToDatabase } from '@/lib/mongodb';
import { compareSync } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

type UserT = {
  email: string;
  password: string;
  redirect?: string;
  csrfToken?: string;
  callbackUrl: string;
  json?: string;
};

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt', // ✅ Necesario si no estás usando DB
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = req.body as UserT;
        const { db } = await connectToDatabase();
        const existingUser = await db.collection('users').findOne({ email });
        if (!existingUser) {
          return null;
        }

        const passwordMatch = compareSync(password, existingUser.password);
        if (passwordMatch) {
          return {
            email: existingUser.email,
            id: existingUser._id.toString(),
            ...existingUser,
          };
        }
        return null;
      },
    }),
  ],
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      // 3. Store user data in JWT token (only on sign-in)

      if (user) {
        token.role = user.role;
        token.favorites = user.favorites;
        token.applications = user.applications;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.favorites = token.favorites;
      session.user.applications = token.applications;
      session.user.id = token.id;
      return session;
    },
  },
};
