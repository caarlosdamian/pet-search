import { ObjectId } from 'mongodb';
// import { hash } from 'bcryptjs';

// Create consistent ObjectIDs for references
const petIds = Array(20).fill(0).map(() => new ObjectId());
// const userIds = Array(5).fill(0).map(() => new ObjectId());
// const applicationIds = Array(8).fill(0).map(() => new ObjectId());

// // Create hashed passwords for users
// const hashedPassword = await hash('password123', 10);

// Mock Pets Data
export const pets = [
  {
    _id: petIds[0],
    name: "Max",
    type: "dog",
    breed: "Golden Retriever",
    age: 3,
    gender: "male",
    size: "large",
    description: "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks. He's great with children and other pets, and would make a perfect addition to an active family.",
    temperament: "Friendly, Energetic, Loyal",
    location: "new-york",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Max sitting" },
      { url: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Max playing" },
      { url: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Max on grass" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Max is in excellent health. He is up-to-date on all vaccinations and has been neutered.",
    adoptionRequirements: "We're looking for a family that can provide Max with plenty of exercise and attention. A home with a yard would be ideal.",
    adoptionFee: 250,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[1],
    name: "Luna",
    type: "cat",
    breed: "Tabby",
    age: 2,
    gender: "female",
    size: "medium",
    description: "Luna is a sweet and affectionate tabby cat who loves to curl up in laps and purr. She's quite playful and enjoys chasing toys around the house. Luna would do well in a quiet home with or without other cats.",
    temperament: "Affectionate, Playful, Independent",
    location: "los-angeles",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Luna resting" },
      { url: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Luna playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Luna is in good health and has been spayed. She is up-to-date on all vaccinations.",
    adoptionRequirements: "Luna would do best in a home where she can get plenty of attention and playtime. She's good with children and other pets.",
    adoptionFee: 150,
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[2],
    name: "Buddy",
    type: "dog",
    breed: "Labrador Mix",
    age: 5,
    gender: "male",
    size: "large",
    description: "Buddy is a gentle and well-behaved Labrador mix who loves to please his humans. He's great on a leash and knows several commands. Buddy would make a wonderful companion for almost any household.",
    temperament: "Gentle, Obedient, Loving",
    location: "chicago",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Buddy portrait" },
      { url: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Buddy outside" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Buddy is in excellent health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Buddy would do well in almost any home environment. He's good with children and other pets.",
    adoptionFee: 200,
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[3],
    name: "Bella",
    type: "dog",
    breed: "Beagle",
    age: 1,
    gender: "female",
    size: "medium",
    description: "Bella is a playful and curious Beagle puppy who loves to explore her surroundings. She's still learning basic commands and house training, but she's a quick learner. Bella would thrive in a home with a patient owner who can provide training and plenty of exercise.",
    temperament: "Playful, Curious, Energetic",
    location: "houston",
    imageUrl: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Bella sitting" },
      { url: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Bella playing" }
    ],
    spayedNeutered: true,
    houseTrained: false,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Bella is in good health and has received all age-appropriate vaccinations. She has been spayed.",
    adoptionRequirements: "Bella needs a home where someone can continue her training and provide plenty of exercise. She would do well with an active family.",
    adoptionFee: 275,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[4],
    name: "Oliver",
    type: "cat",
    breed: "Siamese",
    age: 4,
    gender: "male",
    size: "medium",
    description: "Oliver is a talkative and intelligent Siamese cat who loves to be the center of attention. He enjoys interactive toys and will follow you around the house to see what you're doing. Oliver would do best in a home where he can get plenty of attention and mental stimulation.",
    temperament: "Intelligent, Vocal, Affectionate",
    location: "phoenix",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Oliver resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Oliver playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Oliver is in excellent health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Oliver would do best as the only pet in the household. He's good with older children who understand how to interact with cats.",
    adoptionFee: 175,
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[5],
    name: "Charlie",
    type: "dog",
    breed: "Poodle Mix",
    age: 7,
    gender: "male",
    size: "small",
    description: "Charlie is a sweet and gentle Poodle mix who loves to cuddle. He's a bit shy at first, but warms up quickly once he gets to know you. Charlie would do best in a quiet home with a patient owner who can help build his confidence.",
    temperament: "Gentle, Shy, Affectionate",
    location: "new-york",
    imageUrl: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Charlie sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Charlie close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Charlie is in good health for his age. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Charlie would do best in a quiet home with a patient owner. He's good with gentle children and other pets.",
    adoptionFee: 150,
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[6],
    name: "Lucy",
    type: "cat",
    breed: "Calico",
    age: 3,
    gender: "female",
    size: "medium",
    description: "Lucy is a beautiful calico cat with a playful and independent personality. She enjoys interactive toys and climbing to high perches to observe her surroundings. Lucy would do well in a home with or without other cats.",
    temperament: "Playful, Independent, Curious",
    location: "los-angeles",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Lucy resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Lucy playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Lucy is in excellent health. She has been spayed and is up-to-date on all vaccinations.",
    adoptionRequirements: "Lucy would do well in most home environments. She's good with children and other pets.",
    adoptionFee: 125,
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[7],
    name: "Rocky",
    type: "dog",
    breed: "Boxer",
    age: 4,
    gender: "male",
    size: "large",
    description: "Rocky is a strong and athletic Boxer who loves to run and play. He's very loyal and protective of his family. Rocky would do best in a home with an experienced dog owner who can provide plenty of exercise and consistent training.",
    temperament: "Energetic, Loyal, Protective",
    location: "chicago",
    imageUrl: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Rocky standing" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Rocky close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Rocky is in excellent health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Rocky needs a home with an experienced dog owner who can provide plenty of exercise and consistent training. He would do best as the only pet in the household.",
    adoptionFee: 225,
    createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[8],
    name: "Milo",
    type: "cat",
    breed: "Maine Coon Mix",
    age: 2,
    gender: "male",
    size: "large",
    description: "Milo is a gentle giant with a luxurious coat and friendly personality. He loves to be brushed and will purr loudly when content. Milo would do well in a home with or without other pets.",
    temperament: "Gentle, Friendly, Calm",
    location: "houston",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Milo resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Milo playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Milo is in excellent health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Milo would do well in most home environments. He's good with children and other pets.",
    adoptionFee: 200,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[9],
    name: "Daisy",
    type: "dog",
    breed: "Dachshund",
    age: 6,
    gender: "female",
    size: "small",
    description: "Daisy is a sweet and cuddly Dachshund who loves to burrow under blankets and snuggle. She's a bit shy with new people but warms up quickly. Daisy would do best in a quiet home with a patient owner.",
    temperament: "Sweet, Shy, Cuddly",
    location: "phoenix",
    imageUrl: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1612195583950-b8fd34c87093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Daisy sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Daisy close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Daisy is in good health for her age. She has been spayed and is up-to-date on all vaccinations.",
    adoptionRequirements: "Daisy would do best in a quiet home with a patient owner. She's good with other pets but would prefer a home without young children.",
    adoptionFee: 175,
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[10],
    name: "Simba",
    type: "cat",
    breed: "Orange Tabby",
    age: 1,
    gender: "male",
    size: "medium",
    description: "Simba is a playful and curious orange tabby kitten who loves to explore and play with toys. He's very social and gets along well with other cats. Simba would do well in a home with or without other pets.",
    temperament: "Playful, Curious, Social",
    location: "new-york",
    imageUrl: "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1577023311546-cdc07a8454d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Simba resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Simba playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Simba is in excellent health. He has been neutered and is up-to-date on all age-appropriate vaccinations.",
    adoptionRequirements: "Simba would do well in most home environments. He's good with children and other pets.",
    adoptionFee: 150,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[11],
    name: "Rosie",
    type: "dog",
    breed: "Pit Bull Mix",
    age: 3,
    gender: "female",
    size: "medium",
    description: "Rosie is a sweet and gentle Pit Bull mix who loves people. She's very affectionate and enjoys cuddling on the couch. Rosie would do best in a home where she can get plenty of attention and exercise.",
    temperament: "Sweet, Gentle, Affectionate",
    location: "los-angeles",
    imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Rosie sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Rosie close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Rosie is in excellent health. She has been spayed and is up-to-date on all vaccinations.",
    adoptionRequirements: "Rosie would do best as the only pet in the household. She's good with children but should be in a home without other pets.",
    adoptionFee: 200,
    createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[12],
    name: "Oscar",
    type: "cat",
    breed: "Russian Blue",
    age: 5,
    gender: "male",
    size: "medium",
    description: "Oscar is a dignified and quiet Russian Blue who enjoys peaceful environments. He's not very demanding and is content to lounge in sunny spots around the house. Oscar would do best in a calm home with adults or older children.",
    temperament: "Quiet, Dignified, Independent",
    location: "chicago",
    imageUrl: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Oscar resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Oscar playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Oscar is in good health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Oscar would do best in a quiet home with adults or older children. He's good with other calm pets.",
    adoptionFee: 150,
    createdAt: new Date(Date.now() - 70 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[13],
    name: "Coco",
    type: "dog",
    breed: "Chihuahua",
    age: 8,
    gender: "female",
    size: "small",
    description: "Coco is a sweet and loving Chihuahua who enjoys sitting in laps and being pampered. She's a bit shy with new people but very loyal to her humans. Coco would do best in a quiet home with adults or older children.",
    temperament: "Sweet, Loving, Shy",
    location: "houston",
    imageUrl: "https://images.unsplash.com/photo-1605897472359-85e4b94c0ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1605897472359-85e4b94c0ea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Coco sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Coco close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: false,
    vaccinated: true,
    microchipped: true,
    specialNeeds: true,
    healthDetails: "Coco has dental issues that require regular check-ups and a special diet. She has been spayed and is up-to-date on all vaccinations.",
    adoptionRequirements: "Coco would do best in a quiet home with adults or older children. She should be the only pet in the household.",
    adoptionFee: 125,
    createdAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[14],
    name: "Leo",
    type: "cat",
    breed: "Bengal",
    age: 2,
    gender: "male",
    size: "medium",
    description: "Leo is an active and playful Bengal cat who loves to climb and explore. He's very intelligent and needs plenty of mental stimulation. Leo would do best in a home with experienced cat owners who can provide plenty of toys and climbing opportunities.",
    temperament: "Active, Playful, Intelligent",
    location: "phoenix",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Leo resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Leo playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Leo is in excellent health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Leo needs a home with plenty of space to climb and explore. He's good with children and other pets.",
    adoptionFee: 225,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[15],
    name: "Ruby",
    type: "dog",
    breed: "Australian Shepherd",
    age: 2,
    gender: "female",
    size: "medium",
    description: "Ruby is an intelligent and energetic Australian Shepherd who loves to learn new tricks and play fetch. She needs plenty of exercise and mental stimulation. Ruby would do best in an active home with a yard where she can run and play.",
    temperament: "Intelligent, Energetic, Loyal",
    location: "new-york",
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1583511655826-05700442b31b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Ruby sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Ruby close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Ruby is in excellent health. She has been spayed and is up-to-date on all vaccinations.",
    adoptionRequirements: "Ruby needs a home with an active lifestyle and plenty of space to run and play. She's good with children and other pets.",
    adoptionFee: 250,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[16],
    name: "Whiskers",
    type: "cat",
    breed: "Domestic Shorthair",
    age: 10,
    gender: "male",
    size: "medium",
    description: "Whiskers is a gentle and laid-back senior cat who loves to nap in sunny spots and receive gentle pets. He's very low-maintenance and would make a perfect companion for a quiet household. Whiskers would do best in a calm home with adults or older children.",
    temperament: "Gentle, Laid-back, Affectionate",
    location: "los-angeles",
    imageUrl: "https://images.unsplash.com/photo-1574144283535-5a5b7eea34fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1574144283535-5a5b7eea34fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Whiskers resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Whiskers playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: true,
    healthDetails: "Whiskers has early kidney disease that requires a special diet and regular check-ups. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Whiskers would do best in a quiet home with adults or older children. He's good with other calm pets.",
    adoptionFee: 100,
    createdAt: new Date(Date.now() - 95 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[17],
    name: "Cooper",
    type: "dog",
    breed: "Border Collie",
    age: 1,
    gender: "male",
    size: "medium",
    description: "Cooper is a highly intelligent and energetic Border Collie puppy who loves to learn and play. He needs plenty of exercise and mental stimulation. Cooper would do best in an active home with experienced dog owners who can provide training and plenty of activities.",
    temperament: "Intelligent, Energetic, Trainable",
    location: "chicago",
    imageUrl: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1503256207526-0d5d80fa2f47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Cooper sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Cooper close-up" }
    ],
    spayedNeutered: true,
    houseTrained: false,
    goodWithKids: true,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Cooper is in excellent health. He has been neutered and is up-to-date on all age-appropriate vaccinations.",
    adoptionRequirements: "Cooper needs a home with an active lifestyle and plenty of space to run and play. He's good with children and other pets.",
    adoptionFee: 275,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[18],
    name: "Misty",
    type: "cat",
    breed: "Persian",
    age: 7,
    gender: "female",
    size: "medium",
    description: "Misty is a beautiful Persian cat with a calm and gentle personality. She enjoys being groomed and lounging in comfortable spots. Misty would do best in a quiet home with adults or older children who can help maintain her coat.",
    temperament: "Calm, Gentle, Dignified",
    location: "houston",
    imageUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Misty resting" },
      { url: "https://images.unsplash.com/photo-1606214174585-fe31582dc6ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Misty playing" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: false,
    goodWithPets: true,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Misty is in good health. She has been spayed and is up-to-date on all vaccinations. She requires regular grooming to maintain her coat.",
    adoptionRequirements: "Misty would do best in a quiet home with adults or older children. She's good with other calm pets.",
    adoptionFee: 175,
    createdAt: new Date(Date.now() - 65 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  },
  {
    _id: petIds[19],
    name: "Zeus",
    type: "dog",
    breed: "German Shepherd",
    age: 5,
    gender: "male",
    size: "large",
    description: "Zeus is a noble and intelligent German Shepherd who is well-trained and obedient. He's protective of his family and territory. Zeus would do best in a home with experienced dog owners who can provide consistent leadership and plenty of exercise.",
    temperament: "Intelligent, Protective, Loyal",
    location: "phoenix",
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    images: [
      { url: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Zeus sitting" },
      { url: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80", alt: "Zeus close-up" }
    ],
    spayedNeutered: true,
    houseTrained: true,
    goodWithKids: true,
    goodWithPets: false,
    vaccinated: true,
    microchipped: true,
    specialNeeds: false,
    healthDetails: "Zeus is in excellent health. He has been neutered and is up-to-date on all vaccinations.",
    adoptionRequirements: "Zeus needs a home with experienced dog owners who can provide consistent leadership and plenty of exercise. He would do best as the only pet in the household.",
    adoptionFee: 250,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  }
];

// // Mock Users Data
// export const users = [
//   {
//     _id: userIds[0],
//     name: "John Doe",
//     email: "john@example.com",
//     password: hashedPassword,
//     image: "https://randomuser.me/api/portraits/men/1.jpg",
//     role: "user",
//     favorites: [petIds[0].toString(), petIds[5].toString(), petIds[10].toString()],
//     applications: [applicationIds[0].toString(), applicationIds[4].toString()],
//     createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
//     updatedAt: new Date()
//   },
//   {
//     _id: userIds[1],
//     name: "Jane Smith",
//     email: "jane@example.com",
//     password: hashedPassword,
//     image: "https://randomuser.me/api/portraits/women/1.jpg",
//     role: "user",
//     favorites: [petIds[1].toString(), petIds[6].toString(), petIds[11].toString()],
//     applications: [applicationIds[1].toString(), applicationIds[5].toString()],
//     createdAt: new Date(Date.now() - 85 * 24 * 60 * 60 * 1000),
//     updatedAt: new Date()
//   },
//   {
//     _id: userIds[2],
//     name: "Admin User",
//     email: "admin@example.com",
//     password: hashedPassword,
//     image: "https://randomuser.me/api/portraits/men/2.jpg",
//     role: "admin",
//     favorites: [],
//     applications: [],
//     createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
//     updatedAt: new Date()
//   },
//   {
//     _id: userIds[3],
//     name: "Michael Johnson",
//     email: "michael@example.com",
//     password: hashedPassword,
//     image: "https://randomuser.me/api/portraits/men/3.jpg",
//     role: "user",
//     favorites: [petIds[2].toString(), petIds[7].toString(), petIds[12].toString()],
//     applications: [applicationIds[2].toString(), applicationIds[6].toString()],
//     createdAt: new Date(Date.now() - 80 * 24 * 60 * 60 * 1000),
//     updatedAt: new Date().toISOString()
//   },
//   {
//     _id: userIds[4],
//     name: "Emily Davis",
//     email: "emily@example.com",
//     password: hashedPassword,
//     image: "https://randomuser.me/api/portraits/women/2.jpg",
//     role: "user",
//     favorites: [petIds[3].toString(), petIds[8].toString(), petIds[13].toString()],
//     applications: [applicationIds[3].toString(), applicationIds[7].toString()],
//     createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date().toISOString()
//   }
// ];

// // Mock Applications Data
// export const applications = [
//   {
//     _id: applicationIds[0],
//     petId: petIds[0].toString(),
//     userId: userIds[0].toString(),
//     status: "approved",
//     personalInfo: {
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St",
//       city: "New York",
//       state: "NY",
//       zip: "10001"
//     },
//     livingInfo: {
//       homeType: "house",
//       ownRent: "own",
//       hasYard: true,
//       fenceHeight: "6 feet"
//     },
//     petExperience: {
//       currentPets: "None",
//       pastPets: "Had a Golden Retriever for 10 years",
//       veterinarianContact: "Dr. Smith, NYC Vet Clinic, 555-123-4567"
//     },
//     additionalInfo: "I've been looking for a dog like Max for a long time and believe we would be a great match.",
//     createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[1],
//     petId: petIds[1].toString(),
//     userId: userIds[1].toString(),
//     status: "approved",
//     personalInfo: {
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "234-567-8901",
//       address: "456 Oak St",
//       city: "Los Angeles",
//       state: "CA",
//       zip: "90001"
//     },
//     livingInfo: {
//       homeType: "apartment",
//       ownRent: "rent",
//       landlordContact: "LA Properties, 555-987-6543",
//       hasYard: false
//     },
//     petExperience: {
//       currentPets: "One cat, 3 years old",
//       pastPets: "Grew up with cats",
//       veterinarianContact: "Dr. Johnson, LA Pet Clinic, 555-234-5678"
//     },
//     additionalInfo: "I think Luna would be a great companion for my current cat.",
//     createdAt: new Date(Date.now() - 55 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[2],
//     petId: petIds[2].toString(),
//     userId: userIds[3].toString(),
//     status: "pending",
//     personalInfo: {
//       name: "Michael Johnson",
//       email: "michael@example.com",
//       phone: "345-678-9012",
//       address: "789 Pine St",
//       city: "Chicago",
//       state: "IL",
//       zip: "60601"
//     },
//     livingInfo: {
//       homeType: "house",
//       ownRent: "own",
//       hasYard: true,
//       fenceHeight: "4 feet"
//     },
//     petExperience: {
//       currentPets: "None",
//       pastPets: "Had several dogs growing up",
//       veterinarianContact: "Dr. Williams, Chicago Vet Center, 555-345-6789"
//     },
//     additionalInfo: "I have a large yard and work from home, so I can provide Buddy with plenty of attention and exercise.",
//     createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toI  - 30 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[3],
//     petId: petIds[3].toString(),
//     userId: userIds[4].toString(),
//     status: "approved",
//     personalInfo: {
//       name: "Emily Davis",
//       email: "emily@example.com",
//       phone: "456-789-0123",
//       address: "101 Maple Ave",
//       city: "Houston",
//       state: "TX",
//       zip: "77001"
//     },
//     livingInfo: {
//       homeType: "house",
//       ownRent: "own",
//       hasYard: true,
//       fenceHeight: "5 feet"
//     },
//     petExperience: {
//       currentPets: "One dog, 5 years old",
//       pastPets: "Have had dogs all my life",
//       veterinarianContact: "Dr. Brown, Houston Animal Hospital, 555-456-7890"
//     },
//     additionalInfo: "I think Bella would be a great playmate for my current dog and would fit in well with our active lifestyle.",
//     createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[4],
//     petId: petIds[5].toString(),
//     userId: userIds[0].toString(),
//     status: "rejected",
//     personalInfo: {
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "123-456-7890",
//       address: "123 Main St",
//       city: "New York",
//       state: "NY",
//       zip: "10001"
//     },
//     livingInfo: {
//       homeType: "apartment",
//       ownRent: "rent",
//       landlordContact: "NYC Properties, 555-123-4567",
//       hasYard: false
//     },
//     petExperience: {
//       currentPets: "None",
//       pastPets: "Had a Golden Retriever for 10 years",
//       veterinarianContact: "Dr. Smith, NYC Vet Clinic, 555-123-4567"
//     },
//     additionalInfo: "I work from home and can provide Charlie with plenty of attention.",
//     createdAt: new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[5],
//     petId: petIds[6].toString(),
//     userId: userIds[1].toString(),
//     status: "pending",
//     personalInfo: {
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "234-567-8901",
//       address: "456 Oak St",
//       city: "Los Angeles",
//       state: "CA",
//       zip: "90001"
//     },
//     livingInfo: {
//       homeType: "apartment",
//       ownRent: "rent",
//       landlordContact: "LA Properties, 555-987-6543",
//       hasYard: false
//     },
//     petExperience: {
//       currentPets: "One cat, 3 years old",
//       pastPets: "Grew up with cats",
//       veterinarianContact: "Dr. Johnson, LA Pet Clinic, 555-234-5678"
//     },
//     additionalInfo: "I think Lucy would be a great companion for my current cat.",
//     createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[6],
//     petId: petIds[7].toString(),
//     userId: userIds[3].toString(),
//     status: "pending",
//     personalInfo: {
//       name: "Michael Johnson",
//       email: "michael@example.com",
//       phone: "345-678-9012",
//       address: "789 Pine St",
//       city: "Chicago",
//       state: "IL",
//       zip: "60601"
//     },
//     livingInfo: {
//       homeType: "house",
//       ownRent: "own",
//       hasYard: true,
//       fenceHeight: "6 feet"
//     },
//     petExperience: {
//       currentPets: "None",
//       pastPets: "Had several dogs growing up",
//       veterinarianContact: "Dr. Williams, Chicago Vet Center, 555-345-6789"
//     },
//     additionalInfo: "I have a large yard and am very active, so I can provide Rocky with plenty of exercise.",
//     createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
//   },
//   {
//     _id: applicationIds[7],
//     petId: petIds[8].toString(),
//     userId: userIds[4].toString(),
//     status: "approved",
//     personalInfo: {
//       name: "Emily Davis",
//       email: "emily@example.com",
//       phone: "456-789-0123",
//       address: "101 Maple Ave",
//       city: "Houston",
//       state: "TX",
//       zip: "77001"
//     },
//     livingInfo: {
//       homeType: "house",
//       ownRent: "own",
//       hasYard: true,
//       fenceHeight: "5 feet"
//     },
//     petExperience: {
//       currentPets: "One dog, 5 years old",
//       pastPets: "Have had cats and dogs all my life",
//       veterinarianContact: "Dr. Brown, Houston Animal Hospital, 555-456-7890"
//     },
//     additionalInfo: "I've always loved Maine Coons and think Milo would be a perfect addition to our family.",
//     createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
//     updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
//   }
// ];