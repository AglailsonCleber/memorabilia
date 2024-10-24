'use client';

import Link from 'next/link';
import { register } from '../api/register/route';
import { SubmitButton } from '../submit-button';
import { useState } from 'react';
import { FormRegister } from '../formRegister';

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para mensagens de erro

  const handleRegister = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Verifica se as senhas correspondem
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não correspondem.');
      return; // Retorna sem fazer o registro
    }

    const message = await register(name, email, password);

    // Atualiza a mensagem com a resposta do registro
    setErrorMessage(message);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign Up</h3>
          <p className="text-sm text-gray-500">
            Create an account with your email and password
          </p>
        </div>
        <FormRegister action={handleRegister}>
          <SubmitButton>Sign Up</SubmitButton>
          <p className="text-center text-sm text-gray-600">
            {'Already have an account? '}
            <Link href="/login" className="font-semibold text-gray-800">
              Sign in
            </Link>
            {' instead.'}
          </p>
          {/* Renderiza a mensagem de erro, se existir */}
          {errorMessage && (
            <div className="text-center text-xl text-red-500">
              <p>{errorMessage}</p>
            </div>
          )}
        </FormRegister>
      </div>
    </div>
  );
}
