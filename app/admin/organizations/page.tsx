import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { PlusCircle, Building2, Users, PawPrint } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { connectToDatabase } from "@/lib/mongodb"
import OrganizationFilters from "@/components/admin/organization-filters"
import PaginationControls from "@/components/pets/pagination-controls"
import OrganizationsTableSkeleton from "@/components/admin/organizations-table-skeleton"
import { redirect } from "next/navigation"
import { CustomSession } from "@/lib/types"

export const metadata = {
  title: "Manage Organizations - PawFinder Admin",
  description: "Add, edit, and manage organizations on the PawFinder platform.",
}

export default async function AdminOrganizationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] }>
}) {
  const session = await getServerSession(authOptions) as CustomSession
  const params = await searchParams

  // Only super admins can access this page
  if (!session || session.user.role !== "admin") {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Organizations</h1>
          <p className="text-gray-600">Add, edit, and manage organizations on the platform.</p>
        </div>
        <Button asChild className="bg-rose-600 hover:bg-rose-500">
          <Link href="/admin/organizations/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Organization
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter organizations by name or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrganizationFilters />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
          <CardDescription>All organizations registered on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OrganizationsTableSkeleton />}>
            <OrganizationsTableWithData searchParams={params} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

async function OrganizationsTableWithData({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { organizations, totalPages, stats } = await getOrganizations(searchParams)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            <div>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-gray-500">Total Organizations</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-green-600" />
            <div>
              <div className="text-2xl font-bold">{stats.totalPets}</div>
              <p className="text-sm text-gray-500">Total Pets</p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            <div>
              <div className="text-2xl font-bold">{stats.totalAdmins}</div>
              <p className="text-sm text-gray-500">Organization Admins</p>
            </div>
          </div>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Pets</TableHead>
              <TableHead>Admins</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.length > 0 ? (
              organizations.map((org) => (
                <TableRow key={org._id.toString()}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                        {org.logo ? (
                          <Image
                            src={org.logo || "/placeholder.svg"}
                            alt={org.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Building2 className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{org.name}</p>
                        <p className="text-xs text-gray-500">@{org.slug}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm">{org.email}</p>
                      <p className="text-xs text-gray-500">{org.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>
                        {org.city}, {org.state}
                      </p>
                      <p className="text-xs text-gray-500">{org.zip}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700">
                      {org.petCount || 0} pets
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-purple-50 text-purple-700">
                      {org.adminCount || 0} admins
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{formatDistanceToNow(new Date(org.createdAt), { addSuffix: true })}</div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/organizations/${org._id}/edit`}>Edit</Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/organizations/${org._id}`}>View</Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No organizations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <PaginationControls totalPages={totalPages} />
        </div>
      )}
    </div>
  )
}

async function getOrganizations(searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    const { db } = await connectToDatabase()

    // Build query from search params
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {}

    if (searchParams.search) {
      query.$or = [
        { name: { $regex: searchParams.search, $options: "i" } },
        { email: { $regex: searchParams.search, $options: "i" } },
        { slug: { $regex: searchParams.search, $options: "i" } },
      ]
    }

    // Pagination
    const page = Number(searchParams.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    // Get organizations with aggregated data
    const organizations = await db
      .collection("organizations")
      .aggregate([
        { $match: query },
        {
          $lookup: {
            from: "pets",
            localField: "_id",
            foreignField: "organizationId",
            as: "pets",
          },
        },
        {
          $lookup: {
            from: "users",
            let: { orgId: "$_id" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [{ $eq: ["$role", "org_admin"] }, { $eq: ["$organizationId", "$$orgId"] }],
                  },
                },
              },
            ],
            as: "admins",
          },
        },
        {
          $addFields: {
            petCount: { $size: "$pets" },
            adminCount: { $size: "$admins" },
          },
        },
        {
          $project: {
            pets: 0,
            admins: 0,
          },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit },
      ])
      .toArray()

    // Get total count for pagination
    const totalOrganizations = await db.collection("organizations").countDocuments(query)
    const totalPages = Math.ceil(totalOrganizations / limit)

    // Get stats
    const totalPets = await db.collection("pets").countDocuments()
    const totalAdmins = await db.collection("users").countDocuments({ role: "org_admin" })

    return {
      organizations,
      totalPages,
      stats: {
        total: totalOrganizations,
        totalPets,
        totalAdmins,
      },
    }
  } catch (error) {
    console.error("Error fetching organizations:", error)
    return {
      organizations: [],
      totalPages: 0,
      stats: { total: 0, totalPets: 0, totalAdmins: 0 },
    }
  }
}
