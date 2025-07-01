import { db } from '@/lib/db';
import { users, customers, invoices, revenue } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RevenueChart from '@/components/dashboard/RevenueChart';
import RecentInvoices from '@/components/dashboard/RecentInvoices';

async function getDashboardData() {
  try {
    
    const totalCustomers = await db.select({ count: sql`count(*)` }).from(customers)
    const totalInvoices = await db.select({ count: sql`count(*)` }).from(invoices)

    const paidInvoices = await db.select({ count: sql`count(*)` }).from(invoices).where(eq(invoices.status, 'paid'))
    const unpaidInvoices = await db.select({ count: sql`count(*)` }).from(invoices).where(eq(invoices.status, 'pending'))
    
    
    const revenueData = await db.select().from(revenue).orderBy(revenue.month);
    
    
    const recentInvoices = await db
      .select({
     id: invoices.id,
        amount: invoices.amount,
        status: invoices.status,

        date: invoices.date,
        customerName: customers.name,
        customerEmail: customers.email, })

      .from(invoices)
      .innerJoin(customers, eq(invoices.customerId, customers.id))
      .orderBy(sql`${invoices.date} DESC`)
      .limit(5);

    return {
      stats: {
        totalCustomers: parseInt(totalCustomers[0]?.count || 0),
        totalInvoices: parseInt(totalInvoices[0]?.count || 0),
        paidInvoices: parseInt(paidInvoices[0]?.count || 0),
        unpaidInvoices: parseInt(unpaidInvoices[0]?.count || 0),
      },
      revenueData: revenueData.map(item => ({
        month: item.month,
        year: item.year,
        revenue: parseFloat(item.revenue),
        name: new Date(item.year, item.month - 1).toLocaleString('default', { month: 'short' })
      })),
      recentInvoices: recentInvoices.map(invoice => ({
        ...invoice,
        amount: parseFloat(invoice.amount)
      }))
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    return {
      stats: {
        totalCustomers: 0,
        totalInvoices: 0,
        paidInvoices: 0,
        unpaidInvoices: 0,
      },
      revenueData: [],
      recentInvoices: []
    }
  }}

export default async function DashboardPage() {
  const { stats, revenueData, recentInvoices } = await getDashboardData();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your invoice management dashboard</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData} />
        <RecentInvoices invoices={recentInvoices} />
      </div>
    </div>
  );
}
