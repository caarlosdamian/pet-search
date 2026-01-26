import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import InviteAdminForm from "@/components/admin/invite-admin-form"
import { CustomSession, Organization } from "@/lib/types"

export const metadata = {
  title: "Invite Organization Admin - PawFinder Admin",
  description: "Invite a new administrator to the organization.",
}

export default async function InviteAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions) as CustomSession
  const { id } = await params
  // Only super admins can access this page
  if (!session || session.user.role !== "admin") {
    redirect("/admin")
  }

  const organization = await getOrganization(id)

  if (!organization) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/admin/organizations/${organization.id}/members`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Invite Organization Admin</h1>
          <p className="text-gray-600">{organization.name}</p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <InviteAdminForm organizationId={organization.id} organizationName={organization.name} />
      </div>
    </div>
  )
}

async function getOrganization(id: string): Promise<Organization | null> {
  try {
    if (!ObjectId.isValid(id)) {
      return null
    }

    const { db } = await connectToDatabase()

    const organization = await db.collection("organizations").findOne({
      _id: new ObjectId(id),
    })

    if (!organization) {
      return null
    }

    return {
      ...organization,
      id: organization._id.toString(),
    } as unknown as Organization
  } catch (error) {
    console.error("Error fetching organization:", error)
    return null
  }
}
