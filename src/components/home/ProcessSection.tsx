"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const processes = [
  { step: "01", title: "Discovery", desc: "Understanding your goals, audience, and market." },
  { step: "02", title: "Strategy", desc: "Defining the technical architecture and roadmap." },
  { step: "03", title: "Design", desc: "Creating intuitive and stunning user interfaces." },
  { step: "04", title: "Development", desc: "Writing clean, scalable, and secure code." },
  { step: "05", title: "Testing", desc: "Rigorous QA to ensure flawless performance." },
  { step: "06", title: "Launch", desc: "Deploying your solution to the world." },
  { step: "07", title: "Growth", desc: "Ongoing optimization and scaling." },
];

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !lineRef.current) return;

    gsap.to(lineRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });

    gsap.from(".process-item", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
      },
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-32 bg-[#FCFCFC] relative z-10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-[#17204E] mb-6">Our Proven Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A systematic approach to delivering high-quality digital solutions on time and within budget.
          </p>
        </div>

        <div className="relative">
          {/* Progress Line Background */}
          <div className="absolute top-12 left-0 w-full h-1 bg-[#17204E]/10 hidden md:block"></div>
          
          {/* Animated Progress Line */}
          <div 
            ref={lineRef}
            className="absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-[#057AF8] to-[#8EAAD1] hidden md:block origin-left scale-x-0"
          ></div>

          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 relative z-10">
            {processes.map((process, index) => (
              <div key={index} className="process-item flex flex-col md:items-center relative">
                {/* Mobile Line */}
                <div className="absolute left-6 top-16 bottom-[-2rem] w-px bg-[#17204E]/10 md:hidden"></div>
                
                <div className="w-24 h-24 rounded-full bg-[#FCFCFC] border border-[#17204E]/20 flex items-center justify-center mb-6 relative z-10 group hover:border-[#8EAAD1] transition-colors">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 group-hover:from-[#057AF8] group-hover:to-[#8EAAD1] transition-all">
                    {process.step}
                  </span>
                </div>
                
                <div className="md:text-center ml-24 md:ml-0 -mt-20 md:mt-0 pb-8 md:pb-0">
                  <h3 className="text-xl font-bold text-[#17204E] mb-2">{process.title}</h3>
                  <p className="text-sm text-gray-600">{process.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
