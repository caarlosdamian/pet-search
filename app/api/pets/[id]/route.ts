import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Await the params since it's a Promise
    const { id } = await params

    // Connect to database
    const { db } = await connectToDatabase()

    // Get pet by ID
    const pet = await db.collection("pets").findOne({
      _id: new ObjectId(id),
    })

    if (!pet) {
      return NextResponse.json({ error: "Pet not found" }, { status: 404 })
    }

    return NextResponse.json(pet)
  } catch (error) {
    console.error("Error fetching pet:", error)
    return NextResponse.json({ error: "Failed to fetch pet" }, { status: 500 })
  }
}