import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function VerifyLogin({ children }: { children: React.ReactNode }) {
  const token = cookies().get('token');

  // Redirect to SignIn if not authenticated
  if (!token) {
    redirect('/auth/signin');
  }

  return <>{children}</>;
}
