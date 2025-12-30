import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PartnersCarousel from "@/components/PartnersCarousel";
import StatsAndCertifications from "@/components/StatsAndCertifications";
import WhoWeAre from "@/components/WhoWeAre";
import InsightCards from "@/components/InsightCards";
import WhyChooseUs from "@/components/WhyChooseUs";
import TransformBusinessCTA from "@/components/TransformBusinessCTA";
import ClientTestimonials from "@/components/ClientTestimonials";
import LatestInsights from "@/components/LatestInsights";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
    
      <Header />
      <HeroSection />
      <PartnersCarousel />
      <StatsAndCertifications />
      <WhoWeAre />
      <InsightCards title="Services We" highlightedWord="Provide" displayMode="carousel" />
      <WhyChooseUs />
      <TransformBusinessCTA />
      <ClientTestimonials />
      <LatestInsights />
      <ContactSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index; 