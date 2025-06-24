import Hero from '@/components/home/hero';
import FeaturedPets from '@/components/home/featured-pets';
import SearchBar from '@/components/home/search-bar';
// import Testimonials from '@/components/home/testimonials';
import CallToAction from '@/components/home/call-to-action';
import { getFeaturedPets } from '@/lib/actions/pets';

export default async function Home() {
  const featuredPets = await getFeaturedPets();

  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <SearchBar />
      <FeaturedPets pets={featuredPets} />
      {/* <Testimonials /> */}
      <CallToAction />
    </div>
  );
}
