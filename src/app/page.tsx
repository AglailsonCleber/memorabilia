import LoginForm from "./login/page";
import { getServerSession } from 'next-auth';
import { authConfig } from './auth.config';
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authConfig);
  
  if (session) {
    redirect('/home');
  }

  return (
    <main>
      <LoginForm/>
    </main>
  );
}
