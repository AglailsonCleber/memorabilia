'use client';

import Link from 'next/link';
import { Form } from '../form';
import { signIn } from 'next-auth/react';
import { SubmitButton } from '../submit-button';
import { useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  
  // Função de envio do formulário
  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result =await signIn('credentials', {
      username: formData.get('email') as string,
      password: formData.get('password') as string,
      callbackUrl: "/home",
    });

    if (result?.error) {
      console.error(result.error);
    }
  }, []);
  
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
        >
          <SubmitButton>Sign in</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {"Don't have an account? "}
            <Link href="/register" className="font-semibold text-gray-800">
              Sign up
            </Link>
            {' for free.'}
          </p>
          {error === "CredentialsSignin" && (<div className='text-center text-xl text-red-500'>Incorrect email or password</div>)}
        </Form>
        
      </div>
    </div>
  );
}