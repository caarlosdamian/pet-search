import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfile from '@/components/dashboard/user-profile';
import UserApplications from '@/components/dashboard/user-applications';
import UserFavorites from '@/components/dashboard/user-favorites';
import { CustomSession } from '@/lib/types';
import { authOptions } from '@/lib/auth';

export const metadata = {
  title: 'Dashboard - PawFinder',
  description: 'Manage your pet adoption applications and favorites.',
};

export default async function DashboardPage() {
  const session = (await getServerSession(authOptions)) as CustomSession;
  console.log('ses', session);

  if (!session) {
    redirect('/login?callbackUrl=/dashboard');
  }

  // If user is admin, redirect to admin dashboard
  if (session.user.role === 'admin') {
    redirect('/admin');
  }

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Dashboard
          </h1>
          <p className="mt-2 text-gray-600">Welcome back, !</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <UserProfile user={session.user} />
          </TabsContent>

          <TabsContent value="applications">
            <UserApplications userId={session.user.id} />
          </TabsContent>

          <TabsContent value="favorites">
            <UserFavorites userId={session.user.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
