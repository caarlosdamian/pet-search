import Link from "next/link"
import PetCard from "@/components/pets/pet-card"
import { Button } from "@/components/ui/button"
import type { Pet } from "@/lib/types"

export default function FeaturedPets({ pets }: { pets: Pet[] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Meet Our Pets</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          These adorable companions are looking for their forever homes.
        </p>
      </div>

      {pets.length > 0 ? (
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {pets.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      ) : (
        <div className="mt-10 text-center">
          <p className="text-gray-500">No featured pets available at the moment.</p>
        </div>
      )}

      <div className="mt-10 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/pets">View All Pets</Link>
        </Button>
      </div>
    </section>
  )
}
