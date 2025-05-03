import { NextResponse } from 'next/server';
import { createPhylloUser } from '@/lib/phyllo';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 
});
  }

  try {
    const phylloUser = await createPhylloUser(email);
    return NextResponse.json({
      message: 'User created successfully',
      phylloUserId: phylloUser.id,
    });
  } catch (err) {
    console.error('Phyllo error:', err);
    return NextResponse.json({ message: 'Phyllo failed' }, { status: 500 
});
  }
}

