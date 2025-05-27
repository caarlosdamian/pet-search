import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    // Check if user is authenticated
    // const session = await getServerSession(authOptions)

    // if (true) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    // Parse request body
    const data = await request.json()

    // Validate required fields
    if (!data.petId) {
      return NextResponse.json({ error: "Pet ID is required" }, { status: 400 })
    }

    // Connect to database
    const { db } = await connectToDatabase();



    // Create application
    const application = {
      petId: data.petId,
      // userId: session.user.id,
      status: "pending",
      personalInfo: data.personalInfo,
      livingInfo: data.livingInfo,
      petExperience: data.petExperience,
      additionalInfo: data.additionalInfo,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Insert application into database
    const result = await db.collection("applications").insertOne(application)

    // Update user's applications array
    await db
      .collection("users")
      .updateOne({ _id: session.user.id }, { $push: { applications: result.insertedId.toString() } })

    return NextResponse.json({
      success: true,
      applicationId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 })
  }
}
