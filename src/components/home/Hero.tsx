"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Hero3DScene from "./Hero3DScene";
import { ArrowRight, Play } from "lucide-react";
import BlurText from "../ui/BlurText";
import StarBorder from "../ui/StarBorder";
import SplitText from "../ui/SplitText";

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#FCFCFC]">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video><div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center -mt-20">
        <div className="max-w-4xl flex flex-col items-center text-center">


          <SplitText 
            text="Build Smarter Digital Experiences for Modern Businesses" 
            tag="h1"
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tighter text-[#17204E]"
            textAlign="center"
          />

          <div className="mb-10 text-xl md:text-2xl font-semibold text-[#17204E] max-w-3xl mx-auto leading-relaxed text-center tracking-tight">
            <BlurText 
              text="Empowering your business with scalable web, mobile, and custom ERP solutions designed for growth."
              delay={800}
              animateBy="words"
              direction="bottom"
              className="justify-center"
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <StarBorder color="#057AF8" speed="4s" className="hover-target group">
              <span className="flex items-center gap-2">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </StarBorder>
            
            <button className="px-8 py-4 rounded-full border border-[#0345CB]/20 text-[#0345CB] font-semibold flex items-center gap-2 hover:bg-[#17204E]/5 transition-colors hover-target h-[58px]">
              <Play className="w-4 h-4" />
              View Portfolio
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
