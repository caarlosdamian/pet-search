import { PLACES } from '@/constants/places';
import React from 'react';
import { SelectItem } from './select';

export const PlaceSelect = () => {
  return (
    <>
      {PLACES.map((place) => (
        <SelectItem key={place.value} value={place.value}>
          {place.label}
        </SelectItem>
      ))}
    </>
  );
};
