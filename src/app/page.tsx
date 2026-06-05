import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import FeaturedSolutions from "@/components/home/FeaturedSolutions";
import PortfolioSection from "@/components/home/PortfolioSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import TechStack from "@/components/home/TechStack";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesSection />
      <FeaturedSolutions />
      <PortfolioSection />
      <ProcessSection />
      <WhyChooseUs />
      <Testimonials />
      <TechStack />
      <CTASection />
    </>
  );
}
