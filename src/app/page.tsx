import LoginForm from "./components/LoginForm";
import { getServerSession } from 'next-auth';
import { authConfig } from './auth.config';
import { Suspense } from 'react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authConfig);
  
  if (session) {
    redirect('/home');
  }

  return (
    <main>
      <Suspense fallback={<p>Carregando...</p>}>
        <LoginForm/>
      </Suspense>
    </main>
  );
}
