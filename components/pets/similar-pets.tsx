import Link from 'next/link';
import type { CustomSession, Pet } from '@/lib/types';
import { getServerSession } from 'next-auth';
import { getFavoritePets } from '@/lib/actions/pets';
import { authOptions } from '@/lib/auth';
import { OptimisticPetsList } from './optimisticPetsList';

export default async function SimilarPets({ pets }: { pets: Pet[] }) {
  if (pets.length === 0) {
    return null;
  }
  const session = (await getServerSession(
    authOptions
  )) as unknown as CustomSession;
  const favoritePets = session
    ? await getFavoritePets({ userId: session.user.id })
    : [];

  return (
    <section className="mt-16 border-t border-gray-200 pt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        Similar Pets You May Like
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <OptimisticPetsList pets={pets} favoriteIds={favoritePets} />
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/pets"
          className="text-sm font-semibold leading-6 text-rose-600 hover:text-rose-500"
        >
          View all available pets <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
