import type { Pet } from '@/lib/types';
import PetCard from './pet-card';
import PaginationControls from './pagination-controls';

export default function PetList({ pets }: { pets: Pet[] }) {
  return (
    <div>
      {pets.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {pets.map((pet: Pet) => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
          <div className="mt-12">
            <PaginationControls totalPages={10} />{' '}
            {/* This would be dynamic in a real app */}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No pets found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your filters to find more pets.
          </p>
        </div>
      )}
    </div>
  );
}
