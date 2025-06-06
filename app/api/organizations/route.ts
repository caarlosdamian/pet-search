import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Get all organizations
    const organizations = await db
      .collection("organizations")
      .find({})
      .project({ _id: 1, name: 1, slug: 1 })
      .sort({ name: 1 })
      .toArray()

    // Convert _id to id for easier handling
    const formattedOrganizations = organizations.map((org) => ({
      id: org._id.toString(),
      name: org.name,
      slug: org.slug,
    }))

    return NextResponse.json(formattedOrganizations)
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 })
  }
}
