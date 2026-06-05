"use client";

import BlurText from "@/components/ui/BlurText";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Global FinTech Platform",
    client: "FinTrust",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    stats: "+140% User Growth",
  },
  {
    title: "AI-Powered CRM System",
    client: "SalesNova",
    category: "Enterprise Software",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
    stats: "40% Time Saved",
  },
  {
    title: "Next-Gen E-Commerce",
    client: "Luxe Fashion",
    category: "E-Commerce",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200",
    stats: "$2.4M Initial Sales",
  },
  {
    title: "Smart Health Dashboard",
    client: "MediCare",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
    stats: "Award Winning Design",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Work that speaks <br/> for itself.
          </h1>
          <div className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            <BlurText 
              text="Explore our portfolio of award-winning digital experiences, scalable enterprise platforms, and transformative AI solutions."
              delay={300}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group"
            >
              <Link href="/contact" className="block cursor-pointer hover-target">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 bg-[#17204E]/5">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Overlay Stats */}
                  <div className="absolute top-6 right-6 px-4 py-2 rounded-full glass text-sm font-semibold text-[#17204E] translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    {project.stats}
                  </div>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[#8EAAD1] font-medium text-sm mb-2">{project.category}</p>
                    <h3 className="text-2xl font-bold text-[#17204E] mb-1 group-hover:text-[#057AF8] transition-colors">{project.title}</h3>
                    <p className="text-gray-500">{project.client}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-[#17204E]/20 flex items-center justify-center text-[#17204E] group-hover:bg-[#057AF8] group-hover:border-transparent group-hover:rotate-45 transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
