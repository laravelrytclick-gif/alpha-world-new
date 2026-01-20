"use client"
import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Search, ArrowRight, Mail } from 'lucide-react';
import Link from 'next/link';
import { useBlogs } from '@/contexts/BlogsContext';

// --- Components ---
const getImageSrc = (image?: string) => {
  if (!image) return "/placeholder.jpg";

  if (image.startsWith("http")) {
    return image; // Cloudinary / external
  }

  if (image.startsWith("/")) {
    return image; // local public image
  }

  // Mongo se relative path aaya
  return `/uploads/${image}`;
};

const BlogCard = ({ article }: { article: import('@/lib/types').BlogPost }) => (
  <div className="flex flex-col group cursor-pointer bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
    <div className="relative h-56 w-full overflow-hidden">
<Image
  src={getImageSrc(article.image)}
  alt={article.title}
  fill
  className="object-cover transition-transform duration-500 group-hover:scale-105"
/>
      <span className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-md text-xs font-bold uppercase">
        {article.category}
      </span>
    </div>
    <div className="p-6">
      <div className="flex items-center gap-4 text-gray-400 text-xs mb-3">
        <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
        <span className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</span>
      </div>
      <Link href={`/blogs/${article.slug}`} className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-green-600 transition-colors line-clamp-2">
        {article.title}
      </Link>
      <p className="text-gray-500 text-sm line-clamp-2 mb-4">
        {article.description}
      </p>
      {article.author && (
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          <div className="relative w-8 h-8 rounded-full overflow-hidden">
            <Image src={article.author.avatar} alt={article.author.name} fill />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{article.author.name}</p>
          </div>
        </div>
      )}
    </div>
  </div>
);

export default function BlogPage() {
  const { state, actions } = useBlogs();

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Header/Navbar */}
      

      {/* 2. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
        <span className="text-green-500 font-bold text-xs uppercase tracking-widest">AlphaWorld Insights</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mt-4 max-w-2xl leading-tight mx-auto">
          Guides for Your Study Abroad Journey.
        </h1>
        <p className="text-gray-500 mt-4 max-w-md text-base sm:text-lg mx-auto">
          Expert advice on universities, visas, and student life. We help you navigate your path to global education with confidence.
        </p>

        {/* Search & Filters */}
        <div className="mt-8 sm:mt-10 flex flex-col gap-4">
          <div className="relative w-full max-w-md sm:max-w-none">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 sm:w-[18px] sm:h-[18px]" size={16} />
            <input
              type="text"
              placeholder="Search articles, visas, or universities..."
              value={state.searchQuery}
              onChange={(e) => actions.setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-4 py-3 rounded-lg sm:rounded-xl border border-gray-100 bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-sm sm:text-base"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {state.categories.map((cat, i) => (
              <button
                key={cat}
                onClick={() => actions.setCategory(cat)}
                className={`whitespace-nowrap px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all flex-shrink-0 ${
                  cat === state.selectedCategory ? 'bg-black text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Latest Articles Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex justify-between items-end mb-10">
          <h2 className="text-3xl font-black text-slate-900">Latest Articles</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {state.filteredBlogs.slice(0, 6).map((article) => (
            <BlogCard key={article._id} article={article} />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <button
            onClick={actions.loadMore}
            disabled={state.isLoading}
            className="px-8 py-3 rounded-xl border-2 border-gray-100 font-bold text-slate-800 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.isLoading ? 'Loading...' : 'Load More Articles'}
          </button>
        </div>
      </section>

      {/* 5. Newsletter Section */}
     

     
    </div>
  );
}
