import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, MapPin, Calendar, Info } from "lucide-react"
import AdoptionCTA from "@/components/pets/adoption-cta"
import PetGallery from "@/components/pets/pet-gallery"
import SimilarPets from "@/components/pets/similar-pets"
import type { Pet } from "@/lib/types"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const pet = await getPet(params.id)

  if (!pet) {
    return {
      title: "Pet Not Found - PawFinder",
      description: "The pet you are looking for could not be found.",
    }
  }

  return {
    title: `${pet.name} - PawFinder`,
    description: `Meet ${pet.name}, a ${pet.age}-year-old ${pet.breed} looking for a loving home.`,
    openGraph: {
      title: `Meet ${pet.name} - PawFinder`,
      description: `${pet.name} is a ${pet.age}-year-old ${pet.breed} looking for a loving home.`,
      images: [
        {
          url: pet.imageUrl || "/images/default-pet.jpg",
          width: 1200,
          height: 630,
          alt: pet.name,
        },
      ],
    },
  }
}

export default async function PetPage({ params }: { params: { id: string } }) {
  const pet = await getPet(params.id)

  if (!pet) {
    notFound()
  }

  const similarPets = await getSimilarPets(pet)

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <Link href="/pets" className="text-gray-500 hover:text-gray-700">
                Pets
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-900">{pet.name}</span>
            </li>
          </ol>
        </nav>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Pet gallery */}
          <PetGallery pet={pet} />

          {/* Pet details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{pet.name}</h1>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" aria-label="Add to favorites">
                  <Heart className="h-5 w-5 text-rose-500" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-sm">
                {pet.type}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {pet.breed}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {pet.gender}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {pet.size}
              </Badge>
            </div>

            <div className="mt-6 flex items-center">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-gray-700">{pet.location}</span>
            </div>

            <div className="mt-2 flex items-center">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="ml-2 text-gray-700">
                {pet.age} {pet.age === 1 ? "year" : "years"} old
              </span>
            </div>

            <div className="mt-6">
              <h2 className="sr-only">Pet description</h2>
              <p className="text-base text-gray-700">{pet.description}</p>
            </div>

            <Tabs defaultValue="details" className="mt-8">
              <TabsList className="w-full">
                <TabsTrigger value="details" className="flex-1">
                  Details
                </TabsTrigger>
                <TabsTrigger value="health" className="flex-1">
                  Health
                </TabsTrigger>
                <TabsTrigger value="requirements" className="flex-1">
                  Requirements
                </TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="mt-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        Spayed/Neutered: {pet.spayedNeutered ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        House Trained: {pet.houseTrained ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        Good with Kids: {pet.goodWithKids ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        Good with Pets: {pet.goodWithPets ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{pet.temperament}</p>
                </div>
              </TabsContent>
              <TabsContent value="health" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">{pet.healthDetails}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">Vaccinated: {pet.vaccinated ? "Yes" : "No"}</span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        Microchipped: {pet.microchipped ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Info className="h-5 w-5 text-gray-500" />
                      <span className="ml-2 text-sm text-gray-700">
                        Special Needs: {pet.specialNeeds ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="requirements" className="mt-4">
                <div className="space-y-4">
                  <p className="text-sm text-gray-700">{pet.adoptionRequirements}</p>
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    <li>Application review</li>
                    <li>Home visit</li>
                    <li>Adoption fee: ${pet.adoptionFee}</li>
                    <li>Reference check</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>

            <AdoptionCTA pet={pet} />
          </div>
        </div>

        {/* Similar pets section */}
        <SimilarPets pets={similarPets} />
      </div>
    </div>
  )
}

async function getPet(id: string): Promise<Pet | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/pets/${id}`, {
      next: { revalidate: 60 }, // Revalidate every minute
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

async function getSimilarPets(pet: Pet): Promise<Pet[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ""}/api/pets/similar?type=${pet.type}&breed=${pet.breed}&id=${pet.id}`,
      { next: { revalidate: 60 } },
    )

    if (!response.ok) {
      throw new Error("Failed to fetch similar pets")
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching similar pets:", error)
    return []
  }
}
