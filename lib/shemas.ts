import { z } from 'zod';

// Define form schema with Zod
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
});

export type PetFormValues = z.infer<typeof petFormSchema>;
