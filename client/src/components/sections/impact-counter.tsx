import { motion } from "framer-motion";
import { useCounter } from "@/hooks/use-counter";
import { useInView } from "@/hooks/use-intersection-observer";

interface CounterItemProps {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

function CounterItem({ end, label, prefix = "+", suffix = "", delay = 0 }: CounterItemProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const value = useCounter({ end, duration: 2, start: 0, enabled: inView });
  
  // Format numbers according to size
  const formattedValue = () => {
    if (end >= 1000000) {
      return `${prefix}${Math.floor(value / 1000000)}M`;
    } else if (end >= 1000) {
      return `${prefix}${Math.floor(value / 1000)}.${Math.floor((value % 1000) / 10)}k`;
    }
    return `${prefix}${Math.floor(value)}`;
  };
  
  return (
    <motion.div 
      ref={ref}
      className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
    >
      <div className="text-brand text-4xl lg:text-6xl font-bold mb-2">{formattedValue()}{suffix}</div>
      <p className="text-lg text-gray-300">{label}</p>
    </motion.div>
  );
}

export default function ImpactCounter() {
  const counters = [
    { end: 1856, label: "restaurantes afiliados" },
    { end: 92000, label: "clientes activos" },
    { end: 24000000, label: "en ventas generadas", suffix: "" },
  ];
  
  return (
    <section className="py-16 px-6 md:px-10 lg:px-16 bg-foreground text-white">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Impactómetro</h2>
          <p className="text-lg text-gray-300">Resultados reales de restaurantes que confían en Tracking Table</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {counters.map((counter, index) => (
            <CounterItem
              key={index}
              end={counter.end}
              label={counter.label}
              suffix={counter.suffix}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
