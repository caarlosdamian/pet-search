import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Forgot Password - PawFinder',
  description: 'Reset your PawFinder password.',
};

export default async function ForgotPasswordPage() {
  // Check if user is already logged in
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <ForgotPasswordForm />
    </div>
  );
}
