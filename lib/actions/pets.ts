'use server';

import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../mongodb';
import { Pet, UserModel } from '../types';
import { revalidatePath } from 'next/cache';

export async function getFavoritePets(params: {
  userId: string;
}): Promise<string[]> {
  const { userId } = await params;
  try {
    const { db } = await connectToDatabase();

    // const user = await db.collection('users').aggregate([
    //   { $match: { _id: new ObjectId(userId) } },
    //   {
    //     $lookup: {
    //       from: 'pets',
    //       localField: 'favorites',
    //       foreignField: '_id',
    //       as: 'favorites',
    //     },
    //   },
    // ]).toArray();

    // console.log('USER', user[0].favorites);

    const user = (await db.collection('users').findOne({
      _id: new ObjectId(userId),
    })) as UserModel;

    const petsIds = user.favorites.map((favorite) => favorite.toString());

    return petsIds;
  } catch (error) {
    console.error('Error fetching pets:', error);
    return [];
  }
}

export async function addFavorites(params: {
  pet: Pet;
  userId: string;
  pathname: string;
}): Promise<string | undefined> {
  const { pet, userId, pathname } = await params;
  try {
    const { db } = await connectToDatabase();

    const user = (await db.collection<UserModel>('users').findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      {
        $push: { favorites: new ObjectId(pet._id) },
      },
      { returnDocument: 'after' }
    )) as unknown as Document;
    revalidatePath(pathname);
    return JSON.stringify(user);
  } catch (error) {
    console.error('Error fetching pets:', error);
  }
}

export async function removedFavorites(params: {
  pet: Pet;
  userId: string;
  pathname: string;
}): Promise<string | undefined> {
  const { pet, userId, pathname } = await params;
  try {
    const { db } = await connectToDatabase();

    const user = (await db.collection<UserModel>('users').findOneAndUpdate(
      {
        _id: new ObjectId(userId),
      },
      {
        $pull: { favorites: new ObjectId(pet._id) },
      },
      { returnDocument: 'after' }
    )) as unknown as Document;
    revalidatePath(pathname);
    return JSON.stringify(user);
  } catch (error) {
    console.error('Error fetching pets:', error);
  }
}

export async function getPets(params: {
  [key: string]: string | string[] | undefined;
}): Promise<Pet[]> {
  const searchParams = await params;
  try {
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


export async function getFeaturedPets() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/featured`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch featured pets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching featured pets:', error);
    return [];
  }
}