import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { Eye, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { connectToDatabase } from '@/lib/mongodb';
import PaginationControls from '@/components/pets/pagination-controls';
import ApplicationFilters from '@/components/admin/application-filters';
import ApplicationsTableSkeleton from '@/components/admin/applications-table-skeleton';

export const metadata = {
  title: 'Manage Applications - PawFinder Admin',
  description: 'Review and manage pet adoption applications.',
};

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Adoption Applications
          </h1>
          <p className="text-gray-600">
            Review and manage pet adoption applications.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <CardDescription>
            Filter applications by status, date, or pet type.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ApplicationFilters />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            All adoption applications submitted through the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ApplicationsTableSkeleton />}>
            <ApplicationsTableWithData searchParams={searchParams} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

async function ApplicationsTableWithData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { applications, totalPages, stats } = await getApplications(
    searchParams
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-sm text-gray-500">Total Applications</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {stats.pending}
          </div>
          <p className="text-sm text-gray-500">Pending Review</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-green-600">
            {stats.approved}
          </div>
          <p className="text-sm text-gray-500">Approved</p>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-2xl font-bold text-red-600">
            {stats.rejected}
          </div>
          <p className="text-sm text-gray-500">Rejected</p>
        </div>
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pet</TableHead>
              <TableHead>Applicant</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.length > 0 ? (
              applications.map((application) => {
                const pet = application.pet[0];
                const user = application.user[0];

                return (
                  <TableRow key={application._id.toString()}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={
                              pet?.imageUrl ||
                              '/placeholder.svg?height=40&width=40'
                            }
                            alt={pet?.name || 'Pet'}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {pet?.name || 'Unknown Pet'}
                          </p>
                          <p className="text-xs text-gray-500">
                            {pet?.breed || 'Unknown'} • {pet?.type || ''}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {user?.name ||
                            application.personalInfo?.name ||
                            'Unknown'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {user?.email || application.personalInfo?.email || ''}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          application.status === 'approved'
                            ? 'bg-green-50 text-green-700 hover:bg-green-50'
                            : application.status === 'rejected'
                            ? 'bg-red-50 text-red-700 hover:bg-red-50'
                            : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-50'
                        }
                      >
                        {application.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {application.createdAt
                          ? formatDistanceToNow(
                              new Date(application.createdAt),
                              { addSuffix: true }
                            )
                          : 'Unknown'}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {application.updatedAt
                          ? formatDistanceToNow(
                              new Date(application.updatedAt),
                              { addSuffix: true }
                            )
                          : 'Unknown'}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/applications/${application._id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Review
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No applications found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationControls totalPages={totalPages} />
        </div>
      )}
    </div>
  );
}

async function getApplications(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  try {
    const { db } = await connectToDatabase();

    // Build query from search params
    const query: Record<string, unknown> = {};

    if (searchParams.status && searchParams.status !== 'all') {
      query.status = searchParams.status;
    }

    if (searchParams.petType && searchParams.petType !== 'all') {
      // We'll need to join with pets collection to filter by pet type
      // This will be handled in the aggregation pipeline
    }

    if (searchParams.dateRange) {
      const now = new Date();
      let startDate: Date;

      switch (searchParams.dateRange) {
        case 'today':
          startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          break;
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'month':
          startDate = new Date(now.getFullYear(), now.getMonth(), 1);
          break;
        default:
          startDate = new Date(0); // All time
      }

      if (searchParams.dateRange !== 'all') {
        query.createdAt = { $gte: startDate.toISOString() };
      }
    }

    // Pagination
    const page = Number(searchParams.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;

    // Build aggregation pipeline
    const pipeline: unknown[] = [
      { $match: query },
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
    ];

    // Add pet type filter if specified
    if (searchParams.petType && searchParams.petType !== 'all') {
      pipeline.push({
        $match: {
          'pet.type': searchParams.petType,
        },
      });
    }

    // Add search filter if specified
    if (searchParams.search) {
      pipeline.push({
        $match: {
          $or: [
            { 'pet.name': { $regex: searchParams.search, $options: 'i' } },
            { 'user.name': { $regex: searchParams.search, $options: 'i' } },
            { 'user.email': { $regex: searchParams.search, $options: 'i' } },
            {
              'personalInfo.name': {
                $regex: searchParams.search,
                $options: 'i',
              },
            },
            {
              'personalInfo.email': {
                $regex: searchParams.search,
                $options: 'i',
              },
            },
          ],
        },
      });
    }

    // Sort by creation date (newest first)
    pipeline.push({ $sort: { createdAt: -1 } });

    // Get total count for pagination
    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await db
      .collection('applications')
      .aggregate(countPipeline as Document[])
      .toArray();
    const totalApplications = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalApplications / limit);

    // Add pagination
    pipeline.push({ $skip: skip }, { $limit: limit });

    // Execute query
    const applications = await db
      .collection('applications')
      .aggregate(pipeline as Document[])
      .toArray();

    // Get stats
    const stats = await db
      .collection('applications')
      .aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 },
          },
        },
      ])
      .toArray();

    const statsMap = stats.reduce(
      (acc, stat) => {
        acc[stat._id] = stat.count;
        acc.total += stat.count;
        return acc;
      },
      { total: 0, pending: 0, approved: 0, rejected: 0 }
    );

    return {
      applications,
      totalPages,
      stats: statsMap,
    };
  } catch (error) {
    console.error('Error fetching applications:', error);
    return {
      applications: [],
      totalPages: 0,
      stats: { total: 0, pending: 0, approved: 0, rejected: 0 },
    };
  }
}
