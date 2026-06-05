"use client";

import BlurText from "@/components/ui/BlurText";
import { motion } from "framer-motion";
import { Target, Eye, Settings, ShieldCheck, CheckCircle2 } from "lucide-react";
import MagnetLines from "@/components/ui/MagnetLines";
import SplitText from "@/components/ui/SplitText";

const reasons = [
  "Experienced development and design team",
  "Customised business-focused solutions",
  "Modern and scalable technologies",
  "SEO-friendly and responsive development",
  "Reliable technical support and maintenance",
  "Focus on quality, performance, and security"
];

const team = [
  { name: "Elena Rostova", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600" },
  { name: "Marcus Thorne", role: "Chief Technology Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600" },
  { name: "Sofia Patel", role: "Head of Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600" },
  { name: "James Wilson", role: "Director of Strategy", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600" },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 mb-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#17204E]/10 bg-[#17204E]/5 backdrop-blur-md mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#057AF8] animate-pulse"></span>
            <span className="text-sm font-medium text-gray-700">About Us</span>
          </motion.div>
          
          <div className="w-full text-center">
            <SplitText 
              text="Professional Digital Solutions Company" 
              tag="h1"
              className="text-5xl md:text-7xl font-bold mb-8 text-[#17204E]"
              textAlign="center"
            />
          </div>
          
          <div className="text-xl text-gray-600 leading-relaxed max-w-3xl space-y-6">
            <BlurText 
              text="We are a professional digital solutions company specialising in website designing and development, mobile app development, and customised ERP software solutions. Our focus is on helping businesses establish a strong digital presence while improving operational efficiency through innovative technology solutions."
              delay={300}
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              With a dedicated team of designers, developers, and technology experts, we create modern platforms that combine functionality, creativity, and performance. Our approach is centred around understanding business objectives and delivering solutions tailored to specific operational requirements.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#F8FAFC] py-24 border-y border-[#17204E]/5 relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-12 rounded-3xl glass"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#8EAAD1]/10 flex items-center justify-center text-[#8EAAD1] mb-8">
                <Eye className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-[#17204E] mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our vision is to empower businesses with reliable digital technologies that improve customer engagement, simplify operations, and support long-term business growth.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-12 rounded-3xl glass"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#057AF8]/10 flex items-center justify-center text-[#057AF8] mb-8">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-[#17204E] mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Our mission is to provide high-quality digital solutions through innovative design, advanced development practices, and customer-focused strategies. We aim to help businesses adapt to the evolving digital landscape with scalable and efficient technology services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Approach & Trust */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-10 pointer-events-none">
          <MagnetLines rows={12} columns={20} containerSize="120vw" lineColor="#057AF8" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#17204E] mb-8">Our Approach</h2>
              <div className="space-y-6 text-xl text-gray-600 leading-relaxed">
                <p>
                  We believe every business requires unique digital solutions. Our team works closely with clients to understand their goals, industry requirements, and operational challenges before creating customised strategies and technology platforms.
                </p>
                <p>
                  From planning and design to development and deployment, we maintain a transparent and collaborative process to ensure high-quality project delivery.
                </p>
              </div>
            </div>

            <div className="glass p-10 rounded-3xl">
              <h3 className="text-3xl font-bold text-[#17204E] mb-8 flex items-center gap-4">
                <ShieldCheck className="w-8 h-8 text-[#8EAAD1]" />
                Why Businesses Trust Us
              </h3>
              <ul className="space-y-4">
                {reasons.map((reason, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 text-gray-700"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#057AF8] shrink-0" />
                    <span>{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
