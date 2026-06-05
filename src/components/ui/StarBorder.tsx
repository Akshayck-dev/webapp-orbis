"use client";

import React from "react";

interface StarBorderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: string;
}

export default function StarBorder({
  as: Component = "button",
  className = "",
  children,
  color = "white",
  speed = "6s",
  ...rest
}: StarBorderProps) {
  const Comp: any = Component;
  return (
    <Comp
      className={`relative inline-block py-[1px] overflow-hidden rounded-[20px] ${className}`}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement-bottom z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement-top z-0"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      ></div>
      <div className="relative z-1 border text-[#17204E] text-center text-[16px] py-[16px] px-[26px] rounded-[20px] bg-gradient-to-b from-[#111] to-[#17204E] border-[#222] hover:bg-[#111] transition-colors">
        {children}
      </div>
    </Comp>
  );
}
