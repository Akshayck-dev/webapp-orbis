"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const row1 = ["React", "Next.js", "Node.js", "NestJS", "TypeScript", "Tailwind CSS", "GSAP", "Three.js"];
const row2 = ["Flutter", "React Native", "MongoDB", "PostgreSQL", "AWS", "Docker", "Kubernetes", "GraphQL"];

export default function TechStack() {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Row 1 animation (left to right)
    gsap.to(row1Ref.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    // Row 2 animation (right to left)
    gsap.set(row2Ref.current, { xPercent: -50 });
    gsap.to(row2Ref.current, {
      xPercent: 0,
      ease: "none",
      duration: 25,
      repeat: -1,
    });
  });

  return (
    <section className="py-24 bg-[#F8FAFC] relative z-10 overflow-hidden border-y border-[#17204E]/5">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#17204E] mb-4">Powered by Modern Technology</h2>
        <p className="text-gray-600">We use the best tools to build scalable and future-proof solutions.</p>
      </div>

      <div className="flex flex-col gap-8 relative">
        {/* Left/Right Fade */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

        {/* Row 1 */}
        <div className="w-[200vw] flex" ref={row1Ref}>
          {[...row1, ...row1, ...row1].map((tech, i) => (
            <div key={i} className="flex-1 px-8">
              <div className="px-8 py-4 rounded-xl glass whitespace-nowrap text-[#17204E] font-medium text-lg flex items-center justify-center">
                {tech}
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="w-[200vw] flex" ref={row2Ref}>
          {[...row2, ...row2, ...row2].map((tech, i) => (
            <div key={i} className="flex-1 px-8">
              <div className="px-8 py-4 rounded-xl bg-[#17204E]/5 border border-[#17204E]/5 whitespace-nowrap text-gray-700 font-medium text-lg flex items-center justify-center">
                {tech}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
