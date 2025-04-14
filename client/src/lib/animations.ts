// Common animation variants for framer-motion
export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const item = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export const slideIn = (direction: "left" | "right" = "left") => ({
  hidden: { 
    opacity: 0, 
    x: direction === "left" ? -30 : 30
  },
  show: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8 } 
  }
});

export const stagger = (delayChildren: number = 0.1) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: delayChildren
    }
  }
});

export const scale = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 } 
  }
};
