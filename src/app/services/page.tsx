"use client";

import BlurText from "@/components/ui/BlurText";
import { motion } from "framer-motion";
import { Globe, Smartphone, Database, Zap, CheckCircle } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import Link from "next/link";
import SplitText from "@/components/ui/SplitText";

const serviceDetails = [
  {
    icon: Globe,
    title: "Website Designing & Development",
    desc: "We create professional websites that combine modern design with advanced functionality. Our websites are developed to deliver fast performance, responsive layouts, and seamless user experiences across desktops, tablets, and mobile devices.",
    bulletLabel: "Our Website Services Include",
    bullets: [
      "Corporate website development",
      "Business and portfolio websites",
      "E-commerce website development",
      "Responsive web design",
      "Custom web application development",
      "Website maintenance and support",
      "UI and UX design solutions",
      "SEO-friendly website structure"
    ],
    closing: "Our goal is to build websites that not only look visually appealing but also improve user engagement and business conversions.",
    color: "#8EAAD1"
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    desc: "We develop customised mobile applications designed to improve customer accessibility and business operations. Our applications are built with modern technologies to ensure smooth performance, security, and scalability.",
    bulletLabel: "Our App Development Services Include",
    bullets: [
      "Android app development",
      "iOS app development",
      "Cross-platform mobile applications",
      "Business application development",
      "E-commerce mobile applications",
      "Custom application interfaces",
      "App maintenance and updates",
      "Secure and scalable app architecture"
    ],
    closing: "We focus on delivering user-friendly mobile experiences that support business growth and customer interaction.",
    color: "#057AF8"
  },
  {
    icon: Database,
    title: "ERP Software Development",
    desc: "Our ERP solutions are designed to simplify and automate business operations through integrated management systems. We develop customised ERP software that improves productivity, workflow efficiency, and data management across departments.",
    bulletLabel: "Our ERP Services Include",
    bullets: [
      "Custom ERP software development",
      "Inventory and stock management systems",
      "Human resource management systems",
      "Accounting and finance modules",
      "CRM and customer management systems",
      "Reporting and analytics integration",
      "Workflow automation solutions",
      "ERP maintenance and support"
    ],
    closing: "Our ERP platforms are designed to provide businesses with better operational control, real-time data access, and improved decision-making capabilities.",
    color: "#8B5CF6"
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mb-24">
          <div className="w-full text-center">
            <SplitText 
              text="Our Services" 
              tag="h1"
              className="text-5xl md:text-7xl font-bold mb-8 text-[#17204E]"
              textAlign="center"
            />
          </div>
          <div className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            <BlurText 
              text="We provide comprehensive digital solutions designed to help businesses strengthen their online presence, improve operational efficiency, and enhance customer engagement. Our services combine modern technology, creative design, and strategic development to deliver reliable business solutions."
              delay={300}
            />
          </div>
        </div>

        {/* Detailed Services Sections */}
        <div className="space-y-32 mb-32">
          {serviceDetails.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start"
            >
              <div className="sticky top-32">
                <div 
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8"
                  style={{ backgroundColor: `${service.color}15`, color: service.color }}
                >
                  <service.icon className="w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#17204E] mb-6">{service.title}</h2>
                <p className="text-xl text-gray-600 leading-relaxed mb-8">{service.desc}</p>
                <div className="p-6 rounded-2xl bg-[#17204E]/5 border border-[#17204E]/10 inline-block">
                  <p className="text-[#17204E] font-medium italic">
                    "{service.closing}"
                  </p>
                </div>
              </div>

              <div className="glass p-8 md:p-12 rounded-[2rem]">
                <h3 className="text-2xl font-bold text-[#17204E] mb-8 pb-6 border-b border-[#17204E]/10">
                  {service.bulletLabel}
                </h3>
                <ul className="space-y-6">
                  {service.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-4 text-gray-700 text-lg">
                      <CheckCircle 
                        className="w-6 h-6 shrink-0 mt-0.5" 
                        style={{ color: service.color }} 
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Digital Solutions / Call to Action */}
        <div className="relative p-12 md:p-20 rounded-[3rem] overflow-hidden text-center glass border border-[#17204E]/10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#057AF8]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <Zap className="w-12 h-12 text-[#8EAAD1] mx-auto mb-8" />
            <h2 className="text-4xl md:text-5xl font-bold text-[#17204E] mb-8">
              Custom Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              In addition to our core services, we provide customised digital solutions tailored to unique business requirements. We work closely with businesses to develop scalable platforms that support operational growth and digital transformation.
            </p>
            <h3 className="text-2xl font-semibold text-[#17204E] mb-12">
              Delivering Reliable Technology Solutions
            </h3>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              We are committed to providing innovative digital services that combine functionality, design quality, and long-term performance. Whether you require a professional website, a mobile application, or a complete ERP system, we deliver solutions designed to support your business success.
            </p>

            <Link href="/contact">
              <StarBorder color="#057AF8" speed="4s" className="hover-target">
                <span className="font-semibold px-4">Start Your Project Today</span>
              </StarBorder>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
