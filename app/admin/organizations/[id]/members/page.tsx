import Link from "next/link"
import { ArrowLeft, UserPlus, Mail, Calendar, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect, notFound } from "next/navigation"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import { formatDistanceToNow } from "date-fns"
import DeleteUserButton from "@/components/admin/delete-user-button"

export const metadata = {
  title: "Organization Members - PawFinder Admin",
  description: "Manage organization members and administrators.",
}

export default async function OrganizationMembersPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  // Only super admins can access this page
  if (!session || session.user.role !== "admin") {
    redirect("/admin")
  }

  const { organization, members } = await getOrganizationMembers(params.id)

  if (!organization) {
    notFound()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/admin/organizations/${organization.id}`}>
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">Organization Members</h1>
          <p className="text-gray-600">{organization.name}</p>
        </div>
        <Button asChild className="bg-rose-600 hover:bg-rose-500">
          <Link href={`/admin/organizations/${organization.id}/members/invite`}>
            <UserPlus className="mr-2 h-4 w-4" />
            Invite Admin
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organization Admins</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{members.filter((m) => m.role === "org_admin").length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Joins</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                members.filter((m) => {
                  const joinDate = new Date(m.createdAt)
                  const thirtyDaysAgo = new Date()
                  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                  return joinDate > thirtyDaysAgo
                }).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>
        <CardContent>
          {members.length === 0 ? (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No members</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by inviting an organization admin.</p>
              <div className="mt-6">
                <Button asChild className="bg-rose-600 hover:bg-rose-500">
                  <Link href={`/admin/organizations/${organization.id}/members/invite`}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Admin
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {member.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={member.role === "org_admin" ? "default" : "secondary"}>
                        {member.role === "org_admin" ? "Organization Admin" : member.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDistanceToNow(new Date(member.createdAt), { addSuffix: true })}</TableCell>
                    <TableCell>
                      {member.lastLoginAt
                        ? formatDistanceToNow(new Date(member.lastLoginAt), { addSuffix: true })
                        : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/admin/users/${member.id}`}>View</Link>
                        </Button>
                        <DeleteUserButton userId={member.id} userName={member.name} organizationId={organization.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

async function getOrganizationMembers(id: string) {
  try {
    if (!ObjectId.isValid(id)) {
      return { organization: null, members: [] }
    }

    const { db } = await connectToDatabase()

    // Get organization
    const organization = await db.collection("organizations").findOne({
      _id: new ObjectId(id),
    })

    if (!organization) {
      return { organization: null, members: [] }
    }

    // Get organization members (users with organizationId matching this org)
    const members = await db
      .collection("users")
      .find({
        organizationId: new ObjectId(id),
      })
      .sort({ createdAt: -1 })
      .toArray()

    return {
      organization: {
        ...organization,
        id: organization._id.toString(),
      },
      members: members.map((member) => ({
        ...member,
        id: member._id.toString(),
      })),
    }
  } catch (error) {
    console.error("Error fetching organization members:", error)
    return { organization: null, members: [] }
  }
}
