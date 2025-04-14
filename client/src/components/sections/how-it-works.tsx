import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "@/hooks/use-intersection-observer";

interface TimelineItemProps {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  isReversed?: boolean;
  isActive: boolean;
  onInView: () => void;
}

function TimelineItem({
  number,
  title,
  description,
  imageSrc,
  isReversed = false,
  isActive,
  onInView
}: TimelineItemProps) {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const controls = useAnimation();
  
  useEffect(() => {
    if (inView) {
      onInView();
      controls.start("visible");
    }
  }, [inView, onInView, controls]);
  
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
  };
  
  return (
    <div ref={ref} className={`flex flex-col md:flex-row md:items-center md:justify-between mb-16 md:mb-20 ${isActive ? "opacity-100" : "opacity-50"} transition-opacity duration-500`}>
      {/* Left side (text or image depending on isReversed) */}
      <div className={`md:w-5/12 order-2 ${isReversed ? 'md:order-3' : 'md:order-1'} mt-6 md:mt-0 ${isReversed ? 'md:pl-8' : 'md:pr-8'}`}>
        {isReversed ? (
          <motion.div 
            className="bg-secondary rounded-2xl p-4 card-hover"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          >
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full rounded-xl"
              loading="lazy"
            />
          </motion.div>
        ) : (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-lg text-gray-700">{description}</p>
          </motion.div>
        )}
      </div>
      
      {/* Number in the middle */}
      <div className="md:w-2/12 order-1 md:order-2 flex justify-center">
        <motion.div 
          className="w-14 h-14 bg-brand text-white rounded-full flex items-center justify-center shadow-lg shadow-brand/20 z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isActive ? 1.1 : 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-bold text-xl">{number}</span>
        </motion.div>
      </div>
      
      {/* Right side (image or text depending on isReversed) */}
      <div className={`md:w-5/12 order-3 ${isReversed ? 'md:order-1' : 'md:order-3'} mt-6 md:mt-0 ${isReversed ? 'md:pr-8' : 'md:pl-8'}`}>
        {isReversed ? (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={controls}
          >
            <h3 className="text-2xl font-bold mb-3">{title}</h3>
            <p className="text-lg text-gray-700">{description}</p>
          </motion.div>
        ) : (
          <motion.div 
            className="bg-secondary rounded-2xl p-4 card-hover"
            variants={imageVariants}
            initial="hidden"
            animate={controls}
          >
            <img 
              src={imageSrc} 
              alt={title}
              className="w-full rounded-xl"
              loading="lazy"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  const steps = [
    {
      number: 1,
      title: "Escanea el QR",
      description: "El cliente escanea el código QR único de tu mesa o restaurante con su smartphone.",
      imageSrc: "https://images.unsplash.com/photo-1583343492511-111aa8c3c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      number: 2,
      title: "Ve el menú digital",
      description: "Accede a tu carta digital interactiva con recomendaciones personalizadas.",
      imageSrc: "https://images.unsplash.com/photo-1569420067112-9a321cf4481d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      number: 3,
      title: "Guarda Wallet con beneficios",
      description: "Con un clic, la tarjeta de fidelidad se guarda automáticamente en su wallet digital.",
      imageSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      number: 4,
      title: "Recibe notificaciones geo push",
      description: "Cuando el cliente pasa cerca de tu local, recibe avisos con ofertas personalizadas.",
      imageSrc: "https://images.unsplash.com/photo-1582487809640-9706ffcf6537?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
    {
      number: 5,
      title: "Regresa por más",
      description: "El cliente vuelve atraído por los beneficios personalizados y el reconocimiento.",
      imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    },
  ];
  
  return (
    <section id="how-it-works" className="py-20 px-6 md:px-10 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Cómo funciona?</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">Un proceso simple y efectivo para fidelizar a tus clientes sin fricción.</p>
        </motion.div>
        
        <div ref={ref} className="relative">
          {/* Timeline line */}
          <motion.div 
            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-secondary hidden md:block"
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
          
          {/* Timeline items */}
          <div className="timeline-container">
            {steps.map((step, index) => (
              <TimelineItem
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
                imageSrc={step.imageSrc}
                isReversed={index % 2 !== 0}
                isActive={activeStep === step.number}
                onInView={() => setActiveStep(step.number)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
