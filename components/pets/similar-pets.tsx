'use client';

import Link from 'next/link';
import type { Pet, CustomSession } from '@/lib/types';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getFavoritePets } from '@/lib/actions/pets';
import { OptimisticPetsList } from './optimisticPetsList';
import { useTranslation } from 'react-i18next';

export default function SimilarPets({ pets }: { pets: Pet[] }) {
  const { t } = useTranslation();

  if (pets.length === 0) {
    return null;
  }

  const { data: session } = useSession();

  const [favoritePets, setFavoritePets] = useState<string[]>([]);
  useEffect(() => {
    const fetchFavoritePets = async () => {
      const customSession = session as CustomSession | null;
      if (customSession?.user?.id) {
        const favoritePets = await getFavoritePets({ userId: customSession.user.id });
        setFavoritePets(favoritePets);
      }
    };
    fetchFavoritePets();
  }, [session]);

  return (
    <section className="mt-16 border-t border-gray-200 pt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        {t('similarPets.title')}
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <OptimisticPetsList pets={pets} favoriteIds={favoritePets} />
      </div>
      <div className="mt-12 text-center">
        <Link
          href="/pets"
          className="text-sm font-semibold leading-6 text-rose-600 hover:text-rose-500"
        >
          {t('similarPets.viewAllButton')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
