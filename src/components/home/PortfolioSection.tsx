"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Aura Fintech",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Luxe Health",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Nova ERP",
    category: "Enterprise System",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Oasis Realty",
    category: "Platform Design",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const sections = gsap.utils.toArray(".portfolio-item");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + containerRef.current?.offsetWidth,
      },
    });
  }, { scope: sectionRef });

  return (
    <div className="portfolio-section-wrapper">
      <section ref={sectionRef} className="bg-[#FCFCFC] relative z-10 overflow-hidden h-screen flex flex-col justify-center">
      <div className="container mx-auto px-6 md:px-12 mb-12 shrink-0">
        <h2 className="text-4xl md:text-6xl font-bold text-[#17204E]">Selected Works</h2>
      </div>

      <div ref={containerRef} className="flex w-[400vw] h-[60vh] px-6 md:px-12 gap-8">
        {projects.map((project, index) => (
          <div 
            key={project.id} 
            className="portfolio-item w-screen md:w-[80vw] h-full shrink-0 relative group rounded-3xl overflow-hidden"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            
            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 bg-gradient-to-t from-[#17204E] to-transparent">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-[#8EAAD1] font-medium mb-2">{project.category}</p>
                  <h3 className="text-3xl md:text-5xl font-bold text-[#17204E]">{project.title}</h3>
                </div>
                <Link 
                  href="/case-studies"
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform hover-target"
                >
                  <ArrowUpRight className="w-8 h-8" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
}
