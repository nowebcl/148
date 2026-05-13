import React, { useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  Building2, 
  Music, 
  Camera, 
  Wind, 
  Timer, 
  Image as ImageIcon, 
  UserCircle, 
  Home, 
  Film, 
  Box,
  ChevronRight,
  ChevronLeft,
  Send,
  CheckCircle2,
  Phone,
  Laptop,
  Coffee,
  Wine,
  Waves,
  Users
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SERVICES = [
  { id: 'corp', name: 'Video Corporativo', icon: Building2, desc: 'Empresas, drones, entrevistas', price: 450000, tag: 'Popular' },
  { id: 'after', name: 'Aftermovie Evento', icon: Camera, desc: 'Registro cinematográfico', price: 280000 },
  { id: 'reels', name: 'Reels / Redes Sociales', icon: Film, desc: 'Contenido dinámico', price: 90000 },
  { id: 'drone', name: 'Servicio Drone 4K', icon: Wind, desc: 'Tomas aéreas profesionales', price: 120000 },
  { id: 'sub', name: 'Registro Submarino', icon: Waves, desc: 'Agua y Naturaleza', price: 180000 },
  { id: '3d', name: 'Escaneo 3D / Tour', icon: Box, desc: 'Tecnología Matterport', price: 600000 },
  { id: 'book', name: 'Book Profesional', icon: UserCircle, desc: 'Estudio o exterior', price: 180000 },
  { id: 'tech', name: 'Producción Técnica', icon: Music, desc: 'Audio, Iluminación, Pantallas', price: 550000, tag: 'Integral' },
  { id: 'dj', name: 'DJ Experiencia', icon: Users, desc: 'Música y Ambientación', price: 300000 },
  { id: 'mkt', name: 'Marketing & Branding', icon: Send, desc: 'Estrategia y Contenido', price: 250000 },
  { id: 'web', name: 'Desarrollo Web', icon: Laptop, desc: 'Landing / Ecommerce', price: 450000 },
  { id: 'catering', name: 'Catering Eventos', icon: Coffee, desc: 'Coffee / Cocktail / Asados', price: 300000 },
  { id: 'bar', name: 'Barra Móvil', icon: Wine, desc: 'Coctelería de autor', price: 250000 },
  { id: 'space', name: 'Arriendo Espacio', icon: Home, desc: 'Patagonia / Outdoor', price: 600000, tag: 'Premium' },
];

const StepWrapper = ({ children, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
    className="w-full h-full flex flex-col pt-20 pb-12 px-6 overflow-y-auto no-scrollbar"
  >
    {title && (
      <header className="mb-8 text-center space-y-2 relative z-20 pt-4">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black tracking-tight leading-tight text-white"
        >
          {title}
        </motion.h2>
        {subtitle && <p className="text-brand/80 text-xs font-bold uppercase tracking-widest">{subtitle}</p>}
      </header>
    )}
    <div className="flex-1 flex flex-col justify-start items-center w-full">
      {children}
    </div>
  </motion.div>
);



export default function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    services: [],
    details: '',
    name: '',
    company: '',
    city: ''
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const toggleService = (serviceName) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceName)
        ? prev.services.filter(s => s !== serviceName)
        : [...prev.services, serviceName]
    }));
  };

  const rawPrice = formData.services.reduce((acc, sName) => {
    const s = SERVICES.find(sv => sv.name === sName);
    return acc + (s ? s.price : 0);
  }, 0);

  const totalPrice = rawPrice;

  const formatPrice = (p) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(p);

  const sendToWhatsApp = () => {
    const phone = "56992449580";
    const servicesText = formData.services.join(", ");
    const text = `¡Hola 148 Producciones! 👋 Quiero cotizar los siguientes servicios: ${servicesText}.
💰 Inversión estimada: ${formatPrice(totalPrice)}
📌 Proyecto: ${formData.details}
👤 Nombre: ${formData.name}
🏢 Empresa: ${formData.company || 'Particular'}
📍 Ciudad: ${formData.city}

Vi esto en su cotizador web y me interesa comenzar pronto.`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="relative h-screen w-screen bg-black text-white overflow-hidden grid-mesh">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand/20 blur-[140px] rounded-full pointer-events-none opacity-40" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand/10 blur-[140px] rounded-full pointer-events-none opacity-30" />

      {/* Top Navigation / Progress */}
      <header className="absolute top-0 left-0 right-0 z-50 p-4 flex items-center justify-between bg-black/50 backdrop-blur-sm border-b border-white/5">
        {step > 1 ? (
          <button onClick={prevStep} className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <ChevronLeft size={16} /> Volver
          </button>
        ) : (
            <img src="/assets/logo.png" alt="148 Pro Logo" className="h-6 w-auto object-contain" />
        )}
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand">Paso {step}/{totalSteps}</span>
          <div className="w-20 h-1 bg-white/10 rounded-full mt-0.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-brand"
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 h-full w-full max-w-lg mx-auto flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <StepWrapper 
              key="step1" 
            title="148 Producciones" 
            subtitle="Audiovisual • Eventos • Marketing • Experiencias"
            >
              <div className="w-full flex flex-col h-full pt-2">
                <p className="text-[10px] text-gray-400 text-center mb-6 px-4 leading-relaxed max-w-sm mx-auto">
                  Desarrollamos experiencias audiovisuales, eventos y contenido creativo en el sur de Chile con un enfoque cinematográfico y moderno.
                </p>
                <div className="grid grid-cols-2 gap-2 overflow-y-auto no-scrollbar max-h-[50vh] px-1 pb-2">
                  {SERVICES.map((s, idx) => (
                    <motion.button
                      key={s.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => toggleService(s.name)}
                      className={cn(
                        "group relative flex flex-col items-start p-3 text-left transition-all duration-300 min-h-[120px] overflow-hidden",
                        formData.services.includes(s.name) ? "glass-active ring-1 ring-brand" : "glass hover:bg-white/10"
                      )}
                    >
                      {s.tag && (
                        <div className="absolute top-0 right-0 bg-brand text-black text-[7px] font-black px-1.5 py-0.5 rounded-bl uppercase">
                          {s.tag}
                        </div>
                      )}
                      <div className={cn(
                        "p-1.5 rounded mb-2 transition-colors",
                        formData.services.includes(s.name) ? "bg-black/20 text-brand" : "bg-white/5 text-white/40"
                      )}>
                        <s.icon size={18} strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-black leading-tight mb-0.5">{s.name}</span>
                      <span className="text-[9px] text-brand/80 font-bold mb-1">Desde {formatPrice(s.price)}</span>
                      <span className="text-[8px] text-gray-500 font-medium leading-tight line-clamp-2">{s.desc}</span>
                      
                      {formData.services.includes(s.name) && (
                        <div className="absolute bottom-2 right-2 text-brand">
                          <CheckCircle2 size={14} fill="currentColor" className="text-black" />
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>

                <motion.button 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: formData.services.length > 0 ? 1 : 0, scale: formData.services.length > 0 ? 1 : 0.95 }}
                  disabled={formData.services.length === 0}
                  onClick={nextStep} 
                  className="w-full bg-brand text-black py-4 rounded-xl font-black flex flex-col items-center justify-center shadow-lg mt-2 group"
                >
                  <span className="text-xs flex items-center gap-1">
                    Continuar <ChevronRight size={16} />
                  </span>
                  <span className="text-[9px] opacity-70">Total aprox: {formatPrice(totalPrice)}</span>
                </motion.button>
              </div>
            </StepWrapper>
          )}

          {step === 2 && (
            <StepWrapper 
              key="step2" 
              title="Tu Visión" 
              subtitle="Cuéntanos sobre tu proyecto"
            >
              <div className="w-full space-y-4">
                <textarea
                  autoFocus
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full h-40 glass p-4 text-white focus:outline-none focus:ring-1 focus:ring-brand/50 resize-none placeholder:text-gray-700 text-sm"
                  placeholder="Ej: Necesito cobertura para un evento en el sur y un video promocional con drone..."
                />
                {formData.details.length > 0 && formData.details.length < 15 && (
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-brand/70 font-black uppercase tracking-widest text-center">
                    Mínimo 15 caracteres para continuar
                  </motion.p>
                )}
                <motion.button 
                  disabled={formData.details.length < 15}
                  onClick={nextStep} 
                  className="w-full bg-brand text-black py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg text-sm"
                >
                  Siguiente <ChevronRight size={20} />
                </motion.button>
              </div>
            </StepWrapper>
          )}

          {step === 3 && (
            <StepWrapper 
              key="step3" 
              title="Contacto" 
              subtitle="¿Cómo te contactamos?"
            >
              <div className="w-full space-y-3">
                <div className="relative group">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full glass py-4 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-brand/50 text-sm"
                  />
                </div>
                <div className="relative group">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    placeholder="Empresa / Marca"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full glass py-4 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-brand/50 text-sm"
                  />
                </div>
                <div className="relative group">
                  <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full glass py-4 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-brand/50 text-sm"
                  />
                </div>

                <motion.button 
                  disabled={!formData.name || !formData.city}
                  onClick={nextStep} 
                  className="w-full bg-brand text-black py-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg text-sm mt-2"
                >
                  Ver Propuesta <ChevronRight size={20} />
                </motion.button>
              </div>
            </StepWrapper>
          )}

          {step === 4 && (
            <StepWrapper 
              key="step4" 
              title="Resumen" 
              subtitle="Todo listo para elevar tu marca"
            >
              <div className="w-full space-y-2">
                <div className="glass p-4 space-y-3 relative overflow-hidden border-brand/10">
                  <div className="space-y-0.5 relative z-10">
                    <span className="text-brand text-[8px] font-black uppercase tracking-widest">Servicios</span>
                    <p className="text-sm font-black leading-tight truncate">{formData.services.join(", ")}</p>
                  </div>
                  <div className="space-y-0.5 relative z-10">
                    <span className="text-brand text-[8px] font-black uppercase tracking-widest">Inversión Estimada</span>
                    <div className="flex items-baseline gap-1.5">
                      <p className="text-xl font-black text-white">
                        {formatPrice(totalPrice)}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/5 relative z-10">
                    <div className="space-y-0.5">
                      <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Responsable</span>
                      <p className="text-[10px] font-bold text-gray-300">{formData.name}</p>
                    </div>
                    <div className="space-y-0.5 text-right">
                      <span className="text-gray-500 text-[8px] font-black uppercase tracking-widest">Ubicación</span>
                      <p className="text-[10px] font-bold text-gray-300">{formData.city}</p>
                    </div>
                  </div>
                </div>



                <div className="flex flex-col gap-2 pt-1">
                  <motion.button 
                    whileTap={{ scale: 0.98 }}
                    onClick={sendToWhatsApp} 
                    className="w-full bg-[#25D366] text-white py-4 rounded-xl font-black flex flex-col items-center justify-center shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-base">
                      <Send size={18} /> Confirmar y Enviar
                    </div>
                    <span className="text-[8px] opacity-80 font-bold uppercase tracking-widest mt-0.5">WhatsApp</span>
                  </motion.button>
                  <button onClick={() => setStep(1)} className="w-full text-gray-500 font-bold py-1 text-[8px] uppercase tracking-widest">
                    Ajustar mi presupuesto
                  </button>
                </div>
              </div>
            </StepWrapper>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

