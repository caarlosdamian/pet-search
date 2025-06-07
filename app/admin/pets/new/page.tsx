import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PetForm from '@/components/admin/pet-form';
import { getServerSession } from 'next-auth';
import { CustomSession, Organization } from '@/lib/types';
import { authOptions } from '@/lib/auth';
import { getOrganization, getOrganizations } from '@/lib/actions';

export const metadata: Metadata = {
  title: 'Add New Pet - PawFinder Admin',
  description: 'Add a new pet to the PawFinder platform.',
};

export default async function AddPetPage() {
  const {
    user: { organizationId },
  } = (await getServerSession(authOptions)) as CustomSession;

  const organization = (await getOrganization(
    organizationId as unknown as string
  )) as unknown as Organization;

  const organizations = await getOrganizations();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/pets">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Pet</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <PetForm
          organizationName={JSON.stringify({
            id: organization?._id,
            name: organization.name,
          })}
          organizations={JSON.stringify(organizations)}
        />
      </div>
    </div>
  );
}
