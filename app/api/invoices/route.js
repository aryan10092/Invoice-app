import { db } from '@/lib/db';
import { invoices } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { customerId, amount, status } = await request.json();

    if (!customerId || !amount) {
      return NextResponse.json(
        { error: 'Customer ID and amount are required' },
        { status: 400 }
      );
    }

    const newInvoice = await db.insert(invoices).values({
      customerId,
      amount: amount.toString(),
      status: status || 'pending',
    }).returning({
      id: invoices.id,
      customerId: invoices.customerId,
      amount: invoices.amount,
      status: invoices.status,
      date: invoices.date,
      createdAt: invoices.createdAt,
    });

    return NextResponse.json({ invoice: newInvoice[0] }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
