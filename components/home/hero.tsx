import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <div className="mt-24 sm:mt-32 lg:mt-16">
                <div className="inline-flex space-x-6">
                  <span className="rounded-full bg-rose-600/10 px-3 py-1 text-sm font-semibold leading-6 text-rose-600 ring-1 ring-inset ring-rose-600/10">
                    Encuentra a tu nuevo mejor amigo
                  </span>
                </div>
              </div>
              <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Dale un hogar lleno de amor a una mascota
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Miles de mascotas adorables están esperando un hogar para siempre. Explora nuestras mascotas disponibles y encuentra hoy a tu compañero ideal.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-500">
                  <Link href="/pets">Buscar una mascota</Link>
                </Button>
                <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                  Saber más <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1663855552769-9d1de123f397?q=80&w=2304&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Perro feliz con su dueño"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
