'use client';

import { Pet } from '@/lib/types';
import { useMemo, useOptimistic } from 'react';
import PetCard from './pet-card';

interface Props {
  pets: Pet[];
  favoriteIds: string[];
}

const updateFavorites = (
  state: string[],
  { action, id }: { action: 'add' | 'remove'; id: string }
) => {
  if (action === 'remove') {
    return state.filter((el) => el !== id);
  }
  if (!state.includes(id)) {
    return [...state, id];
  }
  return state;
};

export const OptimisticPetsList = ({ pets, favoriteIds }: Props) => {
  const [favoritePets, addFavoritePet] = useOptimistic(
    favoriteIds,
    updateFavorites
  );

  const favoriteSet = useMemo(() => new Set(favoritePets), [favoritePets]);

  return (
    <>
      {pets.map((pet) => (
        <PetCard
          key={pet._id}
          pet={pet}
          addFavoritePet={addFavoritePet}
          isFavorite={favoriteSet.has(pet._id)}
        />
      ))}
    </>
  );
};
