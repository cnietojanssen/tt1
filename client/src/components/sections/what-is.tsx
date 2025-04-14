import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";
import { useInView } from "@/hooks/use-intersection-observer";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div 
      className="card-hover bg-white p-8 rounded-2xl shadow-md"
      variants={item}
      transition={{ delay }}
    >
      <div className="w-16 h-16 bg-brand/10 rounded-lg flex items-center justify-center mb-6">
        <i className={`${icon} text-2xl text-brand`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}

export default function WhatIs() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const features = [
    {
      icon: "fas fa-qrcode",
      title: "Sistema QR inteligente",
      description: "Menús digitales con capacidad de tracking y personalización según el cliente."
    },
    {
      icon: "fas fa-wallet",
      title: "Digital Wallet",
      description: "Tarjetas de fidelidad digitales que se guardan automáticamente en Apple/Google Wallet."
    },
    {
      icon: "fas fa-bell",
      title: "Notificaciones Geo Push",
      description: "Alertas inteligentes basadas en ubicación para atraer clientes cercanos sin apps."
    }
  ];
  
  return (
    <section id="what-is" className="py-20 px-6 md:px-10 lg:px-16 bg-secondary/50">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Qué es <span className="text-brand">Tracking Table</span>?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">La plataforma de fidelización que conecta tu restaurante con los clientes de forma directa, sin fricción y con resultados inmediatos.</p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          className="grid md:grid-cols-3 gap-8 md:gap-6 lg:gap-10"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
