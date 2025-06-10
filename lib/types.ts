import { ObjectId } from 'mongodb';

export interface Organization {
  id: string;
  _id: string;
  name: string;
  slug: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  settings: {
    allowPublicApplications: boolean;
    requireApproval: boolean;
    autoEmailResponses: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Pet {
  id: string;
  _id: string;
  organizationId: string;
  name: string;
  type: string;
  breed: string;
  age: number;
  gender: string;
  size: string;
  description: string;
  temperament: string;
  location: string;
  imageUrl: string;
  images?: { url: string; alt?: string }[];
  spayedNeutered: boolean;
  houseTrained: boolean;
  goodWithKids: boolean;
  goodWithPets: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  specialNeeds?: boolean;
  healthDetails: string;
  adoptionRequirements: string;
  adoptionFee: number;
  adopted?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'admin';
  favorites: string[];
  applications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AdoptionApplication {
  id: string;
  petId: string;
  userId: string;
  organizationId: string;
  status: 'pending' | 'approved' | 'rejected';
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
  livingInfo: {
    homeType: string;
    ownRent: string;
    landlordContact?: string;
    hasYard: boolean;
    fenceHeight?: string;
  };
  petExperience: {
    currentPets: string;
    pastPets: string;
    veterinarianContact: string;
  };
  additionalInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  organizationId?: string;
  role: 'admin' | 'user' | 'moderator' | 'org_admin'; // if you have specific roles
  favorites: string[]; // assuming IDs
  applications: ApplicationItem[]; // if you have a specific structure
}

interface ApplicationItem {
  id: string;
  name: string;
  // other application properties
}

export interface CustomSession {
  user: CustomUser;
  expires: string;
}

export interface Adoption {
  _id: string;
  status: string;
  updatedAt: string;
  pet: {
    name: string;
    type: string;
    breed: string;
    imageUrl: string;
  }[];
  user: {
    name: string;
    email: string;
  }[];
}

export interface PetsAPI {
  pets: Pet[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UserModel {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'org_admin';
  favorites: ObjectId[];
  applications: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}
