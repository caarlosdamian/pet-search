import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { authOptions } from "@/lib/auth"
import { CustomSession } from "@/lib/types"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions) as CustomSession

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Validate ObjectId format
    if (!ObjectId.isValid(params.id)) {
      return NextResponse.json({ error: "Invalid application ID" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase()

    // Get application with pet and user details
    const applications = await db
      .collection("applications")
      .aggregate([
        { $match: { _id: new ObjectId(params.id) } },
        {
          $lookup: {
            from: "pets",
            localField: "petId",
            foreignField: "_id",
            as: "pet",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
      ])
      .toArray()

    const application = applications[0]

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Check if user has permission to view this application
    const isOwner = application.userId.toString() === session.user.id
    const isAdmin = session.user?.role === "admin"

    if (!isOwner && !isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error fetching application:", error)
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 })
  }
}
