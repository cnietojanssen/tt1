import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { useInView } from "@/hooks/use-intersection-observer";

interface BenefitCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

function BenefitCard({ icon, title, description, delay = 0 }: BenefitCardProps) {
  return (
    <motion.div 
      className="card-hover bg-white p-8 rounded-2xl shadow-md" 
      variants={item}
      transition={{ delay }}
    >
      <div className="w-14 h-14 bg-brand/10 rounded-lg flex items-center justify-center mb-6">
        <i className={`${icon} text-2xl text-brand`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}

export default function Benefits() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const benefits = [
    {
      icon: "fas fa-chart-line",
      title: "Aumenta visitas",
      description: "Incrementa hasta un 30% las visitas recurrentes con un sistema de fidelización efectivo."
    },
    {
      icon: "fas fa-robot",
      title: "Automatiza promociones",
      description: "Crea y gestiona campañas de marketing automáticas basadas en el comportamiento del cliente."
    },
    {
      icon: "fas fa-mobile-alt",
      title: "Sin apps",
      description: "Todo funciona sin necesidad de que tus clientes descarguen aplicaciones adicionales."
    },
    {
      icon: "fas fa-comment-dots",
      title: "Recoge feedback",
      description: "Obtén opiniones y valoraciones en tiempo real para mejorar constantemente."
    },
    {
      icon: "fas fa-chart-pie",
      title: "Estadísticas en tiempo real",
      description: "Dashboard completo con métricas clave para la toma de decisiones informadas."
    },
    {
      icon: "fab fa-whatsapp",
      title: "Integra WhatsApp",
      description: "Conecta con tus clientes a través del canal de comunicación más utilizado."
    }
  ];
  
  return (
    <section id="benefits" className="py-20 px-6 md:px-10 lg:px-16 bg-secondary/30">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Beneficios para tu restaurante</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">Potencia tu negocio y aumenta tus ingresos con herramientas diseñadas específicamente para la industria gastronómica.</p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
