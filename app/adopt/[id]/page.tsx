import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import AdoptionForm from "@/components/adoption/adoption-form"
import { getPet } from "@/services/pets"
import { CustomSession } from "@/lib/types"

export const metadata = {
  title: "Adoption Application - PawFinder",
  description: "Apply to adopt a pet from PawFinder.",
}

export default async function AdoptionPage({ params }: { params: Promise<{ id: string }> }) {
  // Check if user is authenticated
  const session = await getServerSession(authOptions) as CustomSession
  const { id } = await params

  if (!session) {
    // Redirect to login if not authenticated
    redirect(`/login?redirect=/adopt/${id}`)
  }

  // Fetch pet data
  const pet = await getPet(id)

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

        <AdoptionForm pet={pet} userId={session.user.id} />
      </div>
    </div>
  )
}

// async function getPet(id: string) {
//   try {
//     // Validate ObjectId format
//     if (!ObjectId.isValid(id)) {
//       return null
//     }

//     const { db } = await connectToDatabase()

//     // Get pet by ID
//     const pet = await db.collection("pets").findOne({
//       _id: new ObjectId(id),
//     })

//     if (!pet) {
//       return null
//     }

//     // Convert MongoDB _id to string id for easier handling in components
//     return {
//       ...pet,
//       id: pet._id.toString(),
//     }
//   } catch (error) {
//     console.error("Error fetching pet:", error)
//     return null
//   }
// }
