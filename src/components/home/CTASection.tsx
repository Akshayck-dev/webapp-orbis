"use client";

import { motion } from "framer-motion";
import StarBorder from "../ui/StarBorder";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SplitText from "../ui/SplitText";

export default function CTASection() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#FCFCFC]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#057AF8]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center p-12 md:p-20 rounded-[3rem] glass border border-[#17204E]/10">
          <SplitText 
            text="Grow Your Business Digitally" 
            tag="h2"
            className="text-4xl md:text-6xl font-bold text-[#17204E] mb-8"
            textAlign="center"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 leading-relaxed"
          >
            We combine creativity, technology, and strategy to deliver digital solutions that help businesses strengthen their online presence and improve operational performance. Whether you need a professional website, a powerful mobile application, or a complete ERP system, we deliver solutions that support your business growth efficiently.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/contact">
              <StarBorder color="#057AF8" speed="4s" className="hover-target group">
                <span className="flex items-center gap-2 font-semibold">
                  Start Your Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </StarBorder>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
