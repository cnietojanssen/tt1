import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Check } from "lucide-react";

interface PricingFeatureProps {
  children: React.ReactNode;
}

function PricingFeature({ children }: PricingFeatureProps) {
  return (
    <div className="flex items-center space-x-3 py-2">
      <div className="shrink-0 rounded-full bg-brand/10 p-1 text-brand">
        <Check size={16} />
      </div>
      <span className="text-gray-700">{children}</span>
    </div>
  );
}

interface BenefitItemProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

function BenefitItem({ icon, title, description, delay = 0 }: BenefitItemProps) {
  return (
    <motion.div 
      className="border border-gray-100 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-brand text-2xl mb-4">
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

export default function Pricing() {
  const isMobile = useIsMobile();
  
  // Datos de los beneficios
  const benefits = [
    {
      icon: "fa-brain",
      title: "2 sesiones semanales EN VIVO",
      description: "Implementación guiada paso a paso y asesoría en marketing digital."
    },
    {
      icon: "fa-users",
      title: "Acceso a la comunidad exclusiva de WhatsApp 24/7",
      description: "Soporte instantáneo, conexión con otros emprendedores y dudas en tiempo real."
    },
    {
      icon: "fa-book",
      title: "Acceso a todos los cursos disponibles",
      description: "Aprende a crecer tu restaurante digitalmente, desde cero hasta escalarlo."
    },
    {
      icon: "fa-database",
      title: "Construcción de base de datos y CRM",
      description: "Convierte clientes en contactos fidelizados que vuelven una y otra vez."
    },
    {
      icon: "fa-wallet",
      title: "Wallets infinitas",
      description: "Crea todas las tarjetas de fidelización que necesites para cada sucursal o campaña."
    },
    {
      icon: "fa-comment-dots",
      title: "Marketing automatizado vía WhatsApp & Email",
      description: "Campañas, recordatorios, promociones y más desde un solo lugar."
    }
  ];
  
  return (
    <section id="pricing" className="py-24 px-6 md:px-10 lg:px-16 bg-gray-50">
      <div className="container mx-auto">
        {/* Encabezado */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Planes simples, resultados extraordinarios
          </h2>
          <p className="text-lg text-gray-700">
            Elige el plan que mejor se adapte a tus necesidades y comienza a transformar la experiencia digital de tu restaurante.
          </p>
        </motion.div>
        
        {/* Tarjetas de precios */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Plan Local Único */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 pb-6 border-b border-gray-100">
              <span className="inline-block bg-brand/10 text-brand rounded-full px-3 py-1 text-xs font-semibold mb-4">
                Para restaurantes individuales
              </span>
              <h3 className="text-2xl font-bold mb-2">Plan Local Único</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$67</span>
                <span className="text-gray-600 ml-2">USD/mes</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Perfecto para restaurantes individuales que buscan digitalizar su experiencia.
              </p>
              <Button asChild size="lg" className="w-full btn-hover-effect shadow-lg shadow-brand/20">
                <a href="#contact">
                  <span>Comenzar ahora</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </a>
              </Button>
            </div>
            <div className="p-8 bg-gray-50 flex-grow">
              <h4 className="font-semibold mb-4">Todo lo que incluye:</h4>
              <div className="space-y-1">
                <PricingFeature>1 restaurante</PricingFeature>
                <PricingFeature>Acceso total a Tracking Table</PricingFeature>
                <PricingFeature>Panel completo y menú digital</PricingFeature>
                <PricingFeature>Wallets ilimitadas</PricingFeature>
                <PricingFeature>Email y WhatsApp marketing</PricingFeature>
                <PricingFeature>Notificaciones GeoPush</PricingFeature>
                <PricingFeature>Soporte en comunidad 24/7</PricingFeature>
              </div>
            </div>
          </motion.div>
          
          {/* Plan Multi-Sucursal */}
          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Etiqueta Popular */}
            <div className="absolute top-0 right-0">
              <div className="bg-brand text-white text-xs font-bold px-3 py-1 transform rotate-45 translate-x-[20%] translate-y-[60%] shadow-md">
                POPULAR
              </div>
            </div>
            
            <div className="p-8 pb-6 border-b border-gray-100">
              <span className="inline-block bg-indigo-100 text-indigo-800 rounded-full px-3 py-1 text-xs font-semibold mb-4">
                Para cadenas de restaurantes
              </span>
              <h3 className="text-2xl font-bold mb-2">Plan Multi-Sucursal</h3>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">$97</span>
                <span className="text-gray-600 ml-2">USD/mes</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">
                Ideal para restaurantes con múltiples sucursales que necesitan centralizar su estrategia digital.
              </p>
              <Button asChild size="lg" variant="outline" className="w-full btn-hover-effect hover:bg-indigo-50 border-indigo-200">
                <a href="#contact">
                  <span>Solicitar demo personalizada</span>
                  <i className="fas fa-headset ml-2 text-indigo-500"></i>
                </a>
              </Button>
            </div>
            <div className="p-8 bg-gray-50 flex-grow">
              <h4 className="font-semibold mb-4">Todo lo que incluye:</h4>
              <div className="space-y-1">
                <PricingFeature>Hasta 3 locales</PricingFeature>
                <PricingFeature>Acceso total a todas las funciones</PricingFeature>
                <PricingFeature>Gestión multi-sucursal desde un solo panel</PricingFeature>
                <PricingFeature>Wallets ilimitadas</PricingFeature>
                <PricingFeature>Email y WhatsApp marketing</PricingFeature>
                <PricingFeature>Notificaciones GeoPush</PricingFeature>
                <PricingFeature>Soporte en comunidad 24/7</PricingFeature>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Bloque de beneficios adicionales */}
        <div className="mt-24">
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Beneficios que te acompañan
          </motion.h3>
          <motion.p 
            className="text-gray-700 text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Además de la tecnología, contarás con un equipo de soporte y una comunidad para acompañarte en cada paso.
          </motion.p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitItem
                key={index}
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
        
        {/* CTA para empresas */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg font-medium mb-6">¿Tienes más de 3 locales o un proyecto especial?</p>
          <Button asChild size="lg" className="btn-hover-effect shadow-lg shadow-brand/20">
            <a href="#contact">
              <span>Solicita una demo personalizada para empresas</span>
              <i className="fas fa-building ml-2"></i>
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}