"use client";

import SearchHero from "../Components/SearchHero";
import CollegeCard from "../Components/CollegeCard";
import { useColleges } from "@/contexts/CollegesContext";

export default function CollegesPage() {
  const { state, actions } = useColleges();

  const paginatedUniversities = actions.getPaginatedColleges();
  const totalPages = actions.getTotalPages();

  // Country list for the pill filters shown in your image
  const countries = ["All Countries", "USA", "UK", "Canada", "Australia", "Germany"];

  return (
    <div className="min-h-screen bg-white">
      {/* SearchHero contains the "Explore Top Universities" title and search bar */}
      <SearchHero />

      {/* Main Content Area */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Filter by Country - Horizontal Pill Style */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Filter by Country</h3>
            <div className="flex flex-wrap gap-3">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => actions.setFilters({ location: country === "All Countries" ? "" : country })}
                  className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                    (state.filters.location === country || (country === "All Countries" && !state.filters.location))
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-slate-600 border-slate-200 hover:border-green-400"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="mb-6">
            <p className="text-sm text-slate-500">
              Showing <span className="font-bold text-green-600">{state.filteredColleges.length}</span> universities
            </p>
          </div>

          {/* University Grid - 3 Columns on Large Screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {paginatedUniversities.map((uni) => (
              <CollegeCard key={uni._id} data={uni} />

            ))}
          </div>

          {/* Centered Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => actions.setPage(Math.max(1, state.currentPage - 1))}
                  disabled={state.currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 transition-all"
                >
                  Previous
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => actions.setPage(page)}
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
                  onClick={() => actions.setPage(Math.min(totalPages, state.currentPage + 1))}
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