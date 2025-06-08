import { Suspense } from 'react';
import PetFilters from '@/components/pets/pet-filters';
import PetList from '@/components/pets/pet-list';
import PetListSkeleton from '@/components/pets/pet-list-skeleton';
import type { PetsAPI } from '@/lib/types';
import { getPets } from '@/lib/actions/pets';

export const metadata = {
  title: 'Find Pets - PawFinder',
  description: 'Browse our available pets and find your perfect companion.',
};

export default async function PetsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsawait = await searchParams;
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Find Your Perfect Pet
        </h1>
        <p className="mt-4 max-w-xl text-gray-500">
          Browse our available pets and filter by type, age, and location to
          find your perfect match.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          {/* Filters */}
          <div className="lg:col-span-1">
            <PetFilters />
          </div>

          {/* Pet listings */}
          <div className="lg:col-span-3">
            <Suspense fallback={<PetListSkeleton />}>
              <PetListWithData searchParams={searchParamsawait} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

async function PetListWithData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pets = (await getPets(searchParams)) as unknown as PetsAPI;

  return <PetList pets={pets?.pets} totalPages={pets.pagination.totalPages} />;
}
