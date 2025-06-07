import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
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
import { Badge } from '@/components/ui/badge';
import PaginationControls from '@/components/pets/pagination-controls';
import PetFilters from '@/components/admin/pet-filters';
import { getPets } from '@/services/pets';
import { PetDelete } from '@/components/admin/pet-delete';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CustomSession } from '@/lib/types';
export const metadata = {
  title: 'Manage Pets - PawFinder Admin',
  description: 'Add, edit, and manage pets on the PawFinder platform.',
};

export default async function AdminPetsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const session = (await getServerSession(authOptions)) as CustomSession;
  const { pets, totalPages } = await getPets({
    ...params,
    organization: session.user.organizationId,
  });

  return (
    <div className="space-y-6 bg-gray-100">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Manage Pets</h1>
        <Button asChild className="bg-rose-600 hover:bg-rose-500">
          <Link href="/admin/pets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Pet
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
                <TableHead>Pet</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pets.length > 0 ? (
                pets.map((pet) => (
                  <TableRow key={pet._id as unknown as string}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md">
                          <Image
                            src={
                              pet.imageUrl ||
                              '/placeholder.svg?height=40&width=40'
                            }
                            alt={pet.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{pet.name}</p>
                          <p className="text-xs text-gray-500">{pet.breed}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="capitalize">{pet.type}</TableCell>
                    <TableCell>
                      {pet.age} {pet.age === 1 ? 'year' : 'years'}
                    </TableCell>
                    <TableCell className="capitalize">
                      {pet.location.replace(/-/g, ' ')}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          pet.adopted
                            ? 'bg-green-50 text-green-700 hover:bg-green-50'
                            : 'bg-blue-50 text-blue-700 hover:bg-blue-50'
                        }
                      >
                        {pet.adopted ? 'Adopted' : 'Available'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDistanceToNow(new Date(pet.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/pets/${pet._id}/edit`}
                          className="text-sm font-medium text-blue-500 hover:text-blue-900"
                        >
                          Edit
                        </Link>
                        <Link
                          href={`/pets/${pet._id}`}
                          className="text-sm font-medium text-rose-600 hover:text-rose-500"
                          target="_blank"
                        >
                          View
                        </Link>
                        <PetDelete
                          id={(pet._id.toString() as unknown as string) || ''}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No pets found.
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
