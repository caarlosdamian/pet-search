import type { CustomSession, Pet } from '@/lib/types';
import PaginationControls from './pagination-controls';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getFavoritePets } from '@/lib/actions/pets';
import { OptimisticPetsList } from './optimisticPetsList';

export default async function PetList({
  pets,
  totalPages,
}: {
  pets: Pet[];
  totalPages: number;
}) {
  const session = (await getServerSession(
    authOptions
  )) as unknown as CustomSession;
  const favoritePets = session
    ? await getFavoritePets({ userId: session.user.id })
    : [];

  return (
    <div>
      {pets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <OptimisticPetsList pets={pets} favoriteIds={favoritePets} />
          </div>
          <div className="mt-12">
            <PaginationControls totalPages={totalPages} />{' '}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No pets found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your filters to find more pets.
          </p>
        </div>
      )}
    </div>
  );
}
