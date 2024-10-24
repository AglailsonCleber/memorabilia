import { NextResponse } from 'next/server';
import { getUser, createUser } from '../../db';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json(); // Extrai os dados da requisição

    const user = await getUser(email);

    if (user === null) {
      await createUser(name, email, password);
      return NextResponse.redirect('/login');
    } else {
      return NextResponse.json({ message: 'User already exists' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
