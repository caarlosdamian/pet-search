import Hero from '@/components/home/hero';
import FeaturedPets from '@/components/home/featured-pets';
import SearchBar from '@/components/home/search-bar';
import Testimonials from '@/components/home/testimonials';
import CallToAction from '@/components/home/call-to-action';

export default async function Home() {
  // Fetch featured pets from the API
  const featuredPets = await getFeaturedPets();

  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <SearchBar />
      <FeaturedPets pets={featuredPets} />
      <Testimonials />
      <CallToAction />
    </div>
  );
}

// Server function to fetch featured pets
async function getFeaturedPets() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || ''}/api/pets/featured`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch featured pets');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching featured pets:', error);
    return [];
  }
}
// async function getFeaturedPets() {
//   try {
//     const { db } = await connectToDatabase();
//     // const totalPets = await db.collection('pets').insertMany(pets);

//     // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ""}/api/pets/featured`, {
//     //   next: { revalidate: 3600 }, // Revalidate every hour
//     // })

//     // if (!response.ok) {
//     //   throw new Error("Failed to fetch featured pets")
//     // }

//     return { message: 'success' };
//   } catch (error) {
//     console.error('Error fetching featured pets:', error);
//     return [];
//   }
// }
