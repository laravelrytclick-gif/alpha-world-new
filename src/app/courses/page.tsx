"use client";

import React from "react";
import { Search, Clock, Globe, Banknote, Briefcase, GraduationCap } from "lucide-react";
import { useCourses } from "@/contexts/CoursesContext";
import Link from "next/link";

export default function CoursesPage() {
   const {
    state,
    dispatch,
    getPaginatedCourses,
    getTotalPages,
  } = useCourses();
  const setSearch = (query: string) => {
    dispatch({ type: "SET_SEARCH_QUERY", payload: query });
  }
  const setCategory = (category: string) => {
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
  }
  const setPage = (page: number) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  }
  
  const paginatedCourses = getPaginatedCourses();
  const totalPages = getTotalPages();

  return (
    <div className="min-h-screen bg-white">
      {/* Search Hero Section */}
      <section className="bg-gradient-to-b from-green-50/50 to-white py-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Explore <span className="text-green-600">Popular Courses</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Compare courses across top universities and find your perfect program
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search courses..."
              value={state.searchQuery}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-100 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Filter by Category</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {state.categories.map((cat:any) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all ${
                  state.selectedCategory === cat
                  ? "bg-green-600 text-white border-green-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-green-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-sm text-slate-500 mb-8">
            Showing <span className="font-bold text-green-600">{state.filteredCourses.length}</span> courses
          </p>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {paginatedCourses.map((course:any) => (
              <div key={course._id} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all flex flex-col">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-bold rounded-md uppercase">
                    {course.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h2>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                  {course.description}
                </p>

                {/* Details List */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock size={18} className="text-green-500" />
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold text-slate-700">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe size={18} className="text-green-500" />
                    <span className="text-slate-400">Popular in:</span>
                    <span className="font-semibold text-slate-700">{course.popularIn}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Banknote size={18} className="text-green-500" />
                    <span className="text-slate-400">Avg. Tuition:</span>
                    <span className="font-semibold text-slate-700">{course.avgTuition}</span>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Briefcase size={18} className="text-green-500 mt-0.5" />
                    <div>
                      <span className="text-slate-400">Career Prospects:</span>
                      <p className="font-semibold text-slate-700 mt-1">{course.prospects}</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/courses/${course.slug}`}
                    className="flex-1 border-2 border-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl hover:border-green-300 hover:text-green-600 transition-all duration-200 hover:scale-105 text-center"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/contact?course=${course.slug}`}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-center"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, state.currentPage - 1))}
                  disabled={state.currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`h-10 w-10 rounded-lg text-sm font-medium transition-all ${
                        page === state.currentPage
                          ? "bg-green-600 text-white"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, state.currentPage + 1))}
                  disabled={state.currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 