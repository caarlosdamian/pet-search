import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET() {
  try {
    // Connect to database
    const { db } = await connectToDatabase()

    // Get featured pets (random selection of 6 pets)
    const featuredPets = await db
      .collection("pets")
      .aggregate([{ $sample: { size: 6 } }])
      .toArray()

    return NextResponse.json(featuredPets)
  } catch (error) {
    console.error("Error fetching featured pets:", error)
    return NextResponse.json({ error: "Failed to fetch featured pets" }, { status: 500 })
  }
}
