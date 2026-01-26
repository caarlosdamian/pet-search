import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import LoginForm from '@/components/auth/login-form';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Login - PawFinder',
  description:
    'Login to your PawFinder account to manage adoptions and favorites.',
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Check if user is already logged in
  const session = await getServerSession(authOptions);
  const params = await searchParams;
  if (session) {
    // Redirect to dashboard or callback URL
    const callbackUrl = params.callbackUrl || params.redirect;
    redirect(callbackUrl ? String(callbackUrl) : '/dashboard');
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
}
