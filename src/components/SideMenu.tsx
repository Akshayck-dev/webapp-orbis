"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ArrowRight } from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { name: "About Us", href: "/about" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Clients", href: "/portfolio" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "Dribbble", href: "#" },
  { name: "Behance", href: "#" },
  { name: "Pinterest", href: "#" },
  { name: "YouTube", href: "#" },
];

// Simple particle component for background animation
const Particles = () => {
  const [particles, setParticles] = useState<Array<any>>([]);

  useEffect(() => {
    // Generate random particles on client side only
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
      moveX: (Math.random() - 0.5) * 400, // pixels to move horizontally
      moveY: (Math.random() - 0.5) * 400, // pixels to move vertically
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#057AF8]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, p.moveY, 0],
            x: [0, p.moveX, 0],
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
  const [mounted, setMounted] = useState(false);

  // Prevent scrolling when menu is open and set mounted state
  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.6 }}
            className="fixed inset-0 bg-[#FCFCFC] z-[70] flex flex-col overflow-hidden"
          >
            <Particles />

            {/* Header */}
            <div className="container mx-auto px-6 md:px-12 py-6 flex justify-between items-center relative z-10">
              <Link href="/" onClick={onClose} className="flex items-center gap-2">
                <img src="/logo.png" alt="WebApp Orbis Logo" className="h-[60px] w-auto object-contain" />
              </Link>
              
              <button 
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#17204E] hover:bg-gray-50 transition-colors shadow-sm group hover-target"
              >
                <span className="text-sm font-semibold tracking-wider">CLOSE</span>
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 md:px-12 flex-1 flex flex-col justify-start pt-4 md:pt-8 pb-8 relative z-10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start h-full">
                
                {/* Left: Navigation Links */}
                <div className="flex flex-col space-y-4 lg:space-y-5">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                    >
                      <Link 
                        href={link.href}
                        onClick={onClose}
                        className="text-3xl md:text-4xl lg:text-5xl font-light text-[#17204E] hover:text-[#057AF8] transition-colors flex items-center group hover-target"
                      >
                        <span className="w-3 h-3 rounded-full bg-[#057AF8] mr-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="-ml-9 group-hover:ml-0 transition-all duration-300">
                          {link.name}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Right: Info & Stats */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-white"
                >
                  <h2 className="text-2xl md:text-3xl font-bold text-[#17204E] mb-4">About Us</h2>
                  <p className="text-gray-600 mb-8 leading-relaxed max-w-lg text-base">
                    WebApp Orbis is a premier digital solutions firm. With a diverse portfolio of clients worldwide, we pride ourselves on our innovative approach to web design, development, and enterprise applications.
                  </p>

                  <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-[#17204E] flex items-center gap-1 mb-1">
                        16 <span className="text-[#057AF8]">+</span>
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Years of Expertise</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-[#17204E] flex items-center gap-1 mb-1">
                        800 <span className="text-[#057AF8]">+</span>
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Clients Globally</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-[#17204E] flex items-center gap-1 mb-1">
                        1000 <span className="text-[#057AF8]">+</span>
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Projects</div>
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-[#17204E] flex items-center gap-1 mb-1">
                        150 <span className="text-[#057AF8]">+</span>
                      </div>
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Dedicated Experts</div>
                    </div>
                  </div>

                  <Link href="/about" onClick={onClose} className="inline-flex items-center gap-3 bg-[#057AF8] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#035bb8] transition-colors shadow-lg shadow-[#057AF8]/20 group hover-target text-sm">
                    More about Us
                    <div className="w-8 h-8 rounded-full bg-white text-[#057AF8] flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>

              </div>
            </div>

            {/* Footer / Socials */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="container mx-auto px-6 md:px-12 py-4 mt-auto relative z-10"
            >
              <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name} 
                    href={social.href} 
                    className="flex items-center gap-1 text-gray-500 hover:text-[#057AF8] transition-colors hover-target"
                  >
                    {social.name}
                    <ArrowRight className="w-3 h-3 -rotate-45" />
                  </a>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
