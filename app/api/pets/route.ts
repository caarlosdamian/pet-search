import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';
import { CustomSession } from '@/lib/types';

// GET handler - fetch pets with filtering and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // console.log('SERCHPARAMS ',searchParams)
    // Extract filter parameters
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const age = searchParams.get('age');
    const gender = searchParams.get('gender');
    const size = searchParams.get('size');
    const search = searchParams.get('search');
    const organizationId = searchParams.get('organizationId');

    // Extract pagination parameters
    const page = Number.parseInt(searchParams.get('page') || '1');
    const limit = Number.parseInt(searchParams.get('limit') || '12');
    const skip = (page - 1) * limit;
    // console.log('TESTEANDO',page,'LIMIT',limit)
    // Build query
    const query: Record<string, unknown> = {};

    // Filter by organization if specified
    if (organizationId) {
      query.organizationId = new ObjectId(organizationId);
    }

    if (type) {
      if (type.includes(',')) {
        // Multiple types - create case-insensitive regex for each
        query.type = {
          $in: type.split(',').map(t => new RegExp(`^${t.trim()}$`, 'i'))
        };
      } else {
        // Single type - case-insensitive regex
        query.type = { $regex: `^${type}$`, $options: 'i' };
      }
    }

    if (location) {
      if (location.includes(',')) {
        query.location = {
          $in: location.split(',').map(l => new RegExp(`^${l.trim()}$`, 'i'))
        };
      } else {
        query.location = { $regex: `^${location}$`, $options: 'i' };
      }
    }

    if (age) {
      if (age.includes(',')) {
        query.age = {
          $in: age.split(',').map(a => new RegExp(`^${a.trim()}$`, 'i'))
        };
      } else {
        query.age = { $regex: `^${age}$`, $options: 'i' };
      }
    }

    if (gender) {
      if (gender.includes(',')) {
        query.gender = {
          $in: gender.split(',').map(g => new RegExp(`^${g.trim()}$`, 'i'))
        };
      } else {
        query.gender = { $regex: `^${gender}$`, $options: 'i' };
      }
    }

    if (size) {
      if (size.includes(',')) {
        query.size = {
          $in: size.split(',').map(s => new RegExp(`^${s.trim()}$`, 'i'))
        };
      } else {
        query.size = { $regex: `^${size}$`, $options: 'i' };
      }
    }

    // Add text search if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { breed: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const { db } = await connectToDatabase();

    const pets = await db
      .collection('pets')
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: 'organizations',
            localField: 'organizationId',
            foreignField: '_id',
            as: 'organization',
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray();

    const totalPets = await db.collection('pets').countDocuments(query);
    const totalPages = Math.ceil(totalPets / limit);


    console.log('TOTAL PETS', totalPets)
    return NextResponse.json({
      pets,
      pagination: {
        total: totalPets,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching pets:', error);
    return NextResponse.json(
      {
        pets: [],
        pagination: {
          total: 0,
          page: 0,
          limit: 0,
          totalPages: 0,
        },
      },
      { status: 500 }
    );
  }
}

// POST handler - create a new pet
export async function POST(request: Request) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = (await getServerSession(authOptions)) as CustomSession;

    if (!session || !['admin', 'org_admin'].includes(session.user.role)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const petData = await request.json();

    // Validate required fields
    if (!petData.name || !petData.type || !petData.breed) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Set organization ID based on user role
    if (session.user.role === 'org_admin') {
      if (!session.user.organizationId) {
        return NextResponse.json(
          { error: 'Organization admin must have an organization' },
          { status: 400 }
        );
      }
      petData.organizationId = new ObjectId(session.user.organizationId);
    } else if (session.user.role === 'admin') {
      if (!petData.organizationId) {
        return NextResponse.json(
          { error: 'Organization ID is required' },
          { status: 400 }
        );
      }
      petData.organizationId = new ObjectId(petData.organizationId);
    }

    // Add timestamps
    const now = new Date().toISOString();
    petData.createdAt = now;
    petData.updatedAt = now;

    // Connect to database
    const { db } = await connectToDatabase();

    // Insert pet into database
    const result = await db.collection('pets').insertOne(petData);

    // Return the created pet with its ID
    return NextResponse.json({
      ...petData,
      _id: result.insertedId,
      id: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error creating pet:', error);
    return NextResponse.json(
      { error: 'Failed to create pet' },
      { status: 500 }
    );
  }
}
