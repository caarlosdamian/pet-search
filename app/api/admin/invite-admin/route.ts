import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { hash } from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import { authOptions } from "@/lib/auth"
import { ObjectId } from "mongodb"
import { CustomSession } from "@/lib/types"

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is a super admin
    const session = await getServerSession(authOptions) as CustomSession

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email, password, organizationId } = await request.json()

    if (!name || !email || !password || !organizationId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 })
    }

    if (!ObjectId.isValid(organizationId)) {
      return NextResponse.json({ error: "Invalid organization ID" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const organization = await db.collection("organizations").findOne({
      _id: new ObjectId(organizationId),
    })

    if (!organization) {
      return NextResponse.json({ error: "Organization not found" }, { status: 404 })
    }

    const existingUser = await db.collection("users").findOne({ email })

    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 })
    }

    const hashedPassword = await hash(password, 12)

    // Create user
    const now = new Date().toISOString()
    const user = {
      name,
      email,
      password: hashedPassword,
      role: "org_admin",
      organizationId: new ObjectId(organizationId),
      favorites: [],
      applications: [],
      createdAt: now,
      updatedAt: now,
      lastLoginAt: null,
    }

    const result = await db.collection("users").insertOne(user)

    // TODO: Send welcome email with login credentials
    // This would typically integrate with an email service like SendGrid, Resend, etc.

    // Return success response (without password)
    return NextResponse.json({
      success: true,
      user: {
        id: result.insertedId.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        organizationId: organizationId,
      },
    })
  } catch (error) {
    console.error("Error inviting admin:", error)
    return NextResponse.json({ error: "Failed to invite admin" }, { status: 500 })
  }
}
