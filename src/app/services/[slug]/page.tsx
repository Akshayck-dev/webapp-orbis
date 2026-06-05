"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProcessSection from "@/components/home/ProcessSection";

// Define the content for each service slug
const serviceData = {
  "website-design": {
    title: "Website Designing & Development",
    subtitle: "Your website is often the first impression of your business. We design and develop visually appealing, fast-loading, and mobile-friendly websites that reflect your brand identity while delivering a smooth browsing experience. Our websites are built with user engagement, search visibility, and conversion-focused layouts in mind.\n\nWhether you require a corporate website, portfolio, e-commerce platform, or custom web application, we provide scalable solutions that combine creativity with functionality.",
    video: "/webdevelpmnt.mp4",
    stats: {
      left: { value: "700+", label: "Projects\nWorldwide." },
      middle: { value: "100+", label: "Impactful\nTransformations" },
      right: { value: "10M+", label: "Daily\nEngagement" }
    },
    offers: [
      {
        title: "Dashboard Designing",
        desc: "We develop intuitive user interfaces that transform raw data into actionable data through intelligent data visualization and clean user interface design.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Ui / Ux Consulting",
        desc: "Our UI/UX service examines the behaviour of users, interface, and flow of interaction to form experiences that would be straightforward, efficient, and involved to the current users.",
        image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Wireframe Design",
        desc: "We create skeletal blueprints that represent the structure and functional aspects of a digital product, ensuring clear layout and navigation before adding visual details.",
        image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Product Designing",
        desc: "From ideation to launch, we design products that solve real problems, combining aesthetics with functionality for an exceptional end-to-end user experience.",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "mobile-apps": {
    title: "Mobile App Development",
    subtitle: "Bring your business closer to your customers with innovative mobile applications designed for Android and iOS platforms. Our app development services focus on intuitive user interfaces, seamless functionality, and reliable performance to help businesses enhance customer interaction and accessibility.\n\nWe develop customised applications for businesses across various industries, ensuring every app is secure, efficient, and aligned with your operational goals.",
    video: "/mobile app.mp4",
    stats: {
      left: { value: "500+", label: "Apps\nLaunched." },
      middle: { value: "50+", label: "Enterprise\nSolutions" },
      right: { value: "5M+", label: "Active\nUsers" }
    },
    offers: [
      {
        title: "iOS Development",
        desc: "Custom iOS applications built with Swift and SwiftUI, ensuring high performance, security, and a native Apple experience.",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "Android Development",
        desc: "Robust Android apps developed using Kotlin, optimized for a vast array of devices and screen sizes across the Android ecosystem.",
        image: "https://images.unsplash.com/photo-1607252656733-fd7458dc3585?auto=format&fit=crop&q=80&w=800"
      }
    ]
  },
  "erp-solutions": {
    title: "ERP Solutions",
    subtitle: "Simplify business operations with intelligent ERP systems designed to improve productivity and workflow management. Our ERP solutions integrate multiple business functions into one efficient platform, helping organisations manage resources, operations, customer relationships, inventory, finance, and reporting with ease.\n\nWe create flexible ERP systems tailored to your business structure, enabling better decision-making and operational efficiency.",
    video: "/sas.mp4",
    stats: {
      left: { value: "200+", label: "Enterprise\nClients." },
      middle: { value: "99%", label: "Process\nEfficiency" },
      right: { value: "24/7", label: "System\nReliability" }
    },
    offers: [
      {
        title: "Custom ERP Development",
        desc: "Tailored enterprise resource planning software that perfectly aligns with your unique business processes and operational requirements.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800"
      },
      {
        title: "System Integration",
        desc: "Seamless connection of your disparate software tools into a unified, centralized platform for better data flow and decision making.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
      }
    ]
  }
};

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const data = serviceData[resolvedParams.slug as keyof typeof serviceData];

  if (!data) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen text-[#17204E]">
      
      {/* Hero Section */}
      <div className="pt-40 pb-20 px-6 md:px-12 flex flex-col items-center justify-center text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#17204E]"
        >
          {data.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto mb-16 leading-relaxed whitespace-pre-line"
        >
          {data.subtitle}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full max-w-[1400px] mx-auto h-[60vh] md:h-[80vh] relative rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/10"
        >
          <video 
            src={data.video} 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </div>



      {/* Live Excellence Section */}
      <div className="py-24 px-6 md:px-12 bg-white flex flex-col items-center">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#17204E] mb-6">
            Live Excellence with User Centric Design.
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            All of our interfaces are directed towards research and usability principles, which provide smooth interactions and the consistency of digital experiences across platforms.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center relative w-full max-w-6xl mx-auto mt-8">
          <div className="flex flex-col md:flex-row items-center justify-center md:-space-x-[4.5rem] relative w-full gap-8 md:gap-0">
            {/* Left Circle */}
            <div className="w-[360px] h-[360px] rounded-full border border-[#2ecc71] flex flex-col items-center justify-center bg-transparent z-10 relative shrink-0">
              <h3 className="text-7xl md:text-8xl font-light text-[#17204E]">{data.stats.left.value.replace('+', '')}<span className="text-[#2ecc71] text-5xl align-top">+</span></h3>
              <p className="text-base mt-4 text-center text-[#17204E] whitespace-pre-line leading-snug">{data.stats.left.label}</p>
              
              {/* Orbiting Dot Container */}
              <div className="absolute inset-0 animate-[spin_15s_linear_infinite] rounded-full pointer-events-none hidden md:block">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#2ecc71] rounded-full opacity-90 shadow-[0_0_12px_rgba(46,204,113,0.8)]"></div>
              </div>
            </div>
            
            {/* Middle Circle */}
            <div className="w-[360px] h-[360px] rounded-full border border-[#2ecc71] flex flex-col items-center justify-center bg-transparent z-20 relative shrink-0">
              <p className="text-base mb-6 text-center text-[#17204E] whitespace-pre-line leading-snug">{data.stats.middle.label}</p>
              <h3 className="text-7xl md:text-8xl font-light text-[#17204E]">{data.stats.middle.value.replace('+', '')}<span className="text-[#2ecc71] text-5xl align-top">+</span></h3>
              
              {/* Orbiting Dot Container (Different speed and reverse direction) */}
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite_reverse] rounded-full pointer-events-none hidden md:block">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#2ecc71] rounded-full opacity-90 shadow-[0_0_12px_rgba(46,204,113,0.8)]"></div>
              </div>
            </div>
            
            {/* Right Circle */}
            <div className="w-[360px] h-[360px] rounded-full border border-[#2ecc71] flex flex-col items-center justify-center bg-transparent z-10 relative shrink-0">
              <h3 className="text-7xl md:text-8xl font-light text-[#17204E]">{data.stats.right.value.replace('+', '')}<span className="text-[#2ecc71] text-5xl align-top">+</span></h3>
              <p className="text-base mt-4 text-center text-[#17204E] whitespace-pre-line leading-snug">{data.stats.right.label}</p>
              
              {/* Orbiting Dot Container */}
              <div className="absolute inset-0 animate-[spin_12s_linear_infinite] rounded-full pointer-events-none hidden md:block" style={{ animationDelay: '-4s' }}>
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#2ecc71] rounded-full opacity-90 shadow-[0_0_12px_rgba(46,204,113,0.8)]"></div>
              </div>
            </div>
          </div>
          
          <button className="mt-16 px-6 py-2 bg-[#111] text-white rounded-full flex items-center gap-3 hover:bg-black transition-colors text-xs font-semibold z-20 relative tracking-wide uppercase">
            Let's Create Together
            <span className="w-7 h-7 rounded-full bg-[#133022] flex items-center justify-center">
              <ArrowRight className="w-3.5 h-3.5 text-[#2ecc71]" strokeWidth={3} />
            </span>
          </button>
        </div>
      </div>

      {/* What We Offer Section */}
      <div className="py-24 px-6 md:px-12 bg-[#F6F7F9]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#17204E] mb-12">
            What We Offer
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.offers.map((offer, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm"
              >
                <div className="relative h-64 w-full">
                  <Image src={offer.image} alt={offer.title} fill className="object-cover" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-[#17204E] mb-4">{offer.title}</h3>
                  <p className="text-base text-gray-600 leading-relaxed mb-6 flex-1 pr-4">
                    {offer.desc}
                  </p>
                  <Link href="#" className="text-[#2ecc71] text-xs font-bold flex items-center gap-2 hover:opacity-80 transition-opacity mt-auto">
                    Explore Now <ArrowRight className="w-3 h-3" strokeWidth={3} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Process Timeline */}
      <ProcessSection />

    </div>
  );
}
