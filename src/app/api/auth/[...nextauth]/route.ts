import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from '../../../db';
import { authConfig } from '../../../auth.config';

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
        const user = await getUser(email);
        
        if (!user || !user._id || !user.password) return null;
        
        const passwordsMatch = await compare(password, user.password);
        
        if (passwordsMatch) {
          return {
            id: user._id,
            name: user.name,
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
