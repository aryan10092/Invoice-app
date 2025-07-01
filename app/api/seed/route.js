import { db } from '@/lib/db'
import { users, customers, invoices, revenue } from '@/lib/db/schema'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'

export async function GET() {
  try {
    //console.log('Starting database seeding');
    
   await db.execute(sql`TRUNCATE TABLE invoices, customers, users, revenue RESTART IDENTITY CASCADE`)
    console.log('Testing database connection')
    
    
   // console.log('Clearing existing data');
    await db.delete(invoices)
    await db.delete(customers)
    await db.delete(users)

    await db.delete(revenue)

    
   // console.log('Seeding users')
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    await db.insert(users).values([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: hashedPassword,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: hashedPassword,
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
      }
    ]);

    
    console.log('Seeding customers')

    await db.insert(customers).values([
      {
        name: 'Acme Corp',
        email: 'contact@acme.com',
      },
      {
        name: 'Tech Solutions',
        email: 'hello@techsolutions.com',   },
      {
        name: 'Green Energy Ltd',
        email: 'info@greenenergy.com',
      },
      {
        name: 'Digital Marketing Co',

        email: 'team@digitalmarketing.com',
        },
      {
        name: 'Creative Studio',
        email: 'studio@creative.com',
      } ]);

    
    console.log('Seeding invoices');
    await db.insert(invoices).values([
      {
        customerId: 1,
        amount: '1500.00',
        status: 'paid',
        date: new Date('2024-01-15'),
      },
      {
        customerId: 2,
        amount: '2300.50',
        status: 'pending',
        date: new Date('2024-01-20'),
      },
      {
        customerId: 3,
        amount: '850.75',
        status: 'paid',
        date: new Date('2024-02-01'),
      },
      {
        customerId: 4,
        amount: '3200.00',
        status: 'pending',
        date: new Date('2024-02-10'),
      },
      {
        customerId: 5,
        amount: '1750.25',
        status: 'paid',
        date: new Date('2024-02-15'),
      },
      {
        customerId: 1,
        amount: '950.00',
        status: 'pending',
        date: new Date('2024-03-01'),
      },
      {
        customerId: 2,
        amount: '1200.00',
        status: 'paid',
        date: new Date('2024-03-05'),
      }
    ]);

    
    console.log('Seeding revenue');
    await db.insert(revenue).values([
      { month: 1, year: 2024, revenue: '15000.00' },
      { month: 2, year: 2024, revenue: '18500.00' },
      { month: 3, year: 2024, revenue: '22000.00' },
      { month: 4, year: 2024, revenue: '19800.00' },
      { month: 5, year: 2024, revenue: '21500.00' },
      { month: 6, year: 2024, revenue: '24000.00' },
    ]);

    console.log('Database seeded successfully!');
    return NextResponse.json({ message: 'Database seeded successfully!' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ 
      error: 'Failed to seed database', 
      details: error.message,
      stack: error.stack 
    }, { status: 500 });
  }
}
