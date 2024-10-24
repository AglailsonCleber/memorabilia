import LoginForm from "./login/page";
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    redirect('/home');
  }

  return (
    <main>
      <LoginForm/>
    </main>
  );
}
