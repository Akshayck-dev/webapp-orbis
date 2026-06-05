"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface TrueFocusProps {
  sentence: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export default function TrueFocus({
  sentence,
  manualMode = false,
  blurAmount = 4,
  borderColor = "#057AF8",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  className = "",
}: TrueFocusProps) {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    if (!manualMode) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
      }, (animationDuration + pauseBetweenAnimations) * 1000);

      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, words.length]);

  useEffect(() => {
    if (words.length === 0) return;
    const activeElement = wordRefs.current[currentIndex];
    if (activeElement && containerRef.current) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      setFocusRect({
        x: activeRect.left - parentRect.left,
        y: activeRect.top - parentRect.top,
        w: activeRect.width,
        h: activeRect.height,
      });
    }
  }, [currentIndex, words.length]);

  const handleMouseEnter = (index: number) => {
    if (manualMode) {
      setLastActiveIndex(currentIndex);
      setCurrentIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (manualMode && lastActiveIndex !== null) {
      setCurrentIndex(lastActiveIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-wrap justify-center gap-4 ${className}`}
    >
      <motion.div
        className="absolute top-0 left-0 border-2 rounded-lg pointer-events-none mix-blend-screen"
        style={{ borderColor }}
        animate={{
          x: focusRect.x - 8,
          y: focusRect.y - 8,
          width: focusRect.w + 16,
          height: focusRect.h + 16,
          opacity: focusRect.w > 0 ? 1 : 0,
        }}
        transition={{ type: "spring", bounce: 0.2, duration: animationDuration }}
      />
      
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            ref={(el) => { wordRefs.current[index] = el; }}
            className="relative inline-block cursor-pointer px-1 transition-all duration-300"
            style={{
              filter: isActive ? "blur(0px)" : `blur(${blurAmount}px)`,
              opacity: isActive ? 1 : 0.5,
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
}
