import { getServerSession } from 'next-auth';
import { authConfig } from '../auth.config';
import Layout from '../components/Layout';

export default async function ProtectedPage() {
  const session = await getServerSession(authConfig);
  
  if (!session) {
    return (
      <div className="flex h-screen bg-black">
        <div className="w-screen h-screen flex flex-col space-y-5 justify-center items-center text-white">
          <p>You are not authenticated. Please log in.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Layout>
      <h1 className="text-3xl font-bold">Welcome to the Contact Page!</h1>
      <p>This is the main content area.</p>
    </Layout>
    </div>
  );
}


