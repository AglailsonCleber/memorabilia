import { getServerSession } from 'next-auth';
import { authOptions } from '../auth';
import { redirect } from 'next/navigation';
import Layout from '../components/Layout';

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);
  
  if (session) {
    return (
      <div>
        <Layout>
          <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
          <p>This is the main content area.</p>
        </Layout>
      </div>
    );
  }

  redirect('/login');
}


