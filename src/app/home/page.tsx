import Layout from '../components/Layout';

export default async function HomePage() {
  return (
    <div>
      <Layout>
        <h1 className="text-3xl font-bold">Welcome to the Home Page!</h1>
        <p>This is the main content area.</p>
      </Layout>
    </div>
  );
}