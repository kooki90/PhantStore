
import MainLayout from '@/layouts/MainLayout';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import Testimonials from '@/components/Testimonials';
import DiscordCTA from '@/components/DiscordCTA';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <DiscordCTA />
    </MainLayout>
  );
};

export default Index;
