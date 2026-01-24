import Hero from '@/components/home/hero';
import FeaturedPets from '@/components/home/featured-pets';
import SearchBar from '@/components/home/search-bar';
// import Testimonials from '@/components/home/testimonials';
import CallToAction from '@/components/home/call-to-action';
import { getFeaturedPets, getFavoritePets } from '@/lib/actions/pets';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import type { CustomSession } from '@/lib/types';

export default async function Home() {
  const featuredPets = await getFeaturedPets();
  const session = (await getServerSession(
    authOptions
  )) as unknown as CustomSession;
  const favoritePets = session
    ? await getFavoritePets({ userId: session.user.id })
    : [];

  return (
    <div className="space-y-16 pb-16">
      {/* <SeedButton /> */}
      <Hero />
      <SearchBar />
      <FeaturedPets pets={featuredPets} favoriteIds={favoritePets} />
      {/* <Testimonials /> */}
      <CallToAction />

    </div>
  );
}
