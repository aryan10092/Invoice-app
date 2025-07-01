import Link from 'next/link';
import { format } from 'date-fns';
import { Eye, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export default function RecentInvoices({ invoices }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
          <p className="text-sm text-gray-600">Latest 5 invoices created</p>
        </div>
        <Link 
          href="/dashboard/invoices"
          className="flex items-center text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          View all
          <ArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-3">
        {invoices.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No invoices found</p>
        ) : (
          invoices.map((invoice) => (
            <div key={invoice.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Eye className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{invoice.customerName}</p>
                  <p className="text-sm text-gray-600">{invoice.customerEmail}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-semibold text-gray-900">${invoice.amount.toLocaleString()}</p>
                <div className="flex items-center space-x-2">
                  <span className={clsx(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    getStatusColor(invoice.status)
                  )}>
                    {invoice.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {format(new Date(invoice.date), 'MMM dd')}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
