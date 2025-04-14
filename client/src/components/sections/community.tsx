import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-intersection-observer";
import { Button } from "@/components/ui/button";

interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

function FeatureItem({ icon, title, description, delay = 0 }: FeatureItemProps) {
  return (
    <motion.div 
      className="flex"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="w-12 h-12 rounded-lg bg-brand/20 flex items-center justify-center mr-4 shrink-0">
        <i className={`${icon} text-brand`}></i>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
}

export default function Community() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  
  const features = [
    {
      icon: "fas fa-users",
      title: "Networking exclusivo",
      description: "Conecta con otros restauradores y expertos del sector."
    },
    {
      icon: "fas fa-lightbulb",
      title: "Recursos premium",
      description: "Accede a guías, webinars y contenido exclusivo."
    },
    {
      icon: "fas fa-crown",
      title: "Beneficios especiales",
      description: "Descuentos y funcionalidades anticipadas para miembros."
    }
  ];
  
  return (
    <section id="community" className="py-20 px-6 md:px-10 lg:px-16 bg-foreground text-white">
      <div className="container mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Únete al Club Tracking Table</h2>
            <p className="text-lg text-gray-300 mb-8">
              Comunidad privada de dueños de restaurantes que quieren escalar sus ventas y compartir estrategias exitosas.
            </p>
            <div className="space-y-6 mb-8">
              {features.map((feature, index) => (
                <FeatureItem
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={0.3 + (index * 0.2)}
                />
              ))}
            </div>
            <Button asChild className="btn-hover-effect shadow-lg shadow-brand/20">
              <a 
                href="https://wa.me/?text=Hola,+quiero+unirme+al+Club+Tracking+Table+para+conectar+con+otros+restauradores." 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp mr-2 text-xl"></i>
                <span>Acceder a la comunidad</span>
              </a>
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/30 to-purple-500/20 blur-2xl opacity-70"></div>
              <img 
                src="https://images.unsplash.com/photo-1607437817932-3bf846a2be93?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" 
                alt="Comunidad de restauradores" 
                className="w-full h-auto rounded-2xl relative z-10 shadow-2xl"
                loading="lazy"
              />
              
              {/* Overlay with testimonial */}
              <motion.div 
                className="absolute bottom-6 left-6 right-6 bg-foreground/80 backdrop-blur-sm p-6 rounded-xl shadow-lg z-20"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-start">
                  <i className="fas fa-quote-left text-brand text-4xl mr-4"></i>
                  <div>
                    <p className="text-white/90 mb-4">"Desde que nos unimos al Club Tracking Table, nuestras ventas han aumentado un 25% y hemos conocido dueños de restaurantes que se han convertido en aliados estratégicos."</p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-user text-brand"></i>
                      </div>
                      <div>
                        <div className="font-bold text-white">Carlos Rodríguez</div>
                        <div className="text-sm text-white/70">Dueño de El Rincón Gourmet</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
