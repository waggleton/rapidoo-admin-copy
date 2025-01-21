
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ECommerce from "@/components/Dashboard/E-commerce";
import SignIn from "./auth/signin/page";
import DefaultLayout from '@/components/Layouts/DefaultLayout';

export default function Home() {
  const cookieStore = cookies();
  const token = cookieStore.get('token');

  
  if (!token) {
    redirect('/auth/signin');
  }

  
  return <DefaultLayout><ECommerce /></DefaultLayout>;
}
