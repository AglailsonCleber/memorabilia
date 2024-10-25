'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn('credentials', {
      email,
      password,
      callbackUrl: "/home",
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 px-4 py-6 sm:px-16">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign in
          </button>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
          {error === "CredentialsSignin" && (
            <div className='text-center text-xl text-red-500'>
              Incorrect email or password
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
