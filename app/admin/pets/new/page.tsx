import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PetForm from "@/components/admin/pet-form"

export const metadata: Metadata = {
  title: "Add New Pet - PawFinder Admin",
  description: "Add a new pet to the PawFinder platform.",
}

export default function AddPetPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/admin/pets">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">Add New Pet</h1>
      </div>

      <div className="rounded-lg border bg-white p-6 shadow-sm">
        <PetForm />
      </div>
    </div>
  )
}
