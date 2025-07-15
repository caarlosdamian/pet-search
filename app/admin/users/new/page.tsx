import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserForm from '@/components/admin/user-form';

export const metadata: Metadata = {
  title: 'Create New User - PawFinder Admin',
  description: 'Create a new User to the PawFinder platform.',
};

export default async function CreateUserPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/users">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Create Usuario</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <UserForm />
      </div>
    </div>
  );
}
