import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Application Submitted - PawFinder",
  description: "Your pet adoption application has been submitted successfully.",
}

export default function ApplicationSuccessPage() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">Application Submitted!</h1>
            <p className="mt-2 text-lg text-gray-600">Thank you for your interest in adopting a pet from PawFinder.</p>
            <div className="mt-6 space-y-4 text-left">
              <h2 className="text-xl font-semibold">What happens next?</h2>
              <ol className="list-decimal space-y-3 pl-5">
                <li>Our team will review your application within 2-3 business days.</li>
                <li>We&apos;ll contact you to schedule a meet and greet with the pet.</li>
                <li>If approved, we&apos;ll guide you through the final adoption process.</li>
              </ol>
              <p className="mt-4 text-gray-600">
                You can check the status of your application in your{" "}
                <Link href="/dashboard" className="font-medium text-rose-600 hover:text-rose-500">
                  dashboard
                </Link>
                .
              </p>
            </div>
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild className="bg-rose-600 hover:bg-rose-500">
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/pets">Browse More Pets</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
