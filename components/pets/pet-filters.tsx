'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { usePetFilters } from '@/hooks/usePetFilters';
import PetFiltersSkeleton from './pet-filters-skeleton';

export default function PetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filters: petFilters, isLoading } = usePetFilters();

  // Initialize state from URL params
  const [filters, setFilters] = useState({
    type: searchParams.get('type')?.split(',') || [],
    age: searchParams.get('age')?.split(',') || [],
    size: searchParams.get('size')?.split(',') || [],
    gender: searchParams.get('gender')?.split(',') || [],
    location: searchParams.get('location')?.split(',') || [],
  });

  // Apply filters
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove each filter parameter
    Object.entries(filters).forEach(([key, value]) => {
      if (value.length > 0) {
        params.set(key, value.join(','));
      } else {
        params.delete(key);
      }
    });

    // Reset to page 1 when filters change
    params.set('page', '1');

    router.push(`/pets?${params.toString()}`);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      type: [],
      age: [],
      size: [],
      gender: [],
      location: [],
    });

    router.push('/pets');
  };

  // Update a specific filter
  const updateFilter = (category: keyof typeof filters, value: string) => {
    setFilters((prev) => {
      const currentValues = [...prev[category]];
      const index = currentValues.indexOf(value);

      if (index === -1) {
        currentValues.push(value);
      } else {
        currentValues.splice(index, 1);
      }

      return {
        ...prev,
        [category]: currentValues,
      };
    });
  };

  return (
    <div className="sticky top-20">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={resetFilters}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Reset
        </Button>
      </div>

      <div className="mt-4 border-t border-gray-200 pt-4">
        <Accordion
          type="multiple"
          defaultValue={['type', 'age', 'size', 'gender', 'location']}
        >
          {/* Pet Type Filter */}
          <AccordionItem value="type">
            <AccordionTrigger className="text-sm font-medium text-gray-900">
              Pet Type
            </AccordionTrigger>
            <AccordionContent>
              {isLoading ? (
                <PetFiltersSkeleton />
              ) : (
                <div className="space-y-2">
                  {petFilters?.types?.map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.type.includes(type)}
                        onCheckedChange={() => updateFilter('type', type)}
                      />
                      <label
                        htmlFor={`type-${type}`}
                        className="ml-2 text-sm text-gray-600 capitalize"
                      >
                        {type.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Age Filter */}
          <AccordionItem value="age">
            <AccordionTrigger className="text-sm font-medium text-gray-900">
              Age
            </AccordionTrigger>
            <AccordionContent>
              {isLoading ? (
                <PetFiltersSkeleton />
              ) : (
                <div className="space-y-2">
                  {['baby', 'young', 'adult', 'senior'].map((age) => (
                    <div key={age} className="flex items-center">
                      <Checkbox
                        id={`age-${age}`}
                        checked={filters.age.includes(age)}
                        onCheckedChange={() => updateFilter('age', age)}
                      />
                      <label
                        htmlFor={`age-${age}`}
                        className="ml-2 text-sm text-gray-600 capitalize"
                      >
                        {age}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Size Filter */}
          <AccordionItem value="size">
            <AccordionTrigger className="text-sm font-medium text-gray-900">
              Size
            </AccordionTrigger>
            <AccordionContent>
              {isLoading ? (
                <PetFiltersSkeleton />
              ) : (
                <div className="space-y-2">
                  {['small', 'medium', 'large', 'extra-large'].map((size) => (
                    <div key={size} className="flex items-center">
                      <Checkbox
                        id={`size-${size}`}
                        checked={filters.size.includes(size)}
                        onCheckedChange={() => updateFilter('size', size)}
                      />
                      <label
                        htmlFor={`size-${size}`}
                        className="ml-2 text-sm text-gray-600 capitalize"
                      >
                        {size.replace('-', ' ')}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Gender Filter */}
          <AccordionItem value="gender">
            <AccordionTrigger className="text-sm font-medium text-gray-900">
              Gender
            </AccordionTrigger>
            <AccordionContent>
              {isLoading ? (
                <PetFiltersSkeleton />
              ) : (
                <div className="space-y-2">
                  {petFilters?.genders?.map((gender) => (
                    <div key={gender} className="flex items-center">
                      <Checkbox
                        id={`gender-${gender}`}
                        checked={filters.gender.includes(gender)}
                        onCheckedChange={() => updateFilter('gender', gender)}
                      />
                      <label
                        htmlFor={`gender-${gender}`}
                        className="ml-2 text-sm text-gray-600 capitalize"
                      >
                        {gender}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Location Filter */}
          <AccordionItem value="location">
            <AccordionTrigger className="text-sm font-medium text-gray-900">
              Location
            </AccordionTrigger>
            <AccordionContent>
              {isLoading ? (
                <PetFiltersSkeleton />
              ) : (
                <div className="space-y-2">
                  {petFilters?.locations?.map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox
                        id={`location-${location}`}
                        checked={filters.location.includes(location)}
                        onCheckedChange={() => updateFilter('location', location)}
                      />
                      <label
                        htmlFor={`location-${location}`}
                        className="ml-2 text-sm text-gray-600 capitalize"
                      >
                        {location
                          .split('-')
                          .map(
                            (word) => word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Button
        onClick={applyFilters}
        className="mt-6 w-full bg-rose-600 hover:bg-rose-500"
      >
        Apply Filters
      </Button>
    </div>
  );
}
