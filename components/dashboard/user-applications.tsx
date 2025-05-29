import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export default async function UserApplications({ userId }: { userId: string }) {
  const applications = await getUserApplications(userId)

  if (applications.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Adoption Applications</CardTitle>
          <CardDescription>You haven&apos;t submitted any adoption applications yet.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Start browsing pets to find your perfect companion!</p>
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
        <CardTitle>Adoption Applications</CardTitle>
        <CardDescription>Track the status of your adoption applications.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((application) => (
            <div key={application._id.toString()} className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-medium">{application.pet?.name || "Unknown Pet"}</h4>
                  <p className="text-sm text-gray-500">
                    Applied {formatDistanceToNow(new Date(application.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge
                  variant={
                    application.status === "approved"
                      ? "default"
                      : application.status === "rejected"
                        ? "destructive"
                        : "secondary"
                  }
                >
                  {application.status}
                </Badge>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/applications/${application._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

async function getUserApplications(userId: string) {
  try {
    const { db } = await connectToDatabase()

    const applications = await db
      .collection("applications")
      .aggregate([
        { $match: { userId: new ObjectId(userId) } },
        { $sort: { createdAt: -1 } },
        {
          $lookup: {
            from: "pets",
            localField: "petId",
            foreignField: "_id",
            as: "pet",
          },
        },
        {
          $project: {
            _id: 1,
            status: 1,
            createdAt: 1,
            "pet.name": 1,
            "pet.type": 1,
            "pet.breed": 1,
          },
        },
      ])
      .toArray()

    return applications
  } catch (error) {
    console.error("Error fetching user applications:", error)
    return []
  }
}
