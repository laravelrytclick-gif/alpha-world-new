import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  GraduationCap,
  Globe,
  Mail,
  Phone,
  SendHorizontal
} from 'lucide-react';
import { SITE_IDENTITY } from '../../site-identity';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-12 px-6 border-t border-slate-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-500 rounded-full blur-[150px] opacity-5" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-green-400 rounded-full blur-[120px] opacity-5" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Newsletter CTA Section */}
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-16">

          {/* Brand Section */}
          <div className="flex flex-col gap-4 sm:gap-6 col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={SITE_IDENTITY.assets.logo.main}
                  alt={SITE_IDENTITY.name}
                  width={50}
                  height={50}
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  AlphaWorld
                </span>
                <span className="text-sm sm:text-base text-gray-300">
                  Education
                </span>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-[15px] max-w-xs">
              {SITE_IDENTITY.description}
            </p>
            <div className="flex gap-3 sm:gap-4 text-gray-400">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-200" />
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-200" />
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:text-green-400 hover:scale-110 transition-all duration-200" />
            </div>
          </div>

          {/* Services Section */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wide">SERVICES</h4>
            <ul className="flex flex-col gap-4 text-gray-300 text-[15px]">
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">University Admissions</Link></li>
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">Visa Counseling</Link></li>
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">Scholarship Guidance</Link></li>
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">Test Preparation</Link></li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h4 className="font-bold text-white mb-6 tracking-wide">COMPANY</h4>
            <ul className="flex flex-col gap-4 text-gray-300 text-[15px]">
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">About Us</Link></li>
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">Success Stories</Link></li>
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">Events</Link></li>
              <li><Link href="#" className="hover:text-green-400 hover:translate-x-1 transition-all duration-200 inline-block">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h4 className="font-bold text-white mb-6 tracking-wide">STAY UPDATED</h4>
            <p className="text-gray-300 text-[15px] mb-6">
              Subscribe to our newsletter for scholarship updates and exclusive insights.
            </p>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent px-4 py-3 w-full outline-none text-white placeholder-gray-400 text-[15px] focus:placeholder-gray-300"
              />
              <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-3.5 hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105">
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 sm:pt-12 lg:pt-16 border-t border-slate-700/50">
          <div className="flex flex-col gap-8 sm:gap-12 mb-6 sm:mb-8">
            <div className="text-center lg:text-left">
              <p className="text-gray-300 text-xs sm:text-sm mb-2 font-medium">© {SITE_IDENTITY.business.established} {SITE_IDENTITY.name}. All rights reserved.</p>
              <p className="text-gray-400 text-xs">{SITE_IDENTITY.tagline}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm">
              <Link href="#" className="text-gray-400 hover:text-green-400 hover:scale-105 transition-all duration-200">Privacy Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 hover:scale-105 transition-all duration-200">Terms of Service</Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 hover:scale-105 transition-all duration-200">Cookie Policy</Link>
              <Link href="#" className="text-gray-400 hover:text-green-400 hover:scale-105 transition-all duration-200">Contact Us</Link>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-gray-300 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm sm:text-lg">●</span>
                <span className="font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400 text-sm sm:text-lg">●</span>
                <span className="font-medium">100% Secure</span>
              </div>
            </div>
          </div>

          {/* Additional Trust Indicators */}
          <div className="pt-6 sm:pt-8 border-t border-slate-700/30">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-xs sm:text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🔒</span>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">📧</span>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">🏆</span>
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span>4.9/5 Trustpilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;