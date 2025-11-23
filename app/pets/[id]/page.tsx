import { notFound } from 'next/navigation';
import type { Pet } from '@/lib/types';
import PetDetailContent from '@/components/pets/pet-detail-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = await getPet(id);

  if (!pet) {
    return {
      title: 'Pet Not Found - PawFinder',
      description: 'The pet you are looking for could not be found.',
    };
  }

  return {
    title: `${pet.name} - PawFinder`,
    description: `Meet ${pet.name}, a ${pet.age}-year-old ${pet.breed} looking for a loving home.`,
    openGraph: {
      title: `Meet ${pet.name} - PawFinder`,
      description: `${pet.name} is a ${pet.age}-year-old ${pet.breed} looking for a loving home.`,
      images: [
        {
          url: pet.imageUrl || '/images/default-pet.jpg',
          width: 1200,
          height: 630,
          alt: pet.name,
        },
      ],
    },
  };
}

export default async function PetPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pet = await getPet(id);

  if (!pet) {
    notFound();
  }

  const similarPets = await getSimilarPets(pet);
  return <PetDetailContent pet={pet} similarPets={similarPets} />;
}

async function getPet(id: string): Promise<Pet | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/${id}`,
      {
        next: { revalidate: 60 }, // Revalidate every minute
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch pet');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pet:', error);
    return null;
  }
}

async function getSimilarPets(pet: Pet): Promise<Pet[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/similar?type=${pet.type
      }&breed=${pet.breed}&id=${pet.id || pet._id}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch similar pets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching similar pets:', error);
    return [];
  }
}
