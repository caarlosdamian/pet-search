import Image from "next/image"

const testimonials = [
  {
    id: 1,
    quote:
      "Adopting Max was the best decision we ever made. The process was smooth and the staff was incredibly helpful.",
    author: "Sarah Johnson",
    role: "Adopted Max, Golden Retriever",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    quote: "We found our perfect companion through PawFinder. Luna has brought so much joy to our family.",
    author: "Michael Chen",
    role: "Adopted Luna, Tabby Cat",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    quote: "The adoption counselors matched us with exactly the right pet for our lifestyle. We couldn't be happier!",
    author: "Emily Rodriguez",
    role: "Adopted Bella, Labrador Mix",
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Success Stories</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Hear from families who found their perfect companions through our adoption service.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
            >
              <div>
                <div className="flex gap-x-4">
                  <Image
                    className="h-12 w-12 rounded-full bg-gray-50"
                    src={testimonial.imageUrl || "/placeholder.svg"}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                      {testimonial.author}
                    </h3>
                    <p className="text-sm leading-6 text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="mt-8 text-gray-600 italic">{`"${testimonial.quote}"`}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
