'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { Pet } from '@/lib/types';
import { OptimisticPetsList } from '../pets/optimisticPetsList';
import { useTranslation } from 'react-i18next';

export default function FeaturedPets({ pets, favoriteIds }: { pets: Pet[], favoriteIds: string[] }) {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {t('featuredPets.title')}
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          {t('featuredPets.description')}
        </p>
      </div>

      {pets.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <OptimisticPetsList pets={pets} favoriteIds={favoriteIds} />
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            {t('featuredPets.noPetsAvailable')}
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/pets">{t('featuredPets.viewAllButton')}</Link>
        </Button>
      </div>
    </section>
  );
}
