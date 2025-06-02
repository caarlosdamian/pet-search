'use server';
import { connectToDatabase } from '@/lib/mongodb';
import { Pet } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function getPet(id: string): Promise<Pet | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/${id}`,
      {
        next: { revalidate: 60 },
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

export async function deletePet(
  id: string,
  pathname: string
): Promise<Pet | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/${id}`,
      {
        next: { revalidate: 60 },
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch pet');
    }
    revalidatePath(pathname);
    return await response.json();
  } catch (error) {
    console.error('Error fetching pet:', error);
    return null;
  }
}

export async function getPets(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    const { db } = await connectToDatabase();

    // Build query from search params
    const query: Record<string, unknown> = {};

    if (searchParams.type) {
      query.type = searchParams.type;
    }

    if (searchParams.location) {
      query.location = searchParams.location;
    }

    if (searchParams.status === 'adopted') {
      query.adopted = true;
    } else if (searchParams.status === 'available') {
      query.adopted = { $ne: true };
    }

    // Pagination
    const page = Number(searchParams?.page || 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    // Get pets with pagination
    const pets = await db
      .collection('pets')
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Get total count for pagination
    const totalPets = await db.collection('pets').countDocuments(query);
    const totalPages = Math.ceil(totalPets / limit);

    return {
      pets,
      totalPages,
    };
  } catch (error) {
    console.error('Error fetching pets:', error);
    return {
      pets: [],
      totalPages: 0,
    };
  }
}
