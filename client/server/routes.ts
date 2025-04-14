import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Contact form schema
const contactSchema = z.object({
  name: z.string().min(2),
  restaurant: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  message: z.string().optional(),
  marketing: z.boolean().default(false),
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate form data
      const validatedData = contactSchema.parse(req.body);
      
      // Here you would typically save the data to a database
      // Since we're using in-memory storage, we'll just log it
      console.log("Contact form submission:", validatedData);
      
      // Send success response
      res.status(200).json({ 
        success: true, 
        message: "Formulario recibido correctamente" 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(400).json({ 
        success: false, 
        message: "Error en la validación del formulario" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
