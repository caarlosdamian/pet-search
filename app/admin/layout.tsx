import type React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CustomSession } from '@/lib/types';
import AdminSidebar from '@/components/admin/admin-sidebar';

import { getOrganization } from '@/lib/actions';

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
  const session = (await getServerSession(authOptions)) as CustomSession;

  const adminRoles = ['org_admin', 'admin'];

  if (
    !session ||
    !adminRoles.some((role) => session.user.role.includes(role))
  ) {
    redirect('/login?callbackUrl=/admin');
  }

  let organization = null;
  if (session.user.role === 'org_admin' && session.user.organizationId) {
    organization = await getOrganization(session.user.organizationId);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <div className="flex gap-4 p-6 w-full">
        <AdminSidebar
          user={session.user}
          organization={
            JSON.stringify(organization) as unknown as {
              id: string;
              name: string;
              logo?: string;
            }
          }
        />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

///
