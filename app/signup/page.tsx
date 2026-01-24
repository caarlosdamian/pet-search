import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import SignupForm from '@/components/auth/singup-form';
import { authOptions } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'Sign Up - PawFinder',
  description:
    'Create your PawFinder account to start adopting pets and saving favorites.',
};

export default async function SignupPage({
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
      <SignupForm />
    </div>
  );
}
