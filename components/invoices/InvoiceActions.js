'use client';

import { useState } from 'react';

export default function InvoiceActions({ invoice, onUpdate }) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMarkAsPaid = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/invoices/${invoice.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'paid' }),
      });

      if (response.ok && onUpdate) {
        onUpdate(); // Refresh the data
      }
    } catch (error) {
      console.error('Error updating invoice:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {invoice.status === 'pending' && (
        <button
          onClick={handleMarkAsPaid}
          disabled={isUpdating}
          className="text-green-600 hover:text-green-700 text-sm font-medium disabled:opacity-50"
        >
          {isUpdating ? 'Updating...' : 'Mark Paid'}
        </button>
      )}
      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
        View
      </button>
    </div>
  );
}
