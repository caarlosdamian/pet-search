import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { authOptions } from "@/lib/auth"

// GET handler - fetch a single organization by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid organization ID" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Get organization by ID
    const organization = await db.collection("organizations").findOne({
      _id: new ObjectId(id),
    })

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    return NextResponse.json({
      ...organization,
      id: organization._id.toString(),
    })
  } catch (error) {
    console.error("Error fetching organization:", error)
    return NextResponse.json({ error: "Failed to fetch organization" }, { status: 500 })
  }
}

// PUT handler - update an organization
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid organization ID" }, { status: 400 })
    }

    // Parse request body
    const organizationData = await request.json()

    // Validate required fields
    if (!organizationData.name || !organizationData.slug || !organizationData.email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if slug is unique (excluding current organization)
    const existingOrg = await db.collection("organizations").findOne({
      slug: organizationData.slug,
      _id: { $ne: new ObjectId(id) },
    })

    if (existingOrg) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 })
    }

    // Update timestamp
    organizationData.updatedAt = new Date().toISOString()

    // Update organization in database
    const result = await db.collection("organizations").updateOne({ _id: new ObjectId(id) }, { $set: organizationData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    // Return the updated organization
    return NextResponse.json({
      ...organizationData,
      _id: id,
      id: id,
    })
  } catch (error) {
    console.error("Error updating organization:", error)
    return NextResponse.json({ error: "Failed to update organization" }, { status: 500 })
  }
}

// DELETE handler - delete an organization
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid organization ID" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Start a transaction to ensure data consistency
    const mongoSession = db.client.startSession()

    try {
      await mongoSession.withTransaction(async () => {
        const orgId = new ObjectId(id)

        // Delete all pets belonging to this organization
        await db.collection("pets").deleteMany({ organizationId: orgId })

        // Delete all applications for pets from this organization
        await db.collection("applications").deleteMany({ organizationId: orgId })

        // Delete all organization admin users
        await db.collection("users").deleteMany({
          role: "org_admin",
          organizationId: orgId,
        })

        // Finally, delete the organization
        const result = await db.collection("organizations").deleteOne({
          _id: orgId,
        })

        if (result.deletedCount === 0) {
          throw new Error("Organization not found")
        }
      })

      return NextResponse.json({ success: true })
    } finally {
      await mongoSession.endSession()
    }
  } catch (error) {
    console.error("Error deleting organization:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete organization" },
      { status: 500 },
    )
  }
}
