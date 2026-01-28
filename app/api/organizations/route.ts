import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"
import { CustomSession } from "@/lib/types"

export async function GET() {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions) as CustomSession

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

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions) as CustomSession

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const organizationData = await request.json()

    // Validate required fields
    if (!organizationData.name || !organizationData.slug || !organizationData.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if slug is unique
    const existingOrg = await db.collection("organizations").findOne({
      slug: organizationData.slug,
    })

    if (existingOrg) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 })
    }

    // Check if email is unique
    const existingEmail = await db.collection("organizations").findOne({
      email: organizationData.email,
    })

    if (existingEmail) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 })
    }

    // Add timestamps
    const now = new Date().toISOString()
    organizationData.createdAt = now
    organizationData.updatedAt = now

    // Insert organization into database
    const result = await db.collection("organizations").insertOne(organizationData)

    // Return the created organization with its ID
    return NextResponse.json({
      ...organizationData,
      _id: result.insertedId,
      id: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Error creating organization:", error)
    return NextResponse.json({ error: "Failed to create organization" }, { status: 500 })
  }
}
