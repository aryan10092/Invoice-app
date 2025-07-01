// import 'dotenv/config';
// import { defineConfig } from 'drizzle-kit';
// require('dotenv').config();

// export default defineConfig({
//   out: './drizzle',
//   schema: './lib/db/schema.js',
//   dialect: 'postgresql',
//   dbCredentials: {
//     url: process.env.DATABASE_URL,
//   },
// });

require('dotenv').config();

module.exports = {
  out: './drizzle',
  schema: './lib/db/schema.js',
  driver: 'pg', // this is the required field
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
