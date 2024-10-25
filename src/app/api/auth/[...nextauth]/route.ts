import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from '../../../db';
import { authConfig } from '../../../auth.config';

interface User {
  id: string;
  email: string;
  password: string;
}

const handler = NextAuth({
  pages: {
    signIn: "/",
  },
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials || !credentials.username || !credentials.password) return null;

        const email = credentials.username;
        const password = credentials.password;

        // Remover tipagem explícita para evitar conflito
        const user = await getUser(email);
        if (!user || !user.id || !user.password) return null;

        const passwordsMatch = await compare(password, user.password);
        if (passwordsMatch) {
          return {
            id: user.id,
            email: user.email,
            password: user.password
          };
        }

        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
