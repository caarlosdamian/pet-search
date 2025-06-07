'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlaceSelect } from '../ui/placeSelect';

export default function SearchBar() {
  const router = useRouter();
  const [petType, setPetType] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Build query string
    const params = new URLSearchParams();
    if (petType) params.append('type', petType);
    if (location) params.append('location', location);

    // Navigate to pets page with filters
    router.push(`/pets?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <div className="flex-1">
            <Select value={petType} onValueChange={setPetType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pet Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">Dogs</SelectItem>
                <SelectItem value="cat">Cats</SelectItem>
                <SelectItem value="bird">Birds</SelectItem>
                <SelectItem value="small-animal">Small Animals</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <PlaceSelect />
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="bg-rose-600 hover:bg-rose-500">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
}
