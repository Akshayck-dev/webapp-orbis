"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
}

export default function BlurText({
  text,
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
}: BlurTextProps) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  
  const animatedCount = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {elements.map((element, index) => (
        <motion.span
          key={index}
          initial={{
            filter: "blur(10px)",
            opacity: 0,
            transform: `translate3d(0, ${direction === "top" ? "-50px" : "50px"}, 0)`,
          }}
          animate={
            inView
              ? {
                  filter: "blur(0px)",
                  opacity: 1,
                  transform: "translate3d(0, 0, 0)",
                }
              : {}
          }
          transition={{
            duration: 0.8,
            ease: [0.4, 0.0, 0.2, 1],
            delay: delay / 1000 + index * 0.03,
          }}
          className="inline-block mr-[0.25em]"
          onAnimationComplete={() => {
            animatedCount.current += 1;
          }}
        >
          {element === " " ? "\u00A0" : element}
          {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </p>
  );
}
