import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { ArrowLeft, Building2, Mail, Phone, Globe, MapPin, Edit, Users, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import DeleteOrganizationButton from "@/components/admin/delete-organization-button"
import { CustomSession, Organization, Stats } from "@/lib/types"

export const metadata = {
  title: "Organization Details - PawFinder Admin",
  description: "View organization details and statistics.",
}

export default async function OrganizationDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions) as CustomSession
  const { id } = await params

  // Only super admins can access this page
  if (!session || session.user.role !== "admin") {
    redirect("/admin")
  }

  const { organization, stats } = await getOrganizationDetails(id) as unknown as {
    organization: Organization
    stats: Stats
  }

  if (!organization) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/organizations">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{organization.name}</h1>
          <p className="text-gray-600">Organization Details</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href={`/admin/organizations/${organization.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/admin/organizations/${organization.id}/members`}>
              <Users className="mr-2 h-4 w-4" />
              Manage Members
            </Link>
          </Button>
          <DeleteOrganizationButton organizationId={organization.id} organizationName={organization.name} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Organization Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Organization Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Organization Name</label>
                      <p className="text-gray-900">{organization.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Slug</label>
                      <p className="text-gray-900">@{organization.slug}</p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Description</label>
                      <p className="text-gray-900">{organization.description || "No description provided"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Created</label>
                      <p className="text-gray-900">
                        {formatDistanceToNow(new Date(organization.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Updated</label>
                      <p className="text-gray-900">
                        {formatDistanceToNow(new Date(organization.updatedAt), { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Email</label>
                        <p className="text-gray-900">{organization.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="text-gray-900">{organization.phone}</p>
                      </div>
                    </div>
                    {organization.website && (
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-gray-400" />
                        <div>
                          <label className="text-sm font-medium text-gray-500">Website</label>
                          <p className="text-gray-900">
                            <a
                              href={organization.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-rose-600 hover:text-rose-500"
                            >
                              {organization.website}
                            </a>
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Address</label>
                        <p className="text-gray-900">
                          {organization.address}
                          <br />
                          {organization.city}, {organization.state} {organization.zip}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Allow Public Applications</label>
                      <p className="text-gray-900">
                        <Badge variant={organization.settings?.allowPublicApplications ? "default" : "secondary"}>
                          {organization.settings?.allowPublicApplications ? "Enabled" : "Disabled"}
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Require Approval</label>
                      <p className="text-gray-900">
                        <Badge variant={organization.settings?.requireApproval ? "default" : "secondary"}>
                          {organization.settings?.requireApproval ? "Enabled" : "Disabled"}
                        </Badge>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Auto Email Responses</label>
                      <p className="text-gray-900">
                        <Badge variant={organization.settings?.autoEmailResponses ? "default" : "secondary"}>
                          {organization.settings?.autoEmailResponses ? "Enabled" : "Disabled"}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Stats and Logo */}
        <div className="space-y-6">
          {/* Logo */}
          <Card>
            <CardHeader>
              <CardTitle>Logo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="h-32 w-32 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                  {organization.logo ? (
                    <Image
                      src={organization.logo || "/placeholder.svg"}
                      alt={organization.name}
                      width={128}
                      height={128}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <Building2 className="h-16 w-16 text-gray-400" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PawPrint className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Total Pets</span>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {stats.totalPets}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <PawPrint className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Available Pets</span>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {stats.availablePets}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Organization Admins</span>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  {stats.totalAdmins}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Total Applications</span>
                </div>
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  {stats.totalApplications}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm">Pending Applications</span>
                </div>
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                  {stats.pendingApplications}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

async function getOrganizationDetails(id: string) {
  try {
    if (!ObjectId.isValid(id)) {
      return { organization: null, stats: null }
    }

    const { db } = await connectToDatabase()

    // Get organization
    const organization = await db.collection("organizations").findOne({
      _id: new ObjectId(id),
    })

    if (!organization) {
      return { organization: null, stats: null }
    }

    // Get stats
    const totalPets = await db.collection("pets").countDocuments({ organizationId: new ObjectId(id) })
    const availablePets = await db
      .collection("pets")
      .countDocuments({ organizationId: new ObjectId(id), adopted: { $ne: true } })
    const totalAdmins = await db
      .collection("users")
      .countDocuments({ role: "org_admin", organizationId: new ObjectId(id) })
    const totalApplications = await db.collection("applications").countDocuments({ organizationId: new ObjectId(id) })
    const pendingApplications = await db
      .collection("applications")
      .countDocuments({ organizationId: new ObjectId(id), status: "pending" })

    return {
      organization: {
        ...organization,
        id: organization._id.toString(),
      },
      stats: {
        totalPets,
        availablePets,
        totalAdmins,
        totalApplications,
        pendingApplications,
      },
    }
  } catch (error) {
    console.error("Error fetching organization details:", error)
    return { organization: null, stats: null }
  }
}
