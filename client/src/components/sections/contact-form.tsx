import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/use-intersection-observer";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

// Form schema
const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  restaurant: z.string().min(2, { message: "El nombre del restaurante es requerido." }),
  email: z.string().email({ message: "Por favor, introduce un email válido." }),
  phone: z.string().min(9, { message: "El número de teléfono debe tener al menos 9 dígitos." }),
  message: z.string().optional(),
  marketing: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      restaurant: "",
      email: "",
      phone: "",
      message: "",
      marketing: false,
    },
  });
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Solicitud enviada con éxito",
        description: "Nos pondremos en contacto contigo pronto para coordinar la demo.",
      });
      
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contact"] });
    } catch (error) {
      toast({
        title: "Error al enviar el formulario",
        description: "Por favor, inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };
  
  const formVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, delay: 0.3, ease: "easeOut" }
    }
  };
  
  const checkItems = [
    "Demostración personalizada de 30 minutos",
    "Análisis de tu situación actual",
    "Propuesta adaptada a tu restaurante",
    "Sin compromiso ni presión comercial",
  ];
  
  return (
    <section id="contact" className="py-20 px-6 md:px-10 lg:px-16">
      <div className="container mx-auto">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={contentVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Solicita una demo personalizada</h2>
            <p className="text-lg text-gray-700 mb-8">
              Descubre cómo Tracking Table puede ayudar a tu restaurante a aumentar sus ventas con una demostración adaptada a tus necesidades.
            </p>
            
            <div className="space-y-4 mb-8">
              {checkItems.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.5 + (index * 0.1), duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center mr-4">
                    <i className="fas fa-check text-brand"></i>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="flex items-center p-4 bg-secondary rounded-lg"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <i className="fas fa-shield-alt text-brand mr-3"></i>
              <p className="text-sm text-gray-700">Tus datos están protegidos. No compartimos tu información con terceros.</p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            variants={formVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-md">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700">Nombre y Apellido</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ej. Carlos Rodríguez" 
                          className="px-4 py-3 rounded-lg border transition-all"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="restaurant"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700">Nombre del Restaurante</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Ej. El Rincón Gourmet" 
                          className="px-4 py-3 rounded-lg border transition-all"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="tu@email.com" 
                            className="px-4 py-3 rounded-lg border transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">Teléfono</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="+34 600 000 000" 
                            className="px-4 py-3 rounded-lg border transition-all"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-sm font-medium text-gray-700">¿Qué te gustaría saber?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Cuéntanos sobre tu restaurante y qué te interesa conocer..." 
                          className="px-4 py-3 rounded-lg border transition-all"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="marketing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-700">
                          Acepto recibir información sobre Tracking Table y entiendo que puedo darme de baja en cualquier momento.
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full btn-hover-effect shadow-lg shadow-brand/20 py-3.5 rounded-lg font-medium text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </span>
                  ) : (
                    "Solicitar demo gratuita"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
