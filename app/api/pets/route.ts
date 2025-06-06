import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { authOptions } from '@/lib/auth';
import { ObjectId } from 'mongodb';

// GET handler - fetch pets with filtering and pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

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

    // Build query
    const query: Record<string, unknown> = {};

    // Filter by organization if specified
    if (organizationId) {
      query.organizationId = new ObjectId(organizationId);
    }

    if (type) {
      query.type = type.includes(',') ? { $in: type.split(',') } : type;
    }

    if (location) {
      query.location = location.includes(',')
        ? { $in: location.split(',') }
        : location;
    }

    if (age) {
      query.age = age.includes(',') ? { $in: age.split(',') } : age;
    }

    if (gender) {
      query.gender = gender.includes(',') ? { $in: gender.split(',') } : gender;
    }

    if (size) {
      query.size = size.includes(',') ? { $in: size.split(',') } : size;
    }

    // Add text search if provided
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { breed: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // filter adopted pending
    // Get pets with pagination and organization info
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
    // Get total count for pagination
    const totalPets = await db.collection('pets').countDocuments(query);
    const totalPages = Math.ceil(totalPets / limit);

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
      { error: 'Failed to fetch pets' },
      { status: 500 }
    );
  }
}

// POST handler - create a new pet
export async function POST(request: Request) {
  try {
    // Check if user is authenticated and has admin privileges
    const session = await getServerSession(authOptions);

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
