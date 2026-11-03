import AnnouncementTicker from "@/components/AnnouncementTicker";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import HowToPlaySection from "@/components/HowToPlaySection";
import GameCatalog from "@/components/GameCatalog";
import EventsSection from "@/components/EventsSection";
import MenuSection from "@/components/MenuSection";
import FaqSection from "@/components/FaqSection";
import LocationSection from "@/components/LocationSection";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import ScrollRevealManager from "@/components/ScrollRevealManager";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-clip">
      <ScrollRevealManager />
      <AnnouncementTicker />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <HowToPlaySection />
        <GameCatalog />
        <EventsSection />
        <MenuSection />
        <FaqSection />
        <LocationSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
