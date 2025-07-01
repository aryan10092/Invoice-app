# Invoice Management App

A modern invoice management application built with Next.js, featuring user authentication, dashboard analytics, and comprehensive invoice tracking.

## Features

- **User Authentication**: Secure login system with hashed passwords
- **Dashboard**: Overview with key metrics and revenue charts
- **Invoice Management**: Create, view, and track invoices
- **User Management**: Add and manage system users
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Dynamic status updates and data refresh

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: NextAuth.js with credentials provider
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- Git for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nextjs-invoice-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/invoice_db
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   ```

4. **Set up the database**
   ```bash
   # Push database schema
   npm run db:push
   
   # Seed the database with sample data
   curl http://localhost:3000/api/seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Schema

### Users Table
- `id` (Primary Key)
- `name` (String)
- `email` (String, Unique)
- `password` (Hashed String)
- `createdAt` (Timestamp)

### Customers Table
- `id` (Primary Key)
- `name` (String)
- `email` (String)
- `createdAt` (Timestamp)

### Invoices Table
- `id` (Primary Key)
- `customerId` (Foreign Key)
- `amount` (Decimal)
- `status` (String: 'pending' | 'paid')
- `date` (Timestamp)
- `createdAt` (Timestamp)

### Revenue Table
- `id` (Primary Key)
- `month` (Integer)
- `year` (Integer)
- `revenue` (Decimal)

## Default Login Credentials

After seeding the database, you can use these credentials:

- **Email**: admin@example.com
- **Password**: password123

Other test users:
- john@example.com / password123
- jane@example.com / password123

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Users
- `POST /api/users` - Create new user

### Invoices
- `GET /api/invoices` - List all invoices
- `POST /api/invoices` - Create new invoice
- `PATCH /api/invoices/[id]` - Update invoice status

### Customers
- `GET /api/customers` - List all customers

### Database
- `GET /api/seed` - Seed database with sample data

## Project Structure

```
├── app/
│   ├── api/                 # API routes
│   ├── dashboard/           # Protected dashboard pages
│   ├── login/               # Authentication pages
│   ├── globals.css          # Global styles
│   ├── layout.js           # Root layout
│   └── page.js             # Home page
├── components/
│   ├── dashboard/          # Dashboard components
│   ├── invoices/           # Invoice components
│   └── SessionProvider.js  # Auth provider
├── lib/
│   └── db/                 # Database configuration
├── public/                 # Static assets
└── configuration files
```

## Key Features Implemented

### Dashboard
- Total customers, invoices, paid/unpaid counts
- Revenue chart showing monthly trends
- Recent invoices list with quick actions
- Responsive cards with icons and animations

### User Management
- List all users with search and filtering
- Create new users with form validation
- Password hashing and security
- Role-based access control ready

### Invoice Management
- Create invoices with customer selection
- View all invoices with status indicators
- Mark invoices as paid with one click
- Real-time status updates

### Authentication
- Secure login with NextAuth.js
- Session management
- Protected routes
- Logout functionality

## Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

3. **Database Migration**
   Make sure to run database migrations in production:
   ```bash
   npm run db:push
   ```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
