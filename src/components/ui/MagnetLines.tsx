"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
}

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#ef4444",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // Set base rotation
    itemsRef.current.forEach(item => {
      if (item) {
        gsap.set(item, { rotation: baseAngle });
      }
    });

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      itemsRef.current.forEach((item) => {
        if (!item) return;
        const itemRect = item.getBoundingClientRect();
        const itemX = itemRect.left - rect.left + itemRect.width / 2;
        const itemY = itemRect.top - rect.top + itemRect.height / 2;

        const distance = Math.sqrt(Math.pow(x - itemX, 2) + Math.pow(y - itemY, 2));
        const maxDistance = rect.width / 1.5;

        // If mouse is too far, return to base angle
        if (distance > maxDistance) {
          gsap.to(item, {
            rotation: baseAngle,
            duration: 0.5,
            ease: "power2.out",
          });
          return;
        }

        // Calculate angle towards mouse
        const angle = Math.atan2(y - itemY, x - itemX) * (180 / Math.PI);
        
        gsap.to(item, {
          rotation: angle,
          duration: 0.5,
          ease: "power2.out",
        });
      });
    };

    const onPointerLeave = () => {
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.to(item, {
            rotation: baseAngle,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });
        }
      });
    };

    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerleave", onPointerLeave);

    return () => {
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerleave", onPointerLeave);
    };
  }, { scope: containerRef, dependencies: [baseAngle] });

  const totalItems = rows * columns;

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
      }}
    >
      {Array.from({ length: totalItems }).map((_, index) => (
        <span
          key={index}
          ref={(el) => { itemsRef.current[index] = el; }}
          className="block origin-center will-change-transform"
          style={{
            backgroundColor: lineColor,
            width: lineWidth,
            height: lineHeight,
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
}
