import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const type = searchParams.get("type")
    const breed = searchParams.get("breed")
    const id = searchParams.get("id")

    if (!type || !id) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Build query for similar pets
    const query: Record<string, unknown> = {
      type,
      _id: { $ne: new ObjectId(id) },
    }

    if (breed) {
      query.breed = breed
    }

    // Get similar pets
    const similarPets = await db.collection("pets").find(query).limit(3).toArray()

    return NextResponse.json(similarPets)
  } catch (error) {
    console.error("Error fetching similar pets:", error)
    return NextResponse.json({ error: "Failed to fetch similar pets" }, { status: 500 })
  }
}
