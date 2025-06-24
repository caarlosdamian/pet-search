import Link from 'next/link';
import { Button } from '@/components/ui/button';
import type { CustomSession, Pet } from '@/lib/types';
import { getFavoritePets } from '@/lib/actions/pets';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { OptimisticPetsList } from '../pets/optimisticPetsList';

export default async function FeaturedPets({ pets }: { pets: Pet[] }) {
  const session = (await getServerSession(
    authOptions
  )) as unknown as CustomSession;
  const favoritePets = session
    ? await getFavoritePets({ userId: session.user.id })
    : [];
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Conoce a Nuestras Mascotas
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Estos adorables compañeros están buscando un hogar para siempre.
        </p>
      </div>

      {pets.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <OptimisticPetsList pets={pets} favoriteIds={favoritePets} />
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-gray-500">
            No hay mascotas destacadas disponibles en este momento.
          </p>
        </div>
      )}

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/pets">Ver Todas las Mascotas</Link>
        </Button>
      </div>
    </section>
  );
}
