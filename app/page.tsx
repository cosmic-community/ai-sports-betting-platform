import { getSiteSettings, getBlogPosts, getBettingPicks, getFeaturedTestimonials } from '@/lib/cosmic';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import RecentPicks from '@/components/RecentPicks';
import BlogPreview from '@/components/BlogPreview';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import ExitIntentModal from '@/components/ExitIntentModal';

export default async function HomePage() {
  const [siteSettings, blogPosts, bettingPicks, testimonials] = await Promise.all([
    getSiteSettings(),
    getBlogPosts(3),
    getBettingPicks(5),
    getFeaturedTestimonials(3)
  ]);

  if (!siteSettings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Header siteSettings={siteSettings} />
      <Hero siteSettings={siteSettings} />
      <Features />
      <RecentPicks picks={bettingPicks} />
      <BlogPreview posts={blogPosts} />
      <Testimonials testimonials={testimonials} />
      <Pricing siteSettings={siteSettings} />
      <FAQ />
      <Footer />
      <FloatingCTA siteSettings={siteSettings} />
      <ExitIntentModal siteSettings={siteSettings} />
    </main>
  );
}