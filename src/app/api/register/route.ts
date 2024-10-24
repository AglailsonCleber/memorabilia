'use server';

import { redirect } from 'next/navigation';
import { getUser, createUser } from '../../db';

export async function register(name: string, email: string, password: string) {
  const user = await getUser(email);

  if (user === null) {
    await createUser(name, email, password);
    redirect('/login');
  } else {
    return 'User already exists';
  }
}
