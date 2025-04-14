import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Phone, HelpCircle } from "lucide-react";

// Preguntas frecuentes + respuestas
const chatbotKnowledge = [
  {
    question: "¿Qué es Tracking Table?",
    answer:
      "Tracking Table es un software de fidelización gastronómica que permite a los restaurantes aumentar sus visitas sin necesidad de aplicaciones. Usa QR, Wallet digital (Apple y Google) y notificaciones geolocalizadas para entregar promociones automáticas a los clientes.",
  },
  {
    question: "¿Cómo funciona el sistema?",
    answer:
      "El cliente escanea un QR en la mesa. Accede al menú digital del restaurante. Se le invita a unirse al sistema de fidelización agregando una tarjeta a su Wallet. Recibe promociones, descuentos y beneficios directamente en su Wallet. Recibe notificaciones geo-push cuando está cerca del restaurante para volver. Todo esto sin necesidad de descargar ninguna app.",
  },
  {
    question: "¿Qué beneficios tiene para el restaurante?",
    answer:
      "Aumenta visitas recurrentes. Mejora la experiencia del cliente. Automatiza promociones y campañas. Recoge opiniones y feedback. Se integra con WhatsApp. Ofrece estadísticas de comportamiento del cliente.",
  },
  {
    question: "¿Qué necesita el restaurante para implementarlo?",
    answer:
      "Solo conexión a internet y un panel de gestión (provisto por nosotros). Nosotros generamos los códigos QR, el acceso a la plataforma, y te ayudamos con la configuración inicial.",
  },
  {
    question: "¿Se necesita que el cliente descargue alguna app?",
    answer:
      "No. El cliente no necesita instalar nada. Todo se gestiona a través del navegador y la tarjeta se guarda en Apple Wallet o Google Wallet.",
  },
  {
    question: "¿Es compatible con iPhone y Android?",
    answer:
      "Sí, Tracking Table es totalmente compatible con Apple Wallet (iPhone) y Google Wallet (Android).",
  },
  {
    question: "¿Cuál es el costo o plan de precios?",
    answer:
      "La plataforma tiene planes personalizados según el tamaño del restaurante. Para recibir una propuesta exacta, puedes solicitar una demo con uno de nuestros asesores.",
  },
  {
    question: "¿Cómo agendo una demo?",
    answer:
      "Puedes hacerlo escribiendo por WhatsApp directamente desde el sitio o completando el formulario de contacto. ¡Uno de nuestros asesores te guiará paso a paso!",
  },
  {
    question: "¿Qué tipo de negocios pueden usar Tracking Table?",
    answer:
      "Restaurantes, cafeterías, locales de comida rápida, food trucks, dark kitchens, entre otros. Cualquier negocio que quiera fidelizar clientes y aumentar sus ventas sin fricción.",
  },
  {
    question: "¿Qué diferencia a Tracking Table de otros sistemas?",
    answer:
      "No requiere apps, la experiencia es fluida, 100% digital, y las notificaciones geolocalizadas hacen que los clientes regresen por sí solos. Además, te conectas con ellos directamente en su celular, sin barreras.",
  },
];

// 💬 Chat con IA
function AIChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hola 👋 Soy el asistente virtual de Tracking Table. Puedes escribir tu pregunta o seleccionar una de las siguientes opciones 👇",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    const userQuestion = input.toLowerCase();
    let botAnswer =
      "Lo siento, no tengo esa información específica. ¿Te gustaría agendar una demo o hablar con un asesor por WhatsApp?";

    for (const knowledge of chatbotKnowledge) {
      const keywords = knowledge.question.toLowerCase().split(" ");
      const matchScore = keywords.filter((word) =>
        userQuestion.includes(word)
      ).length;

      if (
        matchScore > 2 ||
        userQuestion.includes(knowledge.question.toLowerCase())
      ) {
        botAnswer = knowledge.answer;
        break;
      }
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: botAnswer }]);
    }, 600);

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleQuickQuestionClick = (question: string) => {
    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    const match = chatbotKnowledge.find(
      (q) => q.question.toLowerCase() === question.toLowerCase()
    );

    const answer = match
      ? match.answer
      : "Lo siento, no tengo esa información. ¿Quieres hablar con un asesor?";

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    }, 500);
  };

  return (
    <motion.div
      className="fixed bottom-24 right-6 w-80 h-[440px] bg-white rounded-xl shadow-xl z-50 flex flex-col overflow-hidden"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {/* Encabezado */}
      <div className="bg-brand text-white p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <MessageCircle size={18} />
          <h3 className="font-semibold">Asistente IA</h3>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`mb-3 ${message.sender === "user" ? "ml-auto" : "mr-auto"}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
            >
              <div
                className={`p-3 rounded-lg max-w-[80%] text-sm ${
                  message.sender === "user"
                    ? "bg-brand text-white ml-auto"
                    : "bg-white border border-gray-200 mr-auto"
                }`}
              >
                {message.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Preguntas rápidas al inicio */}
        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            {chatbotKnowledge.slice(0, 4).map((item, i) => (
              <button
                key={i}
                onClick={() => handleQuickQuestionClick(item.question)}
                className="block w-full text-left text-sm bg-white border border-gray-200 rounded-lg px-3 py-2 hover:bg-brand hover:text-white transition-colors"
              >
                {item.question}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t p-3 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu pregunta..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none focus:ring-1 focus:ring-brand text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-brand text-white p-2 rounded-r-lg hover:bg-opacity-90 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// 💬 Botón flotante + control de estado
export default function FloatWhatsapp() {
  const [isOpen, setIsOpen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const whatsappLink =
    "https://wa.me/?text=Hola,+vi+la+página+de+Tracking+Table+y+quiero+saber+más+sobre+cómo+implementar+el+sistema+en+mi+restaurante.";

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (showChat) setShowChat(false);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(whatsappLink, "_blank");
    setIsOpen(false);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowChat(true);
    setIsOpen(false);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <>
      <motion.button
        onClick={handleToggleMenu}
        className="fixed bottom-6 right-6 bg-brand text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-50"
        whileHover={{
          scale: 1.05,
          y: -3,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="Abrir menú de ayuda"
      >
        {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              onClick={handleChatClick}
              className="fixed bottom-28 right-6 bg-white text-brand border border-brand shadow-lg rounded-lg px-4 py-2.5 flex items-center w-auto z-50"
              initial={{ opacity: 0, y: 10, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="mr-2" size={18} />
              <span>Chatear con IA</span>
            </motion.button>

            <motion.button
              onClick={handleWhatsAppClick}
              className="fixed bottom-16 right-6 bg-white text-green-600 border border-green-600 shadow-lg rounded-lg px-4 py-2.5 flex items-center w-auto z-50"
              initial={{ opacity: 0, y: 10, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 10, x: 10 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <Phone className="mr-2" size={18} />
              <span>Hablar por WhatsApp</span>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>{showChat && <AIChat onClose={closeChat} />}</AnimatePresence>
    </>
  );
}
