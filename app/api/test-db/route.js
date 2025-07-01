import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    
    const result = await db.execute('SELECT 1 as test');
    return NextResponse.json({ 
      message: 'Database connection successful!', 
      result: result.rows 
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed', 
        details: error.message 
      }, 
      { status: 500 }
    )
  }
}
