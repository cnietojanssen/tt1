import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import qrScan from "@/assets/userjourney/qr-scan.png";
import menuDigital from "@/assets/userjourney/menu-digital.png";
import walletUnion from "@/assets/userjourney/wallet-union.png";
import geoPush from "@/assets/userjourney/geo-push.png";
import beneficioCanjeado from "@/assets/userjourney/beneficio-canjeado.png";

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  mockupSrc: string;
}

export default function UserJourney() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Journey steps - mockup images are placeholder images that should be replaced
  const journeySteps: JourneyStep[] = [
    {
      id: 1,
      title: "Escaneo del QR",
      description: "Escanea el código QR desde la mesa del restaurante",
      mockupSrc: qrScan
    },
    {
      id: 2,
      title: "Menú digital",
      description: "Accede al menú completo sin descargar ninguna app",
      mockupSrc: menuDigital
    },
    {
      id: 3,
      title: "Unión al Wallet",
      description: "Agrega tu tarjeta con beneficios en Apple o Google Wallet",
      mockupSrc: walletUnion
    },
    {
      id: 4,
      title: "Notificación geo-push",
      description: "Recibe recordatorios automáticos cuando estás cerca del local",
      mockupSrc: geoPush
    },
    {
      id: 5,
      title: "Beneficio canjeado",
      description: "Canjea tu promoción y gana puntos cada vez que vuelves",
      mockupSrc: beneficioCanjeado
    }
  ];
  
  // Scroll to current index on desktop
  useEffect(() => {
    if (!isMobile && carouselRef.current) {
      const scrollAmount = currentIndex * 340; // Approximate width of each card including margins
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, isMobile]);
  
  // Handle navigation
  const goToPrevious = () => {
    setCurrentIndex(current => (current === 0 ? journeySteps.length - 1 : current - 1));
  };
  
  const goToNext = () => {
    setCurrentIndex(current => (current === journeySteps.length - 1 ? 0 : current + 1));
  };

  // Handle scroll synchronization with pagination
  const handleScroll = () => {
    if (isMobile && carouselRef.current) {
      const scrollPosition = carouselRef.current.scrollLeft;
      const cardWidth = 300; // Approximate
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < journeySteps.length) {
        setCurrentIndex(newIndex);
      }
    }
  };
  
  return (
    <section id="user-journey" className="py-24 px-6 md:px-10 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        {/* Encabezado de sección */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Así vive tu cliente la experiencia Tracking Table</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Desde el escaneo del QR hasta el uso del beneficio, todo sin apps.
          </p>
        </motion.div>
        
        {/* Carrusel de mockups */}
        <div className="relative">
          {/* Controles de navegación - solo en desktop */}
          {!isMobile && (
            <>
              <button 
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-brand transition-colors hidden md:flex"
                aria-label="Anterior paso"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 bg-white shadow-lg rounded-full p-3 text-gray-600 hover:text-brand transition-colors hidden md:flex"
                aria-label="Siguiente paso"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}
          
          {/* Carrusel horizontal */}
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={handleScroll}
          >
            {journeySteps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="shrink-0 px-3 md:px-5 w-[300px] md:w-[320px] snap-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col items-center p-5 h-full">
                  {/* Espacio para insertar mockup */}
                  <div className="w-full mb-6 relative">
                    <div className="mx-auto w-[220px] h-[380px] rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                      <img 
                        src={step.mockupSrc} 
                        alt={`Paso ${step.id}: ${step.title}`}
                        className="w-full h-full object-cover object-center"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  {/* Información del paso */}
                  <h3 className="text-lg font-bold text-center mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-center text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Indicadores de paginación */}
          <div className="flex justify-center space-x-2 mt-6">
            {journeySteps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'bg-brand w-6' : 'bg-gray-300'
                }`}
                aria-label={`Ir al paso ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Los estilos para scrollbar-hide ahora están en index.css */}
    </section>
  );
}