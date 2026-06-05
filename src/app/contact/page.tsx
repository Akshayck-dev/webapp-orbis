"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react";
import StarBorder from "@/components/ui/StarBorder";
import { FilterSelect } from "@/components/ui/FilterSelect";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [projectType, setProjectType] = useState("Website Development");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column - Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Let's build something extraordinary.</h1>
            <p className="text-xl text-gray-600 mb-12 max-w-lg">
              Ready to take your digital presence to the next level? Reach out to our team to discuss your next big project.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#057AF8] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#17204E] font-semibold mb-1">Email Us</h4>
                  <a href="mailto:hello@unlock360.agency" className="text-gray-600 hover:text-[#17204E] transition-colors">
                    hello@unlock360.agency
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#057AF8] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#17204E] font-semibold mb-1">Call Us</h4>
                  <a href="tel:+1234567890" className="text-gray-600 hover:text-[#17204E] transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full glass flex items-center justify-center text-[#057AF8] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[#17204E] font-semibold mb-1">Headquarters</h4>
                  <p className="text-gray-600">
                    100 Innovation Drive<br />
                    Suite 400<br />
                    San Francisco, CA 94103
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden"
          >
            {formStatus === "success" ? (
              <div className="text-center py-24">
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-[#17204E] mb-4">Message Sent!</h3>
                <p className="text-gray-600">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-bold text-[#17204E] mb-8">Send us a message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">First Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-[#17204E]/5 border border-[#17204E]/10 rounded-xl px-4 py-3 text-[#17204E] focus:outline-none focus:border-[#057AF8] transition-colors"
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Last Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full bg-[#17204E]/5 border border-[#17204E]/10 rounded-xl px-4 py-3 text-[#17204E] focus:outline-none focus:border-[#057AF8] transition-colors"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-[#17204E]/5 border border-[#17204E]/10 rounded-xl px-4 py-3 text-[#17204E] focus:outline-none focus:border-[#057AF8] transition-colors"
                    placeholder="john@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Project Type</label>
                  <FilterSelect 
                    value={projectType}
                    onChange={setProjectType}
                    options={["Website Development", "Mobile App", "ERP/CRM System", "UI/UX Design", "Other"]}
                    className="w-full bg-[#17204E]/5 border border-[#17204E]/10 text-[#17204E] py-3 shadow-none !rounded-xl hover:border-[#057AF8]/50 focus:ring-[#057AF8]/10"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600">Project Details</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-[#17204E]/5 border border-[#17204E]/10 rounded-xl px-4 py-3 text-[#17204E] focus:outline-none focus:border-[#057AF8] transition-colors resize-none"
                    placeholder="Tell us about your goals..."
                  ></textarea>
                </div>

                <StarBorder type="submit" color="#8EAAD1" speed="3s" className="w-full mt-4 hover-target group">
                  <span className="flex items-center justify-center gap-2">
                    {formStatus === "submitting" ? "Sending..." : "Submit Inquiry"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </StarBorder>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
