import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CallToAction() {
  return (
    <div className="bg-rose-600">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to find your new best friend?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-rose-100">
            Browse our available pets and start your adoption journey today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-white text-rose-600 hover:bg-rose-50">
              <Link href="/pets">Find a Pet</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-rose-500">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
