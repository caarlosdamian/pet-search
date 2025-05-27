export interface Pet {
  id: string
  name: string
  type: string
  breed: string
  age: number
  gender: string
  size: string
  description: string
  temperament: string
  location: string
  imageUrl: string
  images?: { url: string; alt?: string }[]
  spayedNeutered: boolean
  houseTrained: boolean
  goodWithKids: boolean
  goodWithPets: boolean
  vaccinated: boolean
  microchipped: boolean
  specialNeeds: boolean
  healthDetails: string
  adoptionRequirements: string
  adoptionFee: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  image?: string
  role: "user" | "admin"
  favorites: string[]
  applications: string[]
  createdAt: string
  updatedAt: string
}

export interface AdoptionApplication {
  id: string
  petId: string
  userId: string
  status: "pending" | "approved" | "rejected"
  personalInfo: {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    zip: string
  }
  livingInfo: {
    homeType: string
    ownRent: string
    landlordContact?: string
    hasYard: boolean
    fenceHeight?: string
  }
  petExperience: {
    currentPets: string
    pastPets: string
    veterinarianContact: string
  }
  additionalInfo: string
  createdAt: string
  updatedAt: string
}
