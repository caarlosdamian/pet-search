import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PawPrint, Users, ClipboardList, ArrowRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import RecentAdoptionsTable from '@/components/admin/recent-adoptions-table';
import { ObjectId } from 'mongodb';
import { Adoption, CustomSession } from '@/lib/types';

export default async function AdminDashboard() {
  const session = (await getServerSession(authOptions)) as CustomSession;
  const stats = await getDashboardStats(session.user.organizationId);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Welcome back,</span>
          <span className="font-medium">{session?.user?.name}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">Total Pets</CardTitle>
            <PawPrint className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPets}</div>
            <p className="text-xs text-gray-500">
              {stats.availablePets} available for adoption
            </p>
          </CardContent>
        </Card>
        {session.user.role === 'admin' && (
          <Card className="flex-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-gray-500">
                {stats.newUsers} new this month
              </p>
            </CardContent>
          </Card>
        )}
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <ClipboardList className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-gray-500">
              {stats.pendingApplications} pending review
            </p>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Adoptions</CardTitle>
            <PawPrint className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdoptions}</div>
            <p className="text-xs text-gray-500">
              {stats.monthlyAdoptions} this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="pets">Pet Management</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Adoptions</CardTitle>
              <CardDescription>
                Overview of recently approved adoption applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentAdoptionsTable
                adoptions={stats.recentAdoptions as Adoption[]}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pets" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Pet Management</CardTitle>
                <CardDescription>
                  Add, edit, or remove pets from the platform.
                </CardDescription>
              </div>
              <Button asChild className="bg-rose-600 hover:bg-rose-500">
                <Link href="/admin/pets/new">Add New Pet</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Manage Pets</h3>
                      <p className="text-sm text-gray-500">
                        View, edit, and manage all pets in the system
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/admin/pets">
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Featured Pets</h3>
                      <p className="text-sm text-gray-500">
                        Manage which pets are featured on the homepage
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/admin/pets/featured">
                        Manage
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Adoption Applications</CardTitle>
              <CardDescription>
                Review and manage adoption applications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Pending Applications</h3>
                      <p className="text-sm text-gray-500">
                        {stats.pendingApplications} applications awaiting review
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/admin/applications?status=pending">
                        Review
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">All Applications</h3>
                      <p className="text-sm text-gray-500">
                        View and manage all adoption applications
                      </p>
                    </div>
                    <Button asChild variant="outline">
                      <Link href="/admin/applications">
                        View All
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

async function getDashboardStats(organizationId?: string) {
  try {
    const { db } = await connectToDatabase();

    const query: Record<string, unknown> = {};

    if (organizationId) {
      query.organizationId = new ObjectId(organizationId);
    }

    const totalPets = await db.collection('pets').countDocuments(query);
    const petsFromOrg = await db.collection('pets').find(query).toArray();

    const petIds = petsFromOrg.map((eleme) => eleme._id);
    const availablePets = await db
      .collection('pets')
      .countDocuments({ adopted: { $ne: true } });
    const totalUsers = await db.collection('users').countDocuments();

    const totalApplications = await db
      .collection('applications')
      .countDocuments({
        petId: { $in: petIds },
      });

    const pendingApplications = await db
      .collection('applications')
      .countDocuments({ status: 'pending', petId: { $in: petIds } });

    const totalAdoptions = await db
      .collection('applications')
      .countDocuments({ status: 'approved', petId: { $in: petIds } });

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);
    firstDayOfMonth.setHours(0, 0, 0, 0);

    const newUsers = await db.collection('users').countDocuments({
      createdAt: { $gte: firstDayOfMonth.toISOString() },
    });

    // Get adoptions this month
    const monthlyAdoptions = await db
      .collection('applications')
      .countDocuments({
        status: 'approved',
        updatedAt: { $gte: firstDayOfMonth.toISOString() },
        petId: { $in: petIds },
      });

    const recentAdoptions = await db
      .collection('applications')
      .aggregate([
        { $match: { status: 'approved', petId: { $in: petIds } } },
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
            updatedAt: 1,
            'pet.name': 1,
            'pet.type': 1,
            'pet.breed': 1,
            'pet.imageUrl': 1,
            'user.name': 1,
            'user.email': 1,
          },
        },
      ])
      .toArray();

    return {
      totalPets,
      availablePets,
      totalUsers,
      newUsers,
      totalApplications,
      pendingApplications,
      totalAdoptions,
      monthlyAdoptions,
      recentAdoptions,
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalPets: 0,
      availablePets: 0,
      totalUsers: 0,
      newUsers: 0,
      totalApplications: 0,
      pendingApplications: 0,
      totalAdoptions: 0,
      monthlyAdoptions: 0,
      recentAdoptions: [],
    };
  }
}
