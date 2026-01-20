"use client";

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { useConsultationModal } from '../../contexts/ConsultationModalContext';

const Hero: React.FC = () => {
  const { openModal } = useConsultationModal();
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-white pt-8 pb-4 md:pt-12 md:pb-6 overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 md:w-1/3 h-full bg-slate-50 hidden lg:block" />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

        {/* LEFT COLUMN: CONTENT */}
        <div className="flex flex-col space-y-6 md:space-y-8 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full  text-green-600 text-xs sm:text-sm font-semibold">
            <div className="flex -space-x-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full border-2 border-white bg-green-500" />
              ))}
            </div>
            <span>🌍 +15,000 global students</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] md:leading-[1.1] mb-3 md:mb-4">
            Your gateway to <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-600">
              global education
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-slate-600 mb-4 md:mb-6 max-w-lg leading-relaxed mx-auto lg:mx-0">
            Discover top universities worldwide, explore study abroad opportunities,
            and get expert guidance for your international education journey.
            Your future starts here.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-6 md:mb-8">
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Explore Programs <ArrowRight size={18} />
            </button>

            <button 
              onClick={openModal}
              className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors group w-full sm:w-auto"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <span className="text-sm">📞</span>
              </div>
              <div className="text-left flex-1 sm:flex-none">
                <p className="text-xs text-slate-500 font-medium">Talk to an Expert</p>
                <p className="text-sm font-semibold text-slate-900">Free Consultation</p>
              </div>
            </button>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {[
              'Top-ranked universities worldwide',
              'Personalized study abroad guidance',
              'Visa and admission assistance'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-slate-600">
                <Check size={18} className="text-green-500 flex-shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: VISUAL COMPOSITION */}
        <div className="relative flex justify-center items-center mt-8 lg:mt-0 order-first lg:order-last">
          {/* Main Image Container */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg"
              alt="Students exploring global education opportunities"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating UI: Success Stories Card */}
          <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 md:-left-8 lg:-top-10 lg:-left-12 bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 w-40 sm:w-48 md:w-56 lg:w-64 animate-bounce-subtle z-10">
            <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">Success Stories</p>
            <p className="text-2xl md:text-3xl font-bold mt-1 text-slate-900">98% Success Rate</p>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
               <div>
                 <p className="text-[10px] text-slate-500 uppercase">Students Placed</p>
                 <p className="text-xs font-bold text-green-600">15,000+</p>
               </div>
               <div className="text-right">
                 <p className="text-[10px] text-slate-500 uppercase">Countries</p>
                 <p className="text-xs font-bold text-slate-900">50+</p>
               </div>
            </div>
            <button className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-all">
              View Stories →
            </button>
          </div>

          {/* Floating UI: University Stats Card */}
          <div className="absolute top-1/2 -right-2 sm:-right-4 md:-right-8 lg:-right-12 translate-y-[-50%] bg-white p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 w-40 sm:w-48 md:w-52 lg:w-60 z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 bg-green-100 rounded-lg">
                <span className="text-green-600 text-sm">🎓</span>
              </div>
              <p className="font-bold text-sm text-slate-900">Top Universities</p>
            </div>
            <div className="space-y-3 md:space-y-4">
               {[
                 { label: 'Harvard University', val: 'USA', color: 'bg-green-500' },
                 { label: 'Oxford University', val: 'UK', color: 'bg-green-400' },
                 { label: 'University of Tokyo', val: 'Japan', color: 'bg-green-300' }
               ].map((stat, i) => (
                 <div key={i} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-900">{stat.label}</p>
                      <p className="text-[10px] text-slate-500">{stat.val}</p>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                 </div>
               ))}
            </div>
          </div>

          {/* Floating UI: Quick Stats */}
          <div className="absolute -bottom-4 left-0 sm:-bottom-6 md:-bottom-8 lg:-bottom-10 bg-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 w-40 sm:w-44 md:w-48 lg:w-56 z-10">
            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-2">🌍 Countries</p>
                <p className="text-[10px] text-green-600 font-medium">50+ destinations available</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-900 flex items-center gap-2">📚 Programs</p>
                <p className="text-[10px] text-green-600 font-medium">500+ courses worldwide</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-200 rounded-full blur-3xl opacity-25"></div>
      </div>

      <style jsx>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;