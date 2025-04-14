import { useState, useRef, useEffect } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useInView } from "@/hooks/use-intersection-observer";
import { Play, Star, Quote } from "lucide-react";
import logo1 from "@/assets/logos/logoipsum1.svg";
import logo2 from "@/assets/logos/logoipsum2.svg";
import logo3 from "@/assets/logos/logoipsum3.svg";
import logo4 from "@/assets/logos/logoipsum4.svg";
import logo5 from "@/assets/logos/logoipsum5.svg";
import logo6 from "@/assets/logos/logoipsum6.svg";
import logo7 from "@/assets/logos/logoipsum7.svg";
import logo8 from "@/assets/logos/logoipsum8.svg";
// Importar los videos
import video1 from "@/assets/videos/testimonio1.mp4";
import video2 from "@/assets/videos/testimonio2.mp4";
import video4 from "@/assets/videos/testimonio4.mp4";
import video5 from "@/assets/videos/testimonio5.mp4";
import poster1 from "@/assets/posters/poster1.png";
import poster2 from "@/assets/posters/poster2.png";
import poster3 from "@/assets/posters/poster3.png";
import poster4 from "@/assets/posters/poster4.png";
import poster5 from "@/assets/posters/poster5.png";



// Tipos para los testimonios
interface Testimonial {
  id: number;
  name: string;
  business: string;
  quote: string;
  image: string;
  rating: number;
  videoUrl?: string;
  poster?: string; 
}

// Tipos para los logos de restaurantes
interface RestaurantLogo {
  id: number;
  name: string;
  logoUrl: string;
}

// Componente de tarjeta de testimonio
function TestimonialCard({ testimonial, delay = 0 }: { testimonial: Testimonial; delay?: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mostrar video vertical si existe */}
{testimonial.videoUrl ? (
  <div className="w-full aspect-[9/16] bg-black overflow-hidden">
    <video
  src={testimonial.videoUrl}
  poster={testimonial.poster} // <-- esto es lo que falta
  className="w-full h-full object-cover"
  controls
  playsInline
  preload="metadata"
  style={{
    borderTopLeftRadius: '0.75rem',
    borderTopRightRadius: '0.75rem',
  }}
/>

  </div>
) : (
  <div className="aspect-square w-full overflow-hidden bg-gray-100">
    <img 
      src={testimonial.image} 
      alt={`${testimonial.name} de ${testimonial.business}`}
      className="w-full h-full object-cover"
    />
  </div>
)}

      
      {/* Si no hay video, solo mostramos la foto */}
      {!testimonial.videoUrl && testimonial.image && (
        <div className="aspect-square w-full overflow-hidden bg-gray-100">
          <img 
            src={testimonial.image} 
            alt={`${testimonial.name} de ${testimonial.business}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-6 flex-grow">
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={16} 
              className={i < testimonial.rating ? "text-brand fill-brand" : "text-gray-300"} 
            />
          ))}
        </div>
        
        <div className="mb-4 flex-grow">
          <Quote className="text-brand/30 w-8 h-8 mb-2" />
          <p className="text-gray-700 italic">{testimonial.quote}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-lg">{testimonial.name}</h4>
          <p className="text-gray-600">{testimonial.business}</p>
        </div>
      </div>

    </motion.div>
  );
}

// Componente de carrusel de logos
function LogoCarousel({ logos }: { logos: RestaurantLogo[] }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);
  
  // Duplicamos los logos para crear un efecto de desplazamiento infinito
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="w-full overflow-hidden py-8">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.8 } }
        }}
      >
        <div className="relative">
          <motion.div
            className="flex space-x-12"
            animate={{ x: [0, -50 * logos.length] }}
            transition={{
              x: {
                duration: 50,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear",
              }
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <motion.div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 h-12 md:h-16 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                whileHover={{ y: -5, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <img 
                  src={logo.logoUrl} 
                  alt={logo.name} 
                  className="max-h-full max-w-[120px]"
                  title={logo.name} // Para el tooltip en hover
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default function LocationMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);
  
  // Datos de testimonios (reemplazar con datos reales)
  // Luego en el array de testimonios:
  const testimonials: Testimonial[] = [
	{
	  id: 1,
	  name: "Felipe Jaramillo",
	  business: "Dueño Club Gordos",
	  quote: "Desde que implementamos Tracking Table, las visitas recurrentes aumentaron un 32%.",
	  image: "",
	  rating: 5,
	  videoUrl: video1,
	  poster: poster1
	},
	{
	  id: 2,
	  name: "Vicente",
	  business: "Pizza Slice y vinos",
	  quote: "Lo que más me gusta es la facilidad para crear campañas automáticas.",
	  image: "",
	  rating: 5,
	  videoUrl: video2,
	  poster: poster2
	},
	{
	  id: 3,
	  name: "Francisco",
	  business: "Dueño de Papanul Vegan",
	  quote: "Una solución simple que transforma la relación con los clientes.",
	  image: "",
	  rating: 5,
	  videoUrl: video4,
	  poster: poster4
	},
	{
	  id: 4,
	  name: "Jean Paul",
	  business: "Dueño de restaurantes en Perú",
	  quote: "Gracias a Tracking Table, fidelizamos sin fricción ni apps.",
	  image: "",
	  rating: 5,
	  videoUrl: video5,
	  poster: poster5
	},
  ];  
  
  // Datos de logos de restaurantes (reemplazar con datos reales)
  const restaurantLogos: RestaurantLogo[] = [
    { id: 1, name: "Cliente 1", logoUrl: logo1 },
    { id: 2, name: "Cliente 2", logoUrl: logo2 },
    { id: 3, name: "Cliente 3", logoUrl: logo3 },
    { id: 4, name: "Cliente 4", logoUrl: logo4 },
    { id: 5, name: "Cliente 5", logoUrl: logo5 },
    { id: 6, name: "Cliente 6", logoUrl: logo6 },
    { id: 7, name: "Cliente 7", logoUrl: logo7 },
    { id: 8, name: "Cliente 8", logoUrl: logo8 },
  ];
  
  

  return (
    <section id="testimonials" className="py-24 px-6 md:px-10 lg:px-16 bg-secondary/50">
      <div className="container mx-auto">
        {/* Sección de testimonios */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Restaurantes reales que están fidelizando más con Tracking Table</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">Conoce la experiencia de quienes ya mejoraron su relación con los clientes.</p>
        </motion.div>
        
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              delay={0.2 * index}
            />
          ))}
        </div>
        
        {/* Separador */}
        <div className="my-20">
          <motion.hr 
            className="border-gray-200"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
        
        {/* Sección de logos */}
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold">+1800 restaurantes ya confían en nosotros</h2>
        </motion.div>
        
        <LogoCarousel logos={restaurantLogos} />
        
        {/* Botón call-to-action */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 bg-brand text-white rounded-lg font-medium shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30 transition-all duration-300 transform hover:-translate-y-1"
          >
            ¿Quieres formar parte de esta comunidad?
          </a>
        </motion.div>
      </div>
    </section>
  );
}
