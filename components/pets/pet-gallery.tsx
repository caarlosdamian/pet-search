"use client"

import { useState } from "react"
import Image from "next/image"
import type { Pet } from "@/lib/types"

export default function PetGallery({ pet }: { pet: Pet }) {
  const [selectedImage, setSelectedImage] = useState(0)

  // Use pet.images if available, otherwise create a fallback array with the main image
  const images = pet.images || [{ url: pet.imageUrl || "/placeholder.svg?height=600&width=600", alt: pet.name }]

  return (
    <div className="flex flex-col-reverse">
      {/* Main image */}
      <div className="aspect-h-1 aspect-w-1 w-full">
        <Image
          src={images[selectedImage].url || "/placeholder.svg"}
          alt={images[selectedImage].alt || pet.name}
          width={600}
          height={600}
          className="h-full w-full object-cover object-center rounded-lg"
        />
      </div>

      {/* Image thumbnails */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative aspect-h-1 aspect-w-1 overflow-hidden rounded-md ${
                selectedImage === index ? "ring-2 ring-rose-500" : "hover:opacity-75"
              }`}
            >
              <Image
                src={image.url || "/placeholder.svg"}
                alt={image.alt || `${pet.name} - image ${index + 1}`}
                width={150}
                height={150}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
