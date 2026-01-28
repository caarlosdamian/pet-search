import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import OrganizationForm from "@/components/admin/organization-form"
import { CustomSession } from "@/lib/types"

export const metadata: Metadata = {
  title: "Add New Organization - PawFinder Admin",
  description: "Add a new organization to the PawFinder platform.",
}

export default async function AddOrganizationPage() {
  const session = await getServerSession(authOptions) as CustomSession

  // Only super admins can access this page
  if (!session || session.user.role !== "admin") {
    redirect("/admin")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/organizations">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Organization</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <OrganizationForm />
      </div>
    </div>
  )
}
