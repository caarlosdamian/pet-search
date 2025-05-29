import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    debugger;

    // Extract filter parameters
    const type = searchParams.get("type")
    const location = searchParams.get("location")
    const age = searchParams.get("age")
    const gender = searchParams.get("gender")
    const size = searchParams.get("size")

    // Extract pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")
    const skip = (page - 1) * limit

    // Build query
    const query: Record<string, unknown> = {}

    if (type) {
      query.type = type.includes(",") ? { $in: type.split(",") } : type
    }

    if (location) {
      query.location = location.includes(",") ? { $in: location.split(",") } : location
    }

    if (age) {
      query.age = age.includes(",") ? { $in: age.split(",") } : age
    }

    if (gender) {
      query.gender = gender.includes(",") ? { $in: gender.split(",") } : gender
    }

    if (size) {
      query.size = size.includes(",") ? { $in: size.split(",") } : size
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Get pets with pagination
    const pets = await db.collection("pets").find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray()
    // Get total count for pagination
    const totalPets = await db.collection("pets").countDocuments(query)
    const totalPages = Math.ceil(totalPets / limit)

    return NextResponse.json({
      pets,
      pagination: {
        total: totalPets,
        page,
        limit,
        totalPages,
      },
    })
  } catch (error) {
    console.error("Error fetching pets:", error)
    return NextResponse.json({ error: "Failed to fetch pets" }, { status: 500 })
  }
}
