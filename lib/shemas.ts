import { z } from 'zod';

// Define form schema with Zod
export const userFormSchema = z.object({
  name: z.string().min(1, 'Campo Obligatiorio'),
  emai: z.string().min(1, 'Campo Obligatiorio'),
  role: z.string().min(1, 'Campo Obligatiorio'),
});

export const petFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  type: z.string().min(1, 'Type is required'),
  breed: z.string().min(1, 'Breed is required'),
  age: z.coerce.number().min(0, 'Age must be a positive number'),
  gender: z.string().min(1, 'Gender is required'),
  size: z.string().min(1, 'Size is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  temperament: z.string().min(1, 'Temperament is required'),
  location: z.string().min(1, 'Location is required'),
  imageUrl: z.string().min(1, 'Main image URL is required'),
  images: z
    .array(
      z.object({
        url: z.string().min(1, 'Image URL is required'),
        alt: z.string().optional(),
      })
    )
    .optional(),
  spayedNeutered: z.boolean().default(false),
  houseTrained: z.boolean().default(false),
  goodWithKids: z.boolean().default(false),
  goodWithPets: z.boolean().default(false),
  vaccinated: z.boolean().default(false),
  microchipped: z.boolean().default(false),
  specialNeeds: z.boolean().default(false),
  healthDetails: z.string().min(1, 'Health details are required'),
  adoptionRequirements: z.string().min(1, 'Adoption requirements are required'),
  adoptionFee: z.coerce
    .number()
    .min(0, 'Adoption fee must be a positive number'),
  organizationId: z.string().min(1, 'Organization is required').optional(),
});

export const adoptionFormSchema = z.object({
  // Personal Information
  personalInfo: z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
    address: z.string().min(5, { message: 'Please enter your full address' }),
    city: z.string().min(2, { message: 'Please enter your city' }),
    state: z.string().min(2, { message: 'Please enter your state' }),
    zip: z.string().min(5, { message: 'Please enter a valid ZIP code' }),
  }),

  // Living Situation
  livingInfo: z.object({
    homeType: z.enum(['house', 'apartment', 'condo', 'other'], {
      required_error: 'Please select your home type',
    }),
    ownRent: z.enum(['own', 'rent'], {
      required_error: 'Please select whether you own or rent',
    }),
    landlordContact: z.string().optional(),
    hasYard: z.boolean().default(false),
    fenceHeight: z.string().optional(),
  }),

  // Pet Experience
  petExperience: z.object({
    currentPets: z.string(),
    pastPets: z.string(),
    veterinarianContact: z.string(),
  }),

  // Additional Information
  additionalInfo: z.string().optional(),

  // Terms and Conditions
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type PetFormValues = z.infer<typeof petFormSchema>;
export type UserFormValues = z.infer<typeof userFormSchema>;
export type AdoptionFormValues = z.infer<typeof adoptionFormSchema>;
