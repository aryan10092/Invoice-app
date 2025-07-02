'use client'
import { useState } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardLayout({ children }) {

   const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen((open) => !open)
  const closeSidebar = () => setSidebarOpen(false)
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar open={sidebarOpen} close={closeSidebar} />
      <div className="lg:pl-64">
        <Headertoggle={toggleSidebar} />
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
