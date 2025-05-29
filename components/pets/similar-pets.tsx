import Link from "next/link"
import PetCard from "./pet-card"
import type { Pet } from "@/lib/types"

export default function SimilarPets({ pets }: { pets: Pet[] }) {
  if (pets.length === 0) {
    return null
  }

  return (
    <section className="mt-16 border-t border-gray-200 pt-16">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Similar Pets You May Like</h2>
      <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {pets.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/pets" className="text-sm font-semibold leading-6 text-rose-600 hover:text-rose-500">
          View all available pets <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
