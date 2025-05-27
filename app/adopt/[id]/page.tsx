import { notFound } from "next/navigation"
import AdoptionForm from "@/components/adoption/adoption-form"
import type { Pet } from "@/lib/types"

export const metadata = {
  title: "Adoption Application - PawFinder",
  description: "Apply to adopt a pet from PawFinder.",
}

export default async function AdoptionPage({ params }: { params: { id: string } }) {
  const pet = await getPet(params.id)

  if (!pet) {
    notFound()
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Adoption Application for {pet.name}</h1>
          <p className="mt-2 text-gray-600">
            Please complete this form to apply to adopt {pet.name}. Our team will review your application and contact
            you within 2-3 business days.
          </p>
        </div>

        <AdoptionForm pet={pet} />
      </div>
    </div>
  )
}

async function getPet(id: string): Promise<Pet | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/pets/${id}`, {
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error("Failed to fetch pet")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching pet:", error)
    return null
  }
}
