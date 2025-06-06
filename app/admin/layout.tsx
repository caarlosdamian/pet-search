import type React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CustomSession } from '@/lib/types';
import AdminSidebar from '@/components/admin/admin-sidebar';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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

  if (!session || !adminRoles.some((role) => session.user.role.includes(role))) {
    redirect('/login?callbackUrl=/admin');
  }

  let organization = null;
  if (session.user.role === 'org_admin' && session.user.organizationId) {
    organization = await getOrganization(session.user.organizationId);
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <div className="flex gap-4 p-6 w-full">
        {/* <AdminSidebar /> */}
        <AdminSidebar user={session.user} organization={organization} />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

///

async function getOrganization(organizationId: string) {
  try {
    const { db } = await connectToDatabase();
    const organization = await db.collection('organizations').findOne({
      _id: new ObjectId(organizationId),
    });

    if (!organization) return null;

    return {
      ...organization,
      id: organization._id.toString(),
    };
  } catch (error) {
    console.error('Error fetching organization:', error);
    return null;
  }
}
