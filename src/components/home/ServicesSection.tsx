"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { 
    title: "Website Design", 
    category: "Development",
    href: "/services/website-design",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1200",
    desc: "Visually appealing, fast-loading, and mobile-friendly websites that reflect your brand identity." 
  },
  { 
    title: "Mobile Apps", 
    category: "Engineering",
    href: "/services/mobile-apps",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
    desc: "Innovative mobile applications designed for Android and iOS with intuitive user interfaces." 
  },
  { 
    title: "ERP Solutions", 
    category: "Enterprise",
    href: "/services/erp-solutions",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    desc: "Intelligent ERP systems designed to improve productivity and workflow management." 
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".service-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-[#FCFCFC] relative z-10" id="services">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header matching the screenshot layout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-[9rem] font-black text-[#17204E] uppercase tracking-tighter leading-none m-0 p-0"
          >
            SERVICES
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md pb-4"
          >
            <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed">
              We provide end-to-end digital solutions designed to elevate your brand, streamline operations, and drive measurable growth.
            </p>
          </motion.div>
        </div>

        {/* Grid of high-quality image cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Link 
              href={service.href}
              key={index}
              className="service-card block group relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Top Badge */}
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
                  {service.category}
                </span>
              </div>

              {/* Arrow Icon Top Right */}
              <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                <ArrowUpRight className="w-6 h-6" />
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <div className="overflow-hidden h-0 group-hover:h-24 transition-all duration-500 ease-in-out">
                  <p className="text-gray-300 text-base leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {service.desc}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
