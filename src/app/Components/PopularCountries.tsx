"use client"
import React, { useState } from 'react';
type University = {
  _id: string;
  name: string;
  image?: string;
  logo?: string;
  location?: string;
  description?: string;
  isFeatured?: boolean;
};

const PopularCountries = () => {
  const [activeCountry, setActiveCountry] = useState('Canada');
  const [universities, setUniversities] = useState<University[]>([]);

React.useEffect(() => {
  const fetchUniversities = async () => {
    try {
      const res = await fetch("/api/courses");
      const data = await res.json();

      const coursesArray = Array.isArray(data)
        ? data
        : data.courses ?? [];

      setUniversities(coursesArray);
    } catch (error) {
      console.log("Error fetching universities:", error);
      setUniversities([]);
    }
  };

  fetchUniversities();
}, []);


  // Pill data based on image
  const countries = [
    { name: 'Australia', flag: '🇦🇺' },
    { name: 'Canada', flag: '🇨🇦' },
    { name: 'Germany', flag: '🇩🇪' },
    { name: 'Ireland', flag: '🇮🇪' },
    { name: 'United States', flag: '🇺🇸' },
    { name: 'United Kingdom', flag: '🇬🇧' },
  ];

  // University card data based on image


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
            <span>🌍</span>
            Global Partners
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Trusted</span> Worldwide
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
            Partnering with 1,500+ universities, colleges, and schools across the globe to provide exceptional education opportunities.
          </p>
        </div>

        {/* Country Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 sm:mb-16">
          {countries.map((country) => (
            <button
              key={country.name}
              onClick={() => setActiveCountry(country.name)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-300 font-medium ${
                activeCountry === country.name
                  ? 'bg-green-600 text-white border-green-600 shadow-lg'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <span className="text-xl">{country.flag}</span>
              {country.name}
            </button>
          ))}
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {universities.map((uni) => (
            <div key={uni._id} className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-left group">
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 lg:h-64 w-full overflow-hidden">
                <img src={uni.image} alt={uni.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {uni.isFeatured && (
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Featured
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full border border-slate-100 p-1 flex items-center justify-center bg-white shadow-sm overflow-hidden">
                    <img src={uni.logo} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight group-hover:text-green-600 transition-colors">
                      {uni.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{uni.location}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
                  {uni.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="flex justify-center">
          <button className="flex items-center gap-2 sm:gap-3 bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base">
            Explore More {activeCountry} Institutions
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PopularCountries;