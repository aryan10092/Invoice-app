import { Users, FileText, CheckCircle, Clock } from 'lucide-react';

export default function DashboardStats({ stats }) {
  const statItems = [
    {
      name: 'Total Customers',
      value: stats.totalCustomers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Total Invoices',
      value: stats.totalInvoices,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      name: 'Paid Invoices',
      value: stats.paidInvoices,
      icon: CheckCircle,
      color: 'bg-emerald-500',
    },
    {
      name: 'Unpaid Invoices',
      value: stats.unpaidInvoices,
      icon: Clock,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{item.name}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  );
}
