import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LogoIcon } from "@/assets/icons";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClick = () => {
      if (mobileMenuOpen) setMobileMenuOpen(false);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [mobileMenuOpen]);

  const navbarVariants = {
    transparent: {
      backgroundColor: "rgba(255, 255, 255, 0)",
      boxShadow: "none",
      padding: "1rem 0",
    },
    solid: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      padding: "0.75rem 0",
    },
  };

  const navLinks = [
    { href: "#", label: "Inicio" },
    { href: "#admin-panel", label: "Funcionalidades" },
    { href: "#user-journey", label: "Experiencia del Cliente" },
    { href: "#pricing", label: "Planes" },
    { href: "#testimonials", label: "Testimonios" },
    { href: "#contact", label: "Demo" },
  ];

  return (
    <motion.nav
      initial="transparent"
      animate={isScrolled ? "solid" : "transparent"}
      variants={navbarVariants}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-10 lg:px-16"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center z-10">
          <LogoIcon className="w-8 h-8 mr-3" />
          <span className="text-xl font-bold text-foreground">Tracking Table</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="font-medium text-foreground hover:text-brand transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div>
          <Button asChild className="hidden md:inline-flex btn-hover-effect shadow-lg shadow-brand/20">
            <a href="#contact">Solicitar demo</a>
          </Button>
          
          <button 
            className="md:hidden text-foreground z-10"
            onClick={(e) => {
              e.stopPropagation();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16" 
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          className="md:hidden absolute top-0 left-0 right-0 bg-white p-4 pt-20 shadow-lg z-0"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className="font-medium py-2 px-4 text-foreground hover:text-brand transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="mt-4 btn-hover-effect shadow-lg shadow-brand/20">
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Solicitar demo</a>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
