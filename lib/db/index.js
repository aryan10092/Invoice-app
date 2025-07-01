import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const connectionString = process.env.DATABASE_URL;

console.log('Database URL:', connectionString ? 'Present' : 'Missing');

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const sql = neon(connectionString);
export const db = drizzle(sql);

console.log('Database initialized successfully');