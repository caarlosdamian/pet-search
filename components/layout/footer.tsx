import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="https://facebook.com" className="hover:text-rose-400">
            <span className="sr-only">Facebook</span>
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="https://instagram.com" className="hover:text-rose-400">
            <span className="sr-only">Instagram</span>
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="https://twitter.com" className="hover:text-rose-400">
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          {/* <div className="flex flex-col md:flex-row md:gap-8 mb-8">
            <div className="mb-8 md:mb-0">
              <h3 className="text-sm font-semibold leading-6 text-white">Acerca de</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/about" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Nuestra Misión
                  </Link>
                </li>
                <li>
                  <Link href="/about/team" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Nuestro Equipo
                  </Link>
                </li>
                <li>
                  <Link href="/about/locations" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Ubicaciones
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mb-8 md:mb-0">
              <h3 className="text-sm font-semibold leading-6 text-white">Recursos</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/pet-care" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Guías de Cuidado de Mascotas
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Preguntas Frecuentes
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
              <ul className="mt-6 space-y-4">
                <li>
                  <Link href="/privacy" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-sm leading-6 text-gray-300 hover:text-white">
                    Términos del Servicio
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {new Date().getFullYear()} PawFinder. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
