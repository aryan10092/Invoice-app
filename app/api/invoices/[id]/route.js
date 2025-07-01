import { db } from '@/lib/db';
import { invoices } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
  try {
    const { status } = await request.json();
    const invoiceId = parseInt(params.id);

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const updatedInvoice = await db
      .update(invoices)
      .set({ status })
      .where(eq(invoices.id, invoiceId))
      .returning({
        id: invoices.id,
        status: invoices.status,
      })

    if (updatedInvoice.length === 0) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ invoice: updatedInvoice[0] });
  } catch (error) {
    console.error('Error updating invoice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
