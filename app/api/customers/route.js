import { db } from '@/lib/db';
import { customers } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allCustomers = await db.select({
      id: customers.id,
      name: customers.name,
      email: customers.email,
      createdAt: customers.createdAt,
    }).from(customers).orderBy(customers.name);

    return NextResponse.json({ customers: allCustomers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
