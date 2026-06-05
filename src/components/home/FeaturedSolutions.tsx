"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TrueFocus from "../ui/TrueFocus";
import { 
  HeartPulse, 
  GraduationCap, 
  Building2, 
  ShoppingCart,
  Factory,
  Truck,
  LineChart,
  Hotel
} from "lucide-react";

const solutions = [
  { id: 1, title: "Healthcare", icon: HeartPulse, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800", desc: "HIPAA-compliant telemedicine platforms and patient management systems." },
  { id: 2, title: "Finance", icon: LineChart, image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800", desc: "Secure FinTech apps, trading platforms, and banking portals." },
  { id: 3, title: "Real Estate", icon: Building2, image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800", desc: "Property listing platforms with virtual tours and CRM integrations." },
  { id: 4, title: "E-Commerce", icon: ShoppingCart, image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800", desc: "High-conversion online stores with advanced inventory management." },
];

export default function FeaturedSolutions() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#F8FAFC] relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="mb-4">
              <TrueFocus 
                sentence="Enterprise Solutions"
                manualMode={false}
                blurAmount={5}
                borderColor="#8EAAD1"
                animationDuration={0.8}
                pauseBetweenAnimations={1.5}
                className="text-4xl md:text-5xl font-bold text-[#17204E] flex-nowrap"
              />
            </div>
            <p className="text-gray-600 max-w-xl">
              We build specialized digital ecosystems tailored to the unique challenges of your industry.
            </p>
          </div>
          <button className="px-6 py-3 rounded-full border border-[#17204E]/20 text-[#17204E] font-medium hover:bg-[#17204E]/10 transition-colors hover-target shrink-0">
            View All Industries
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[60vh] min-h-[400px]">
          {solutions.map((solution) => (
            <motion.div
              key={solution.id}
              className="relative rounded-2xl overflow-hidden cursor-pointer hover-target group"
              onHoverStart={() => setHoveredId(solution.id)}
              onHoverEnd={() => setHoveredId(null)}
              animate={{
                flex: hoveredId === solution.id ? 2 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${solution.image})` }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#17204E] via-[#17204E]/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="w-12 h-12 rounded-full bg-[#17204E]/10 backdrop-blur-md flex items-center justify-center text-[#17204E] mb-4">
                  <solution.icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#17204E] mb-2">{solution.title}</h3>
                
                <AnimatePresence>
                  {hoveredId === solution.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-gray-700 text-sm mt-2">
                        {solution.desc}
                      </p>
                      <button className="mt-4 text-[#8EAAD1] text-sm font-semibold flex items-center gap-2">
                        Learn more <span className="text-lg">→</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
