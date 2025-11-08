import Header from "@/components/layout/Header";
import SiteFooter from "@/components/layout/SiteFooter";
import Hero from "@/components/home/Hero";
import ValueProps from "@/components/home/ValueProps";
import PlannerPreview from "@/components/home/PlannerPreview";
import RecipeGrid from "@/components/home/RecipeGrid";
import Testimonials from "@/components/home/Testimonials";
import Pricing from "@/components/home/Pricing";
import FAQ from "@/components/home/FAQ";
import MealMateCarousel from "@/components/ui/MealMateCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0E0F11] text-[#F9FAFB] scroll-smooth">
      <Header />
      <MealMateCarousel />
      <Hero />
      <ValueProps />
      <PlannerPreview />
      <RecipeGrid />
      <Testimonials />
      <Pricing />
      <FAQ />
      <SiteFooter />
    </div>
  );
}
