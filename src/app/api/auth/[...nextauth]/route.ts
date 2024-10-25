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
        // Verifica se as credenciais foram fornecidas
        if (!credentials || !credentials.username || !credentials.password) return null;

        const email = credentials.username;
        const password = credentials.password;

        const user: User | null = await getUser(email);
        if (!user) return null;

        const passwordsMatch = await compare(password, user.password);
        if (passwordsMatch) {
          return user;
        }

        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
