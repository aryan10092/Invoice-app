import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function HomePage() {
  const cookieStore = cookies()
  
const token = cookieStore.get('next-auth.session-token')?.value ||
    cookieStore.get('__Secure-next-auth.session-token')?.value
  
  if (!token) {
    redirect('/login');
  } else {
    redirect('/dashboard');
  }
}
