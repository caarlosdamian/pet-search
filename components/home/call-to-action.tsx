import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <div className="bg-rose-600">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            ¿Listo para encontrar a tu nuevo mejor amigo?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-rose-100">
            Explora nuestras mascotas disponibles y comienza tu viaje de
            adopción hoy mismo.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              asChild
              size="lg"
              className="bg-white text-rose-600 hover:bg-rose-50"
            >
              <Link href="/pets">Encuentra una mascota</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="hover:text-white border-white hover:bg-rose-500"
            >
              <Link href="/about">Saber más</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
