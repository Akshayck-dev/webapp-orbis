"use client";

import { Check, X } from "lucide-react";
import SplitText from "../ui/SplitText";
import MagnetLines from "../ui/MagnetLines";

const benefits = [
  "Professional and responsive designs",
  "SEO-friendly development approach",
  "User-focused interface and experience",
  "Scalable and secure solutions",
  "Fast-loading and mobile-optimised platforms",
  "Dedicated technical support and maintenance",
  "Customised solutions for every business requirement"
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#FCFCFC] relative z-10 overflow-hidden">


      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <SplitText 
            text="Why Choose WebApp Orbis" 
            tag="h2"
            className="text-4xl md:text-5xl font-bold text-[#17204E] mb-4"
            textAlign="center"
          />
          <p className="text-gray-600 max-w-2xl mx-auto">We don't just build websites. We build scalable digital businesses.</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-3 text-center mb-6 px-6">
            <div className="col-span-1 text-left font-semibold text-gray-600">Features</div>
            <div className="col-span-1 font-semibold text-gray-500">Other Agencies</div>
            <div className="col-span-1 font-bold text-[#17204E] bg-gradient-to-r from-[#057AF8] to-[#8EAAD1] bg-clip-text text-transparent">WebApp Orbis</div>
          </div>

          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="grid grid-cols-3 items-center p-6 rounded-2xl glass hover:bg-[#17204E]/10 transition-colors"
              >
                <div className="col-span-1 text-left text-[#17204E] font-medium">{benefit}</div>
                <div className="col-span-1 flex justify-center">
                  <X className="w-6 h-6 text-red-500/50" />
                </div>
                <div className="col-span-1 flex justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#057AF8]/20 flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#8EAAD1]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
