'use server';

import { NextResponse } from 'next/server';
import { getUser, createUser } from '../../db';

export async function POST(request: Request) {
  const { name, email, password } = await request.json();

  try {
    const user = await getUser(email);

    if (user === null) {
      await createUser(name, email, password);
      return NextResponse.json({ message: 'Creating user' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }
  } catch {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}