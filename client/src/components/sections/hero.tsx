import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-intersection-observer";
import heroimg from '../../assets/heroimg3.png'


export default function Hero() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.2 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3,
      }
    }
  };
  
  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }
    }
  };
  
  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9], delay: 0.3 }
    }
  };
  
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-10 lg:px-16 overflow-hidden">
      <div className="container mx-auto">
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={childVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              El software gastronómico todo en uno que impulsa tus ventas y digitaliza tu restaurante
            </h1>
            <p className="text-lg md:text-xl font-semibold text-brand mb-4">
              En Tracking Table hacemos que tu restaurante venda hasta un 30% más en los próximos 2 meses
            </p>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Fidelización, menú digital, analytics, WhatsApp marketing, empleados y más. Todo desde una sola plataforma.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="btn-hover-effect shadow-lg shadow-brand/20">
                <a href="#contact">
                  <span>Solicita una demo</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="btn-hover-effect">
                <a href="#how-it-works">
                  <span>Ver cómo funciona</span>
                  <i className="fas fa-play ml-2 text-brand"></i>
                </a>
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            className="relative"
            variants={mockupVariants}
            whileHover={{ 
              scale: 1.03, 
              rotateY: -5, 
              rotateX: 5,
              transition: { duration: 0.5 }
            }}
          >
            <div className="absolute -right-16 -top-16 bg-brand/10 w-64 h-64 rounded-full blur-3xl"></div>
            <div className="absolute -left-8 -bottom-8 bg-secondary w-48 h-48 rounded-full blur-xl"></div>
            <motion.img
              src={heroimg}
              alt="Smartphone con aplicación Tracking Table" 
              className="relative z-10 w-full max-w-[1200px] mx-auto rounded-3xl"
              loading="eager"
            />
            <div className="absolute inset-0 z-20 border-8 border-white/20 rounded-3xl"></div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary rounded-bl-full opacity-70"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-brand/10 rounded-full"></div>
      <div className="absolute top-1/3 left-0 w-24 h-24 bg-brand/5 rounded-full"></div>
    </section>
  );
}
