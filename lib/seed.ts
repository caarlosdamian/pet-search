import { Pet } from './types';



const PET_TYPES = ['Dog', 'Cat', 'Rabbit', 'Bird', 'Hamster'];
const BREEDS: Record<string, string[]> = {
  Dog: ['Golden Retriever', 'Labrador', 'Bulldog', 'Beagle', 'Poodle', 'German Shepherd'],
  Cat: ['Siamese', 'Persian', 'Maine Coon', 'Bengal', 'Sphynx'],
  Rabbit: ['Holland Lop', 'Netherland Dwarf', 'Lionhead'],
  Bird: ['Parakeet', 'Cockatiel', 'Canary'],
  Hamster: ['Syrian', 'Dwarf'],
};
const NAMES = ['Bella', 'Max', 'Charlie', 'Luna', 'Lucy', 'Cooper', 'Bailey', 'Daisy', 'Sadie', 'Molly', 'Buddy', 'Rocky'];
const LOCATIONS = ['New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ'];
const DESCRIPTIONS = [
  'A lovely companion looking for a forever home.',
  'Energetic and playful, loves to be around people.',
  'Calm and gentle, perfect for a quiet home.',
  'Needs a bit of training but has a heart of gold.',
  'Loves treats and belly rubs!',
];

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateDummyPets(count: number = 20): Omit<Pet, 'id' | '_id'>[] {
  const pets: Omit<Pet, 'id' | '_id'>[] = [];

  for (let i = 0; i < count; i++) {
    const type = getRandomElement(PET_TYPES);
    const breeds = BREEDS[type] || ['Mixed'];
    const breed = getRandomElement(breeds);
    
    const pet: Omit<Pet, 'id' | '_id'> = {
      organizationId: 'dummy-org-id', // Dummy Org ID
      name: getRandomElement(NAMES),
      type,
      breed,
      age: getRandomInt(1, 15),
      gender: getRandomElement(['Male', 'Female']),
      size: getRandomElement(['Small', 'Medium', 'Large']),
      description: getRandomElement(DESCRIPTIONS),
      temperament: getRandomElement(['Friendly', 'Shy', 'Energetic', 'Calm']),
      location: getRandomElement(LOCATIONS),
      imageUrl: `https://source.unsplash.com/random/400x300/?${type.toLowerCase()},${breed.replace(' ', '-').toLowerCase()}`,
      images: [
           { url: `https://source.unsplash.com/random/400x300/?${type.toLowerCase()},${breed.replace(' ', '-').toLowerCase()},1` },
           { url: `https://source.unsplash.com/random/400x300/?${type.toLowerCase()},${breed.replace(' ', '-').toLowerCase()},2` }
      ],
      spayedNeutered: Math.random() > 0.2,
      houseTrained: Math.random() > 0.3,
      goodWithKids: Math.random() > 0.4,
      goodWithPets: Math.random() > 0.4,
      vaccinated: true,
      microchipped: Math.random() > 0.1,
      specialNeeds: Math.random() > 0.9,
      healthDetails: 'Healthy and ready for adoption.',
      adoptionRequirements: 'Standard adoption application required.',
      adoptionFee: getRandomInt(50, 500),
      adopted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    pets.push(pet);
  }

  return pets;
}
