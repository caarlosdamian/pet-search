'use server';

import { Pet } from '../types';

export async function getPets(params: {
  [key: string]: string | string[] | undefined;
}): Promise<Pet[]> {
  const searchParams = await params;
  try {
    // Build query string from search params
    const queryParams = new URLSearchParams();

    if (searchParams.type) {
      queryParams.append('type', String(searchParams.type));
    }

    if (searchParams.location) {
      queryParams.append('location', String(searchParams.location));
    }

    if (searchParams.age) {
      queryParams.append('age', String(searchParams.age));
    }

    if (searchParams.gender) {
      queryParams.append('gender', String(searchParams.gender));
    }

    if (searchParams.size) {
      queryParams.append('size', String(searchParams.size));
    }

    const page = searchParams.page || 1;
    queryParams.append('page', String(page));
    queryParams.append('limit', '10');
  
    const queryString = queryParams.toString();
    const url = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets${
      queryString ? `?${queryString}` : ''
    }`;

    console.log('URL', url);

    const response = await fetch(url, { next: { revalidate: 60 } });

    if (!response.ok) {
      throw new Error('Failed to fetch pets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
}
