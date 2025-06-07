import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect, notFound } from 'next/navigation';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import OrganizationForm from '@/components/admin/organization-form';
import { CustomSession, Organization } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Edit Organization - PawFinder Admin',
  description: 'Edit organization details.',
};

export default async function EditOrganizationPage({
  params,
}: {
  params: { id: string };
}) {
  const session = (await getServerSession(authOptions)) as CustomSession;

  // Only super admins can access this page
  if (!session || session.user.role !== 'admin') {
    redirect('/admin');
  }

  const organization = await getOrganization(params.id);

  if (!organization) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/organizations">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit Organization</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <OrganizationForm
          organization={JSON.stringify(organization) as unknown as Organization}
        />
      </div>
    </div>
  );
}

async function getOrganization(id: string) {
  try {
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const { db } = await connectToDatabase();

    const organization = await db.collection('organizations').findOne({
      _id: new ObjectId(id),
    });

    if (!organization) {
      return null;
    }

    return {
      ...organization,
      id: organization._id.toString(),
    };
  } catch (error) {
    console.error('Error fetching organization:', error);
    return null;
  }
}
