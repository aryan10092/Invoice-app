import { db } from '@/lib/db';
import { invoices, customers } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const allInvoices = await db
      .select({
        id: invoices.id,
        amount: invoices.amount,
        status: invoices.status,
        date: invoices.date,
        createdAt: invoices.createdAt,
        customerName: customers.name,
        customerEmail: customers.email,
        customerId: invoices.customerId,
      })
      .from(invoices)
      .innerJoin(customers, eq(invoices.customerId, customers.id))
      .orderBy(sql`${invoices.createdAt} DESC`);
    
    const formattedInvoices = allInvoices.map(invoice => ({
      ...invoice,
      amount: parseFloat(invoice.amount)
    }));

    return NextResponse.json({ invoices: formattedInvoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
