import Link from 'next/link';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import PaginationControls from '@/components/pets/pagination-controls';
import PetFilters from '@/components/admin/pet-filters';
import { getUsers } from '@/services/users';
export const metadata = {
  title: 'Manage Users - PawFinder Admin',
  description: 'Add, edit, and manage users on the PawFinder platform.',
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  const params = await searchParams;
  const { users, totalPages } = await getUsers({
    ...params,
  });

  return (
    <div className="space-y-6 bg-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
        <Button asChild className="bg-rose-600 hover:bg-rose-500">
          <Link href="/admin/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Agregar usuario
          </Link>
        </Button>
      </div>

      <div className="rounded-md border bg-white p-3">
        <div className="border-b p-4">
          <PetFilters />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user._id as unknown as string}>
                    <TableCell>
                      <p className="font-medium">{user.name}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{user.email}</p>
                    </TableCell>
                    <TableCell>
                      <p className="font-medium">{user.role}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/users/${user._id}/edit`}
                          className="text-sm font-medium text-blue-500 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        {/* <Link
                          href={`/pets/${user._id}`}
                          className="text-sm font-medium text-rose-600 hover:text-rose-500"
                          target="_blank"
                        >
                          View
                        </Link> */}
                        {/* <PetDelete
                                              id={(pet._id.toString() as unknown as string) || ''}
                                            /> */}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="p-4">
          <PaginationControls totalPages={totalPages} pageUrl="/admin/pets" />
        </div>
      </div>
    </div>
  );
}
