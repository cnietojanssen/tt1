import { Link } from "wouter";
import { LogoIcon } from "@/assets/icons";
import { motion } from "framer-motion";
import { container, item } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 pt-16 pb-8 px-6 md:px-10 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          className="grid md:grid-cols-4 gap-10 mb-16"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div className="col-span-1 md:col-span-1" variants={item}>
            <Link href="/" className="flex items-center mb-6">
              <LogoIcon className="w-8 h-8 mr-3" />
              <span className="text-xl font-bold text-foreground">Tracking Table</span>
            </Link>
            <p className="text-gray-700 mb-6">
              Solución de fidelización gastronómica para restaurantes que quieren aumentar sus ventas.
            </p>
            <div className="flex space-x-4">
              {["facebook", "instagram", "linkedin", "twitter"].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 bg-foreground/5 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"
                  aria-label={`Visit our ${social}`}
                >
                  <i className={`fab fa-${social === "linkedin" ? "linkedin-in" : social}`}></i>
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-6">Empresa</h3>
            <ul className="space-y-4">
              {["Sobre nosotros", "Casos de éxito", "Blog", "Prensa", "Trabaja con nosotros"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-700 hover:text-brand transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-6">Producto</h3>
            <ul className="space-y-4">
              {["Características", "Precios", "Integraciones", "API", "Mapa de ruta"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-700 hover:text-brand transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={item}>
            <h3 className="text-lg font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-3 text-brand"></i>
                <span className="text-gray-700">Las condes, Santiago, Chile</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-envelope mt-1 mr-3 text-brand"></i>
                <span className="text-gray-700">info@trackingtable.com</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-phone-alt mt-1 mr-3 text-brand"></i>
                <span className="text-gray-700">+56 9 66751149</span>
              </li>
              <li>
                <a href="#" className="text-gray-700 hover:text-brand transition-colors flex items-center">
                  <i className="fas fa-headset mr-3 text-brand"></i>
                  <span>Soporte técnico</span>
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-700 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Tracking Table. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              {["Política de privacidad", "Términos y condiciones", "Cookies"].map((item) => (
                <a 
                  key={item}
                  href="#" 
                  className="text-gray-700 hover:text-brand text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
