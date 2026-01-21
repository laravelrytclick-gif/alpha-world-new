"use client";

import React from 'react';
import Image from 'next/image';
import { MapPin, Award, DollarSign, Users, Star, CheckCircle, ArrowLeft, ExternalLink, Calendar, Building2, Globe } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useColleges } from '@/contexts/CollegesContext';

export default function CollegeDetailPage() {
const { actions } = useColleges();
const params = useParams();
const slug = params?.slug as string;

const college = actions.getCollegeBySlug(slug);



if (!college) {
  notFound();
}



  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/colleges" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
          <ArrowLeft size={16} />
          Back to Colleges
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
       <Image
  src={college.image || college.image_url || "/college-placeholder.jpg"}
  alt={college.name}
  fill
  className="object-cover"
  priority
/>

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Rank Badge */}
            <div className="inline-block bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-slate-800 shadow-lg mb-4">
              {college.rank}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
              {college.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/90 mb-6">
              <MapPin size={20} />
              <span className="text-lg font-medium">{college.location}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-6">
              {college.tags?.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30"
                >
                  <CheckCircle size={14} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">About {college.name}</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed mb-6">
                  {college.name} is a prestigious {college.type?.toLowerCase() || 'educational institution'}
                  located in {college.location}. Founded in {college.rating || 'N/A'}, this institution
                  has established itself as a leader in higher education, offering world-class programs
                  and research opportunities.
                </p>

                {college.website && (
                  <div className="flex items-center gap-3 mt-6">
                    <Globe size={20} className="text-green-500" />
                    <a
                      href={college.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2"
                    >
                      Visit Official Website
                      <ExternalLink size={16} />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Key Highlights */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="text-green-500" size={24} />
                    <h4 className="font-semibold text-slate-900">Global Ranking</h4>
                  </div>
                  <p className="text-2xl font-bold text-green-600">{college.rank}</p>
                  <p className="text-sm text-gray-600 mt-1">World University Rankings</p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="text-blue-500" size={24} />
                    <h4 className="font-semibold text-slate-900">Tuition Fees</h4>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{college.tuition}</p>
                  <p className="text-sm text-gray-600 mt-1">Per year</p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="text-purple-500" size={24} />
                    <h4 className="font-semibold text-slate-900">Acceptance Rate</h4>
                  </div>
                  <p className="text-2xl font-bold text-purple-600">{college.admission_process}</p>
                  <p className="text-sm text-gray-600 mt-1">Competitive admissions</p>
                </div>

                {college.contactInfo && (
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-2xl border border-orange-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Building2 className="text-orange-500" size={24} />
                      <h4 className="font-semibold text-slate-900">Employability</h4>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{college.eligibility}</p>
                    <p className="text-sm text-gray-600 mt-1">Graduate employment rate</p>
                  </div>
                )}

                {college.rating && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border border-yellow-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="text-yellow-500 fill-yellow-500" size={24} />
                      <h4 className="font-semibold text-slate-900">Student Rating</h4>
                    </div>
                    <p className="text-2xl font-bold text-yellow-600">{college.rating}</p>
                    <p className="text-sm text-gray-600 mt-1">Based on student reviews</p>
                  </div>
                )}

                {college.eligibility && (
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-2xl border border-indigo-100">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="text-indigo-500" size={24} />
                      <h4 className="font-semibold text-slate-900">Student Body</h4>
                    </div>
                    <p className="text-2xl font-bold text-indigo-600">{college.image_url}</p>
                    <p className="text-sm text-gray-600 mt-1">Total enrolled students</p>
                  </div>
                )}
              </div>
            </div>

            {/* Institution Details */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Institution Details</h3>
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <Calendar className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Founded</p>
                      <p className="font-semibold text-slate-900">{college.location || 'N/A'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Building2 className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Institution Type</p>
                      <p className="font-semibold text-slate-900">{college.type || 'University'}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                      <MapPin className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-semibold text-slate-900">{college.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Award className="text-orange-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Global Ranking</p>
                      <p className="font-semibold text-slate-900">{college.rank}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Ready to Apply?</h3>
                <p className="text-green-100 mb-8 leading-relaxed">
                  Take the next step towards your international education journey.
                  Our expert counselors are here to guide you through the application process.
                </p>

                <div className="space-y-4">
                  <Link
                    href={`/contact?college=${college.slug}`}
                    className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-2xl hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-center block"
                  >
                    Get Free Consultation
                  </Link>

                  <Link
                    href="/courses"
                    className="w-full border-2 border-white/30 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-white/10 transition-all duration-200 text-center block"
                  >
                    Explore Courses
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 text-green-100">
                    <CheckCircle size={16} />
                    <span className="text-sm">Free initial consultation</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-100 mt-2">
                    <CheckCircle size={16} />
                    <span className="text-sm">Application guidance</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-100 mt-2">
                    <CheckCircle size={16} />
                    <span className="text-sm">Visa assistance</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tuition</span>
                    <span className="font-semibold text-slate-900">{college.tuition}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Acceptance</span>
                    <span className="font-semibold text-slate-900">{college.type}</span>
                  </div>
                  {college.eligibility && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Eligibility</span>
                      <span className="font-semibold text-slate-900">{college.eligibility}</span>
                    </div>
                  )}
                  {college.name && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-semibold text-slate-900">{college.established}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Colleges Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore More Colleges</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover other prestigious institutions that might be perfect for your academic journey.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/colleges"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold py-3 px-8 rounded-2xl hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Colleges
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}