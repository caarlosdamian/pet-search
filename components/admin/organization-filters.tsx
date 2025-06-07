'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function OrganizationFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
  });

  useEffect(() => {
    setFilters({
      search: searchParams.get('search') || '',
    });
  }, [searchParams]);

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const applyFilters = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams();

    if (filters.search) params.set('search', filters.search);

    params.set('page', '1');

    router.push(`/admin/organizations?${params.toString()}`);
  };

  const resetFilters = () => {
    setFilters({
      search: '',
    });

    router.push('/admin/organizations');
  };

  return (
    <form className="flex flex-col gap-4 sm:flex-row" onSubmit={applyFilters}>
      <div className="flex-1">
        <Input
          placeholder="Search organizations..."
          value={filters.search}
          onChange={(e) => handleChange('search', e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button type="button" variant="outline" onClick={resetFilters}>
          Reset
        </Button>
        <Button type="submit" className="bg-rose-600 hover:bg-rose-500">
          Apply Filters
        </Button>
      </div>
    </form>
  );
}
