import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from './db';
import { authConfig } from './auth.config';

export const authOptions: AuthOptions = {
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
        if (!credentials) return null;

        const email = credentials.username;
        const password = credentials.password;

        const user = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) return null;

        // Ajustando para o formato esperado pelo NextAuth
        return {
          id: user._id.toString(),  // usando _id do MongoDB como ID de usuário
          email: user.email,
          name: user.name,          // opcional, mas você pode adicionar se estiver disponível
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
