"use client"
import React, { use, useState,useEffect } from "react";
import {
  MapPin,
  Heart,
  ExternalLink,
  Search,
  ChevronDown,
  Filter,
  BookOpen,
  Wrench,
  Building2,
  Briefcase,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
type College = {
  name: string;
  location: string;
  slug: string;
  tuition: string;
  acceptance: string;
  undergrad: string;
  satRange: string;
  image: string;
  isTopRated?: boolean;
  typeIcon: React.ReactNode;
};


export default function FeaturedColleges() {
  const [collegeData,setCollegeData] = useState<College[]>([]);
useEffect(() => {
    fetch("/api/colleges")
      .then((res) => res.json())
      .then((data) => {
       
        setCollegeData(
          Array.isArray(data.colleges) ? data.colleges.slice(0, 6) : []
        );
      })
      .catch((error) => {
        console.error("Error fetching colleges:", error);
      });
  }, []);
    // Simulate fetching data from an API
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-white via-green-50/20 to-slate-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-32 left-20 w-48 h-48 sm:w-80 sm:h-80 bg-green-100 rounded-full blur-[80px] sm:blur-[120px] opacity-30" />
        <div className="absolute bottom-32 right-20 w-64 h-64 sm:w-96 sm:h-96 bg-green-200 rounded-full blur-[80px] sm:blur-[100px] opacity-25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
            <span>🎓</span>
            Featured Colleges
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Top</span> Universities
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
            Discover world-class institutions that can transform your academic journey and career prospects.
          </p>

          {/* College stats */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">🏆</span>
              <span className="font-semibold text-sm sm:text-base">Ranked Institutions</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">🌍</span>
              <span className="font-semibold text-sm sm:text-base">Global Recognition</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500">📈</span>
              <span className="font-semibold text-sm sm:text-base">High Employability</span>
            </div>
          </div>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {collegeData.map((college, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
                <img src={college.image} alt={college.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-colors">
                  <Heart size={18} />
                </button>
                {college.isTopRated && (
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Top Rated
                  </span>
                )}
              </div>

              {/* Content Container */}
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors">{college.name}</h3>
                    <div className="flex items-center gap-1.5 text-slate-500 text-sm">
                      <MapPin size={14} className="text-green-500" />
                      {college.location}
                    </div>
                  </div>
                  <div className="p-2 bg-green-50 rounded-lg">{college.typeIcon}</div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 gap-x-4 border-t border-slate-100 pt-4 mb-6">
                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold mb-1">Tuition</p>
                    <p className="text-sm font-semibold text-slate-700">{college.tuition}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold mb-1">Acceptance</p>
                    <p className="text-sm font-semibold text-green-600">{college.acceptance}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold mb-1">Undergrad</p>
                    <p className="text-sm font-semibold text-slate-700">{college.undergrad}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase text-slate-400 font-bold mb-1">SAT Range</p>
                    <p className="text-sm font-semibold text-slate-700">{college.satRange}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer flex-1">
                    <input type="checkbox" className="rounded border-slate-300 text-green-600 focus:ring-green-500" />
                    {/* <span className="text-xs text-slate-500">Compare</span> */}
                  </label>
  <Link href={`/colleges/${college.slug}`}>

  <button className="flex items-center gap-1.5 text-green-600 font-bold text-sm hover:text-green-700 transition-all group/btn">
    View Profile
    <ArrowRight
      size={14}
      className="transition-transform group-hover/btn:translate-x-1"
    />
  </button>
</Link>

                </div>
              </div>
        </div>
      ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12 sm:mt-16">
          <button className="flex items-center gap-2 sm:gap-3 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
            View All Colleges
            <ArrowRight size={18} className="sm:w-[20px] sm:h-[20px]" />
          </button>
        </div>
      </div>
    </section>
  );
}