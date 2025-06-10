import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import ApplicationDetails from '@/components/applications/application-details';
import { CustomSession } from '@/lib/types';

export const metadata = {
  title: 'Application Details - PawFinder',
  description: 'View adoption application details.',
};

export default async function ApplicationPage({
  params: paramsData,
}: {
  params: Promise<{ id: string }>;
}) {
  // Check if user is authenticated
  const session = (await getServerSession(authOptions)) as CustomSession;
  const params = await paramsData;

  if (!session) {
    redirect(`/login?redirect=/applications/${params.id}`);
  }

  const application = await getApplication(
    params?.id,
    session.user?.id,
    session.user?.role
  );

  if (!application) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {application && (
          <ApplicationDetails
            applicationProp={JSON.stringify(application)}
            currentUser={session.user}
          />
        )}
      </div>
    </div>
  );
}

async function getApplication(id: string, userId: string, userRole: string) {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return null;
    }

    const { db } = await connectToDatabase();

    // Get application with pet and user details
    const applications = await db
      .collection('applications')
      .aggregate([
        { $match: { _id: new ObjectId(id) } },
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
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            personalInfo: 1,
            livingInfo: 1,
            petExperience: 1,
            additionalInfo: 1,
            createdAt: 1,
            updatedAt: 1,
            userId: 1,
            'pet._id': 1,
            'pet.name': 1,
            'pet.type': 1,
            'pet.breed': 1,
            'pet.age': 1,
            'pet.imageUrl': 1,
            'pet.location': 1,
            'user._id': 1,
            'user.name': 1,
            'user.email': 1,
          },
        },
      ])
      .toArray();

    console.log('TESTEANDIO', applications);

    const application = applications[0];

    if (!application) {
      return null;
    }

    const isOwner = application.userId.toString() === userId;
    const isAdmin = userRole === 'admin' || userRole === 'org_admin';

    if (!isOwner && !isAdmin) {
      return null;
    }

    // Convert MongoDB _id to string id for easier handling
    return {
      ...application,
      id: application._id.toString(),
      pet: application.pet[0]
        ? { ...application.pet[0], id: application.pet[0]._id.toString() }
        : null,
      user: application.user[0]
        ? { ...application.user[0], id: application.user[0]._id.toString() }
        : null,
    };
  } catch (error) {
    console.error('Error fetching application:', error);
    return null;
  }
}
