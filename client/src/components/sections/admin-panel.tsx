import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import dashboardImg from '../../assets/4.jpg';
import walletImg from '../../assets/3.png';
import registroImg from '../../assets/2.png';
import aparienciaImg from '../../assets/1.png';

interface AdminModuleProps {
  title: string;
  description: string;
  mockupSrc: string;
  isReversed?: boolean;
  index: number;
}

function AdminModule({ title, description, mockupSrc, isReversed = false, index }: AdminModuleProps) {
  const isMobile = useIsMobile();
  const moduleRef = React.useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={moduleRef}
      className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center my-20 ${
        isReversed && !isMobile ? "md:grid-flow-col" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: 0.1 * index }}
    >
      {/* Orden de los elementos según disposición y dispositivo */}
      <div className={isReversed && !isMobile ? "order-2" : ""}>
        <div className="laptop-mockup relative mx-auto w-full max-w-3xl">
          {/* Marco de la laptop */}
          <div className="relative bg-gray-900 rounded-t-lg p-2 pt-1">
            <div className="flex justify-center items-center h-6">
              <div className="w-2 h-2 rounded-full bg-gray-700 mx-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700 mx-0.5"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700 mx-0.5"></div>
            </div>
            <div className="bg-gray-200 overflow-hidden rounded">
              <img 
                src={mockupSrc} 
                alt={title} 
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
          {/* Base de la laptop */}
          <div className="h-4 bg-gradient-to-b from-gray-800 to-gray-900 rounded-b-lg relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-700 rounded-full"></div>
          </div>
          {/* Sombra */}
          <div className="absolute -bottom-3 inset-x-5 h-4 bg-black/10 blur-md rounded-full"></div>
        </div>
      </div>

      <div className={isReversed && !isMobile ? "order-1" : ""}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 * index }}
          className="p-6"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{title}</h3>
          <p className="text-lg text-gray-700 mb-6">{description}</p>
          
          <motion.div 
            className="w-16 h-1 bg-brand rounded"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 * index }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function AdminPanel() {
  // Datos de los módulos administrativos
  const adminModules = [
    {
      title: "Dashboard de Analytics",
      description: "Visualiza en tiempo real el total de clientes, edad promedio, nuevos leads y clientes activos. Toma decisiones basadas en datos.",
      mockupSrc: dashboardImg
    },
    {
      title: "Gestión de Fidelización & Wallet",
      description: "Administra programas de fidelización con sello digital, tarjetas virtuales y visualiza el progreso de cada cliente.",
      mockupSrc: walletImg
    },
    {
      title: "Panel de Registro de Clientes",
      description: "Genera enlaces, códigos QR o formularios para registrar nuevos clientes desde cualquier canal.",
      mockupSrc: registroImg
    },
    {
      title: "Edición de Apariencia y Marca",
      description: "Personaliza la experiencia visual del cliente con los colores, imágenes y textos de tu restaurante.",
      mockupSrc: aparienciaImg
    }
  ];
  
  return (
    <section id="admin-panel" className="py-24 px-6 md:px-10 lg:px-16 bg-gray-50">
      <div className="container mx-auto relative">
        {/* Encabezado de la sección */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Domina cada área de tu restaurante desde un solo panel
          </h2>
          <p className="text-lg text-gray-700">
            El dashboard administrativo de Tracking Table te permite controlar todos los aspectos de tu negocio de forma intuitiva y efectiva.
          </p>
        </motion.div>
        
        {/* Divisor */}
        <div className="relative h-16 my-8">
          <div className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>
        
        {/* Módulos administrativos */}
        <div className="space-y-20 md:space-y-32">
          {adminModules.map((module, index) => (
            <AdminModule
              key={index}
              title={module.title}
              description={module.description}
              mockupSrc={module.mockupSrc}
              isReversed={index % 2 !== 0}
              index={index}
            />
          ))}
        </div>
        
        {/* CTA final */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mt-24 pt-10 border-t border-gray-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">
            ¿Listo para controlar todo tu restaurante desde una sola plataforma?
          </h3>
          <Button asChild size="lg" className="btn-hover-effect shadow-lg shadow-brand/20">
            <a href="#contact">
              <span>Solicita tu demo gratuita</span>
              <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}