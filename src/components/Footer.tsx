import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#FCFCFC] pt-24 pb-12 overflow-hidden border-t border-[#17204E]/5">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <img src="/logo.png" alt="WebApp Orbis Logo" className="h-[120px] w-auto object-contain" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
              Building Digital Experiences That Drive Growth. We create high-end websites and applications.
            </p>
          </div>

          <div>
            <h4 className="text-[#17204E] font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="#" className="hover:text-[#17204E] transition-colors">Web Development</Link></li>
              <li><Link href="#" className="hover:text-[#17204E] transition-colors">Mobile Apps</Link></li>
              <li><Link href="#" className="hover:text-[#17204E] transition-colors">UI/UX Design</Link></li>
              <li><Link href="#" className="hover:text-[#17204E] transition-colors">SEO & Marketing</Link></li>
              <li><Link href="#" className="hover:text-[#17204E] transition-colors">AI Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#17204E] font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-[#17204E] transition-colors">About Us</Link></li>
              <li><Link href="/portfolio" className="hover:text-[#17204E] transition-colors">Portfolio</Link></li>
              <li><Link href="/careers" className="hover:text-[#17204E] transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-[#17204E] transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-[#17204E] transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#17204E] font-semibold mb-6">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">Subscribe to get the latest design news and updates.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-[#17204E]/5 border border-[#17204E]/10 rounded-lg px-4 py-2 text-sm text-[#17204E] focus:outline-none focus:border-[#057AF8] w-full"
              />
              <button 
                type="button"
                className="bg-[#057AF8] text-[#17204E] p-2 rounded-lg hover:bg-[#4338CA] transition-colors flex items-center justify-center group"
              >
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-[#17204E]/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} WebApp Orbis. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#17204E] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[#17204E] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
