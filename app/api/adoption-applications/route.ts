import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse request body
    const data = await request.json();

    // Validate required fields
    if (!data.petId) {
      return NextResponse.json(
        { error: 'Pet ID is required' },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Check if pet exists and get its organization
    const pet = await db
      .collection('pets')
      .findOne({ _id: new ObjectId(data.petId) });

    if (!pet) {
      return NextResponse.json({ error: 'Pet not found' }, { status: 404 });
    }

    // Check if user has already applied for this pet
    const existingApplication = await db.collection('applications').findOne({
      petId: new ObjectId(data.petId),
      userId: new ObjectId(session.user.id),
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'You have already applied to adopt this pet' },
        { status: 409 }
      );
    }

    // Create application with organization ID from the pet
    const now = new Date().toISOString();
    const application = {
      petId: new ObjectId(data.petId),
      userId: new ObjectId(session.user.id),
      organizationId: pet.organizationId, // Get organization from pet
      status: 'pending',
      personalInfo: data.personalInfo,
      livingInfo: data.livingInfo,
      petExperience: data.petExperience,
      additionalInfo: data.additionalInfo,
      createdAt: now,
      updatedAt: now,
    };

    // Insert application into database
    const result = await db.collection('applications').insertOne(application);

    // Update user's applications array
    await db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(session.user.id) },
        { $push: { applications: result.insertedId.toString() } }
      );

    return NextResponse.json({
      success: true,
      applicationId: result.insertedId.toString(),
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId') || session.user.id;

    // Only admins can view other users' applications, and org_admins can only see their org's applications
    if (userId !== session.user.id) {
      if (session.user.role === 'user') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Build query based on user role
    const matchQuery: any = { userId: new ObjectId(userId) };

    if (session.user.role === 'org_admin' && session.user.organizationId) {
      // Org admins can only see applications for their organization's pets
      matchQuery.organizationId = new ObjectId(session.user.organizationId);
    }

    // Get applications
    const applications = await db
      .collection('applications')
      .aggregate([
        { $match: matchQuery },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: 'pets',
            localField: 'petId',
            foreignField: '_id',
            as: 'pet',
          },
        },
        {
          $lookup: {
            from: 'organizations',
            localField: 'organizationId',
            foreignField: '_id',
            as: 'organization',
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
            personalInfo: 1,
            'pet.name': 1,
            'pet.type': 1,
            'pet.breed': 1,
            'pet.imageUrl': 1,
            'organization.name': 1,
          },
        },
      ])
      .toArray();

    return NextResponse.json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    );
  }
}
