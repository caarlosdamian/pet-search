import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export default async function UserFavorites({ userId }: { userId: string }) {
  const favorites = await getUserFavorites(userId)

  if (favorites.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Favorite Pets</CardTitle>
          <CardDescription>You havent added any pets to your favorites yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Save pets youre interested in to view them later!</p>
            <Button asChild className="bg-rose-600 hover:bg-rose-500">
              <Link href="/pets">Browse Pets</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Favorite Pets</CardTitle>
        <CardDescription>Pets youve saved for later.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.map((pet) => (
            <div key={pet._id.toString()} className="group relative overflow-hidden rounded-lg border">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={pet.imageUrl || "/placeholder.svg?height=300&width=300"}
                  alt={pet.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">{pet.name}</h3>
                <p className="text-sm text-gray-500">
                  {pet.breed} • {pet.age} {pet.age === 1 ? "year" : "years"}
                </p>
                <div className="mt-3 flex gap-2">
                  <Button asChild size="sm" variant="outline" className="flex-1">
                    <Link href={`/pets/${pet._id}`}>View</Link>
                  </Button>
                  <Button asChild size="sm" className="flex-1 bg-rose-600 hover:bg-rose-500">
                    <Link href={`/adopt/${pet._id}`}>Apply</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function getUserFavorites(userId: string) {
  try {
    const { db } = await connectToDatabase()

    // Get user's favorite pet IDs
    const user = await db.collection("users").findOne({ _id: new ObjectId(userId) })

    if (!user || !user.favorites || user.favorites.length === 0) {
      return []
    }

    // Convert favorite IDs to ObjectIds
    const favoriteIds = user.favorites.map((id: string) => new ObjectId(id))

    // Get favorite pets
    const favorites = await db
      .collection("pets")
      .find({ _id: { $in: favoriteIds } })
      .toArray()

    return favorites
  } catch (error) {
    console.error("Error fetching user favorites:", error)
    return []
  }
}
