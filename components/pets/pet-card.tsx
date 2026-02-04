'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { CustomSession, Pet } from '@/lib/types';
import { addFavorites, removedFavorites } from '@/lib/actions/pets';
import { useSession } from 'next-auth/react';
import { redirect, usePathname } from 'next/navigation';
import { startTransition } from 'react';
import { useTranslation } from 'react-i18next';

export default function PetCard({
  pet,
  isFavorite,
  addFavoritePet,
}: {
  pet: Pet;
  isFavorite: boolean;
  addFavoritePet: (action: { action: 'add' | 'remove'; id: string }) => void;
}) {
  const { t } = useTranslation();
  const { data } = useSession() as unknown as { data: CustomSession };
  const pathname = usePathname();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-60">
        <Image
          src={pet.imageUrl || '/placeholder.svg?height=400&width=300'}
          alt={pet.name}
          width={300}
          height={400}
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
        <button
          className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-gray-900 shadow-sm hover:bg-rose-50 z-50"
          aria-label={t('petCard.addToFavorites')}
          onClick={() => {
            if (!data) {
              redirect(`/login?redirect=/pets`);
            }
            startTransition(() => {
              addFavoritePet({
                action: isFavorite ? 'remove' : 'add',
                id: pet._id,
              });
            });
            if (isFavorite) {
              removedFavorites({ pet, userId: data.user.id, pathname });
              return;
            }
            addFavorites({ pet, userId: data.user.id, pathname });
          }}
        >
          <Heart
            fill={isFavorite ? '#f43f5e' : 'none'}
            className="h-5 w-5 text-rose-500"
          />
        </button>
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-lg font-medium text-gray-900">
          <Link href={`/pets/${pet._id}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {pet.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-xs font-medium text-gray-700"
          >
            {pet.breed}
          </Badge>
          <Badge
            variant="outline"
            className="text-xs font-medium text-gray-700"
          >
            {pet.age} {pet.age === 1 ? t('petDetail.yearOld') : t('petDetail.yearsOld')}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2">{pet.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">{pet.location}</p>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="text-rose-600 hover:text-rose-500 hover:bg-rose-50"
          >
            <Link href={`/pets/${pet._id}`}>{t('petCard.viewDetails')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
