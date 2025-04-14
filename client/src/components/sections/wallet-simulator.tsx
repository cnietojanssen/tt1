import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

export default function WalletSimulator() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const walletVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
    }
  };
  
  const checkItems = [
    "Integración automática con Apple Wallet y Google Wallet",
    "Actualización dinámica de beneficios y promociones",
    "Notificaciones basadas en geolocalización",
    "Personalización con tu marca y colores corporativos",
  ];
  
  return (
    <section className="py-20 px-6 md:px-10 lg:px-16">
      <div className="container mx-auto">
        <div ref={ref} className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <motion.div 
            className="lg:w-1/2"
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Digital Wallet sin fricción</h2>
            <p className="text-lg text-gray-700 mb-6">
              Tus clientes guardan tu tarjeta de fidelidad en su wallet con un solo clic. Sin descargas, sin registros, sin complicaciones.
            </p>
            <ul className="space-y-4 mb-8">
              {checkItems.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 + (index * 0.1), duration: 0.5 }}
                >
                  <div className="w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mt-1 mr-3">
                    <i className="fas fa-check text-sm text-brand"></i>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.li>
              ))}
            </ul>
            <Button className="btn-hover-effect shadow-lg shadow-brand/20">
              <span>Ver demostración</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </Button>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 relative"
            variants={walletVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ 
              scale: 1.03, 
              rotateY: -5, 
              rotateX: 5,
              transition: { duration: 0.5 }
            }}
          >
            <div className="relative mx-auto max-w-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-purple-400/10 rounded-3xl blur-xl animate-pulse"></div>
              <div className="relative bg-foreground rounded-3xl overflow-hidden shadow-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-white font-bold text-lg">La Trattoria</div>
                    <div className="text-white/70 text-sm">Tarjeta de Fidelidad</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <i className="fas fa-utensils text-white"></i>
                  </div>
                </div>
                
                <div className="bg-brand/90 text-white p-4 rounded-lg mb-4">
                  <div className="text-sm font-medium mb-1">Tu beneficio activo:</div>
                  <div className="text-xl font-bold">2x1 en cocktails (Lun-Jue)</div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="flex justify-between text-white/80 text-sm mb-3">
                    <span>Visitas:</span>
                    <span>3 de 5</span>
                  </div>
                  <div className="w-full bg-white/20 h-3 rounded-full">
                    <motion.div 
                      className="bg-brand h-3 rounded-full"
                      initial={{ width: "0%" }}
                      animate={inView ? { width: "60%" } : { width: "0%" }}
                      transition={{ duration: 1, delay: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-white/70 text-sm">
                  <div>
                    <i className="fas fa-map-marker-alt mr-1"></i>
                    <span>Calle Gourmet 123, Madrid</span>
                  </div>
                  <div>
                    <i className="fas fa-clock mr-1"></i>
                    <span>Válido hasta: 30/12/2023</span>
                  </div>
                </div>
                
                <div className="absolute bottom-3 right-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.59 12.8906L9.59 23.8906C9.3 24.1806 8.91 24.1806 8.62 23.8906L3.38 18.6506C3.09 18.3606 3.09 17.9706 3.38 17.6806L4.62 16.4406C4.91 16.1506 5.3 16.1506 5.59 16.4406L9 19.8506L18.18 10.6706C18.47 10.3806 18.86 10.3806 19.15 10.6706L20.39 11.9106C20.68 12.2006 20.68 12.6006 20.59 12.8906ZM13 7.00063H7C6.45 7.00063 6 6.55063 6 6.00063V0.000628471C6 -0.549372 6.45 -0.999372 7 -0.999372H13C13.55 -0.999372 14 -0.549372 14 0.000628471V6.00063C14 6.55063 13.55 7.00063 13 7.00063ZM12 2.00063H8V5.00063H12V2.00063Z" fill="white" fillOpacity="0.5"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
