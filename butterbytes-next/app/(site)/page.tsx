import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/CategorySection";
import FeaturedMenu from "@/components/home/FeaturedMenu";
import AboutSection from "@/components/home/AboutSection";
import WorksGallery from "@/components/home/WorksGallery";
import Testimonials from "@/components/home/Testimonials";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedMenu />
      <AboutSection />
      <WorksGallery />
      <Testimonials />
      <ContactSection />
    </>
  );
}
