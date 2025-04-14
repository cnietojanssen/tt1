import { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FloatWhatsapp from "@/components/ui/float-whatsapp";
import Hero from "@/components/sections/hero";
import ImpactCounter from "@/components/sections/impact-counter";
import WalletSimulator from "@/components/sections/wallet-simulator";
import AdminPanel from "@/components/sections/admin-panel";
import Pricing from "@/components/sections/pricing";
import LocationMap from "@/components/sections/location-map";
import UserJourney from "@/components/sections/user-journey";
import ContactForm from "@/components/sections/contact-form";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  useEffect(() => {
    document.title = "Tracking Table - Fidelización gastronómica para restaurantes";
    
    const metaDescription = document.createElement("meta");
    metaDescription.name = "description";
    metaDescription.content = "Tracking Table - Fideliza a tus clientes de restaurante con QR + Wallet + Notificaciones sin que descarguen apps.";
    document.head.appendChild(metaDescription);
    
    return () => {
      document.head.removeChild(metaDescription);
    };
  }, []);

  return (
    <AnimatePresence>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <AdminPanel />
          <UserJourney />
          <ImpactCounter />
          <WalletSimulator />
          <Pricing />
          <LocationMap />
          <ContactForm />
        </main>
        <Footer />
        <FloatWhatsapp />
      </div>
    </AnimatePresence>
  );
}
