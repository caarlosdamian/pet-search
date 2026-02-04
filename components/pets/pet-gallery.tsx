"use client"

import { useState } from "react"
import Image from "next/image"
import type { Pet } from "@/lib/types"

export default function PetGallery({ pet }: { pet: Pet }) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Use pet.images if available, otherwise create a fallback array with the main image
  const images = pet.images || [{ url: pet.imageUrl || "/placeholder.svg?height=600&width=600", alt: pet.name }]

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto lg:mx-0">
      {/* Main image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm">
        <Image
          src={images[selectedImage]?.url || "/placeholder.svg"}
          alt={images[selectedImage]?.alt || pet.name}
          fill
          priority
          className="h-full w-full object-cover object-center transition-opacity duration-300"
        />
      </div>

      {/* Image thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 sm:gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-square overflow-hidden rounded-lg bg-white ${selectedImage === index
                  ? "ring-2 ring-rose-500 ring-offset-2"
                  : "ring-1 ring-gray-200 hover:ring-rose-300 transition-all"
                }`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt || `${pet.name} - image ${index + 1}`}
                fill
                className={`h-full w-full object-cover object-center ${selectedImage === index ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
