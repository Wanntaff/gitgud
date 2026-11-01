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
import MobileQuickBar from "@/components/MobileQuickBar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <AnnouncementTicker />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <HowToPlaySection />
      <GameCatalog />
      <EventsSection />
      <MenuSection />
      <FaqSection />
      <LocationSection />
      <CtaBanner />
      <Footer />
      <MobileQuickBar />
    </main>
  );
}
