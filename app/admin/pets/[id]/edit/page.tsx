import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PetForm from '@/components/admin/pet-form';
import { getPet } from '@/services/pets';
import { Pet } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Edit New Pet - PawFinder Admin',
  description: 'Edit a new pet to the PawFinder platform.',
};

export default async function EditPetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = await getPet(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/pets">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Edit New Pet</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <PetForm pet={pet as unknown as Pet} />
      </div>
    </div>
  );
}
