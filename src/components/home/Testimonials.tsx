"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CEO, TechNova",
    content: "WebApp Orbis transformed our vision into a stunning reality. Their attention to detail and technical expertise is unmatched in the industry.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Founder, GrowthX",
    content: "The enterprise ERP system they built for us reduced operational costs by 40%. Absolutely brilliant team to work with.",
    rating: 5,
  },
  {
    name: "Emma Watson",
    role: "Marketing Director, Bloom",
    content: "Our website traffic doubled within 3 months of launch. The UX design and SEO architecture are world-class.",
    rating: 5,
  },
  {
    name: "David Miller",
    role: "CTO, FinTrust",
    content: "They delivered a highly secure, scalable FinTech platform ahead of schedule. Truly a premium agency experience.",
    rating: 5,
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(scrollRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 30,
      repeat: -1,
    });
  }, { scope: scrollRef });

  return (
    <section className="py-24 bg-[#FCFCFC] relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#17204E] mb-4">Client Success Stories</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Don't just take our word for it. Hear from our partners.</p>
      </div>

      <div className="relative">
        {/* Left/Right Fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#17204E] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#17204E] to-transparent z-10 pointer-events-none"></div>

        <div className="flex w-[200vw] gap-6 px-6" ref={scrollRef}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <div 
              key={i} 
              className="w-[80vw] md:w-[400px] shrink-0 p-8 rounded-3xl glass flex flex-col justify-between"
            >
              <div>
                <Quote className="w-10 h-10 text-[#057AF8]/40 mb-6" />
                <p className="text-lg text-gray-700 leading-relaxed mb-8">{t.content}</p>
              </div>
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-5 h-5 fill-[#8EAAD1] text-[#8EAAD1]" />
                  ))}
                </div>
                <h4 className="text-[#17204E] font-bold">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
