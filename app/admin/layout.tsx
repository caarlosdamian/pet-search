import type React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CustomSession, CustomUser } from '@/lib/types';
import AdminSidebar from '@/components/admin/admin-sidebar';

export const metadata = {
  title: 'Admin Dashboard - PawFinder',
  description:
    'Manage pets, applications, and users on the PawFinder platform.',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and is an admin
  const session = (await getServerSession(authOptions)) as CustomSession;

  if (!session || session.user.role !== 'admin') {
    redirect('/login?callbackUrl=/admin');
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <div className="flex gap-4 p-6 w-full">
        <AdminSidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
