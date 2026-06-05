"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { ShieldCheck, Headset, ArrowRight, Circle, Plus } from "lucide-react";
import SplitText from "../ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 5, suffix: "k+", label: "Projects\nDelivered" },
  { value: 7, suffix: "", label: "International\nOffices" },
  { value: 17, suffix: "+", label: "Years of\nExperience" },
  { value: 5000, suffix: "+", label: "Satisfied\nCustomers" },
];

export default function TrustSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, i) => {
      if (!counter) return;
      const targetValue = stats[i].value;
      
      gsap.to(counter, {
        innerHTML: targetValue,
        duration: 2.5,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 bg-[#FCFCFC] relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Column: Stats Grid */}
          <div className="w-full lg:w-1/2 relative flex justify-center">
            {/* Background Blob Shape */}
            <div className="absolute inset-0 bg-[#057AF8]/5 rounded-[3rem] rounded-tr-[8rem] rounded-bl-[8rem] transform -rotate-3 scale-105 border border-[#057AF8]/10" />
            
            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#057AF8] text-white rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-5 h-5" />
            </div>
            <div className="absolute -bottom-6 left-1/2 w-12 h-12 bg-[#0345CB] text-white rounded-full flex items-center justify-center shadow-lg">
              <Plus className="w-6 h-6" />
            </div>

            {/* Grid */}
            <div className="relative grid grid-cols-2 gap-6 p-8 md:p-12 w-full max-w-[500px]">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-3xl p-6 shadow-sm border border-[#17204E]/5 flex flex-col items-center justify-center text-center aspect-square ${
                    index === 1 || index === 3 ? "translate-y-8" : ""
                  }`}
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#057AF8] mb-2 flex items-center">
                    <span ref={(el) => { countersRef.current[index] = el; }}>0</span>
                    <span>{stat.suffix}</span>
                  </div>
                  <p className="text-sm md:text-base font-medium text-[#17204E] whitespace-pre-line leading-snug">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-4 mb-6"
            >
              <div className="h-px w-8 bg-[#057AF8]"></div>
              <span className="text-[#057AF8] font-semibold tracking-wide uppercase text-sm">About WebApp Orbis</span>
              <div className="h-px w-8 bg-[#057AF8]"></div>
            </motion.div>

            <SplitText 
              text="Advanced Software Solutions for Today's Challenges and Tomorrow's Opportunities."
              tag="h2"
              className="text-4xl md:text-5xl font-bold text-[#17204E] mb-6 leading-tight"
              textAlign="left"
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg leading-relaxed mb-10"
            >
              WebApp Orbis is a software development company specializing in creating solutions customized for businesses of all sizes. With a team of skilled developers, we craft top-notch software designed to meet the unique needs of each client. We collaborate closely with our clients from ideation to launch to ensure the final product exceeds expectations. In addition to our software development expertise, we offer advanced AI solutions that empower businesses to innovate, optimize processes and stay ahead of the competition.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#057AF8]/10 flex items-center justify-center text-[#057AF8]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <span className="text-xl font-bold text-[#17204E]">Quality<br/>Assurance</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#057AF8]/10 flex items-center justify-center text-[#057AF8]">
                  <Headset className="w-7 h-7" />
                </div>
                <span className="text-xl font-bold text-[#17204E]">Support &<br/>Maintenance</span>
              </div>
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="px-8 py-3 rounded-full border border-[#057AF8] text-[#057AF8] font-medium flex items-center gap-2 hover:bg-[#057AF8] hover:text-white transition-all duration-300 group"
            >
              Contact Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

        </div>
      </div>
    </section>
  );
}
