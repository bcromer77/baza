import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import  connectToDatabase  from '@/lib/db';
import CreatorAccount from '@/models/CreatorAccount';

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const {
      user_id,
      account_id,
      work_platform_id,
      connected_at,
      status,
    } = body;

    if (!user_id || !account_id || !work_platform_id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const updatedAccount = await CreatorAccount.findOneAndUpdate(
      { account_id },
      {
        user_id,
        account_id,
        work_platform_id,
        connected_at: new Date(connected_at),
        status,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, data: updatedAccount });
  } catch (error) {
    console.error('Error in save-account:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 
500 });
  }
}

