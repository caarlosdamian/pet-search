"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Pet } from "@/lib/types"

export default function AdoptionCTA({ pet }: { pet: Pet }) {
  // const { data: session } = useSession()
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h2 className="text-lg font-medium text-gray-900">Ready to meet {pet.name}?</h2>
      <p className="mt-2 text-sm text-gray-500">
        Start the adoption process by submitting an application. Our team will review your application and contact you
        to schedule a meet and greet.
      </p>

      {true ? (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-6 w-full bg-rose-600 hover:bg-rose-500">Apply to Adopt {pet.name}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adopt {pet.name}</DialogTitle>
              <DialogDescription>
                You&apos;re about to start the adoption process for {pet.name}. This will take you to our adoption
                application form.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-gray-500">The adoption process includes:</p>
              <ul className="mt-2 list-disc pl-5 text-sm text-gray-500">
                <li>Completing an adoption application</li>
                <li>A review by our adoption counselors</li>
                <li>A meet and greet with {pet.name}</li>
                <li>Home visit (for some animals)</li>
                <li>Adoption fee payment (${pet.adoptionFee})</li>
              </ul>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button asChild className="bg-rose-600 hover:bg-rose-500">
                <Link href={`/adopt/${pet.id}`}>Continue to Application</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="mt-6 space-y-4">
          <Button asChild className="w-full bg-rose-600 hover:bg-rose-500">
            <Link href={`/login?redirect=/pets/${pet.id}`}>Log in to Apply</Link>
          </Button>
          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href={`/signup?redirect=/pets/${pet.id}`} className="font-medium text-rose-600 hover:text-rose-500">
              Sign up
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}
