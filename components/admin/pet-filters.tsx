'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PLACES } from '@/constants/places';
import { PlaceSelect } from '../ui/placeSelect';

export default function PetFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    location: searchParams.get('location') || '',
    status: searchParams.get('status') || '',
  });

  // Update filters when URL changes
  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
      type: searchParams.get('type') || '',
      location: searchParams.get('location') || '',
      status: searchParams.get('status') || '',
    });
  }, [searchParams]);

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);
    if (filters.type) params.set('type', filters.type);
    if (filters.location) params.set('location', filters.location);
    if (filters.status) params.set('status', filters.status);

    // Reset to page 1 when filters change
    params.set('page', '1');

    router.push(`/admin/pets?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      type: '',
      location: '',
      status: '',
    });

    router.push('/admin/pets');
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-1">
        <Input
          placeholder="Search pets..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-2">
        <Select
          value={filters.type}
          onValueChange={(value) => handleChange('type', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Pet Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="dog">Dogs</SelectItem>
            <SelectItem value="cat">Cats</SelectItem>
            <SelectItem value="bird">Birds</SelectItem>
            <SelectItem value="small-animal">Small Animals</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.location}
          onValueChange={(value) => handleChange('location', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {/* {PLACES.map((place) => (
              <SelectItem key={place.value} value={place.value}>
                {place.label}
              </SelectItem>
            ))} */}
            <PlaceSelect />
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => handleChange('status', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="adopted">Adopted</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
        <Button
          onClick={applyFilters}
          className="bg-rose-600 hover:bg-rose-500"
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
