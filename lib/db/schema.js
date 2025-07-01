import { pgTable, serial, varchar, text, integer, timestamp, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),

  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})


export const customers = pgTable('customers', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),}
);


export const invoices = pgTable('invoices', {
  id: serial('id').primaryKey(),
  customerId: integer('customer_id').references(() => customers.id),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  status: varchar('status', { length: 50 }).notNull().default('pending'),
  date: timestamp('date').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const revenue = pgTable('revenue', {
  id: serial('id').primaryKey(),
  month: integer('month').notNull(),
  year: integer('year').notNull(),
  revenue: decimal('revenue', { precision: 10, scale: 2 }).notNull(),
});
