"use client";

import BlurText from "@/components/ui/BlurText";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    title: "The Future of Web 3.0 in Enterprise Architecture",
    category: "Technology",
    date: "Oct 24, 2025",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f4ec651?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "How AI is Reshaping UX Design Practices",
    category: "Design",
    date: "Sep 12, 2025",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Optimizing Core Web Vitals for E-Commerce",
    category: "Engineering",
    date: "Aug 30, 2025",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Building Scalable Microservices with Next.js",
    category: "Development",
    date: "Aug 15, 2025",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800",
  },
];

export default function BlogPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Insights & <br/> Perspectives.
          </h1>
          <div className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            <BlurText 
              text="Thoughts on digital strategy, software engineering, and design from our world-class team."
              delay={300}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group cursor-pointer hover-target"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
              </div>

              <div className="flex items-center gap-4 text-sm font-medium mb-4">
                <span className="text-[#8EAAD1] px-3 py-1 rounded-full bg-[#8EAAD1]/10">{article.category}</span>
                <span className="text-gray-500">{article.date}</span>
              </div>

              <h3 className="text-2xl font-bold text-[#17204E] mb-4 group-hover:text-[#057AF8] transition-colors line-clamp-2">
                {article.title}
              </h3>

              <div className="flex items-center gap-2 text-[#17204E] font-medium">
                Read Article
                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
