'use client';

import { useState } from 'react';
import { generateDummyPets } from '@/lib/seed';
import { createPet } from '@/lib/actions/pets';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const pets = generateDummyPets(10);
      let successCount = 0;

      for (const pet of pets) {
        const result = await createPet(pet);
        if (result.success) {
          successCount++;
        }
      }

      toast.success(`Successfully seeded ${successCount} pets!`);
    } catch (error) {
      console.error('Seeding failed:', error);
      toast.error('Failed to seed pets.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center py-8 bg-red-500">
      <Button onClick={() => handleSeed()} disabled={loading} variant="outline">
        {loading ? 'Seeding...' : 'Seed Database (Dev Only)'}
      </Button>
    </div>
  );
}
