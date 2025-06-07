'use server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function getOrganization(organizationId: string) {
  try {
    const { db } = await connectToDatabase();
    const organization = await db.collection('organizations').findOne({
      _id: new ObjectId(organizationId),
    });

    if (!organization) return null;

    return {
      ...organization,
      id: organization._id.toString(),
    };
  } catch (error) {
    console.error('Error fetching organization:', error);
    return null;
  }
}
export async function getOrganizations() {
  try {
    const { db } = await connectToDatabase();
    const organization = await db.collection('organizations').find().toArray();

    return organization;
  } catch (error) {
    console.error('Error fetching organization:', error);
    return null;
  }
}
