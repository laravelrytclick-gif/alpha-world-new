"use client";

import React from 'react';
import Image from 'next/image';
import { Clock, Globe, Banknote, Briefcase, ArrowLeft, CheckCircle, BookOpen, Award, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { useCourses } from '@/contexts/CoursesContext';

export default function CourseDetailPage() {
  const { actions } = useCourses();
  const params = useParams();
  const slug = params.slug as string;

  // Find the course by slug
  const course = actions.getCourseBySlug(slug);

  // If course not found, show 404
  if (!course) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Link href="/courses" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
          <ArrowLeft size={16} />
          Back to Courses
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-6">
            {/* Category Badge */}
            <div className="inline-block bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-slate-800 shadow-lg mb-6">
              {course.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 leading-tight">
              {course.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              {course.description}
            </p>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-bold text-slate-900">{course.duration}</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Popular In</p>
                <p className="font-bold text-slate-900">{course.popularIn}</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Banknote className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Tuition</p>
                <p className="font-bold text-slate-900">{course.avgTuition}</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <Briefcase className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Career Path</p>
                <p className="font-bold text-slate-900 text-sm">{course.prospects.split(',')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview Section */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Course Overview</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">
                  {course.overview}
                </p>
              </div>
            </div>

            {/* Curriculum Section */}
            {course.curriculum && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Curriculum</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.curriculum.map((subject, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                        <span className="font-medium text-slate-900">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Requirements Section */}
            {course.requirements && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Admission Requirements</h3>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8">
                  <div className="space-y-4">
                    {course.requirements.map((requirement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Award className="text-orange-500 flex-shrink-0 mt-0.5" size={20} />
                        <span className="text-slate-700 leading-relaxed">{requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Career Path Section */}
            {course.careerPath && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Career Opportunities</h3>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
                  <div className="flex items-start gap-4">
                    <TrendingUp className="text-green-500 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-lg text-slate-700 leading-relaxed mb-4">
                        {course.careerPath}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {course.prospects.split(',').map((career, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full text-sm font-medium text-green-700 border border-green-200"
                          >
                            <Users size={14} />
                            {career.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - CTA Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Ready to Apply?</h3>
                <p className="text-green-100 mb-8 leading-relaxed">
                  Take the first step towards your academic journey. Our expert counselors
                  will guide you through the application process and help you choose the
                  right program.
                </p>

                <div className="space-y-4">
                  <Link
                    href={`/contact?course=${course.slug}`}
                    className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-2xl hover:bg-green-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 text-center block"
                  >
                    Get Free Consultation
                  </Link>

                  <Link
                    href="/courses"
                    className="w-full border-2 border-white/30 text-white font-semibold py-4 px-6 rounded-2xl hover:bg-white/10 transition-all duration-200 text-center block"
                  >
                    Explore More Courses
                  </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-3 text-green-100">
                    <CheckCircle size={16} />
                    <span className="text-sm">Free application review</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-100 mt-2">
                    <CheckCircle size={16} />
                    <span className="text-sm">Visa guidance included</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-100 mt-2">
                    <CheckCircle size={16} />
                    <span className="text-sm">Career counseling</span>
                  </div>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="font-bold text-slate-900 mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Category</span>
                    <span className="font-semibold text-slate-900">{course.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-semibold text-slate-900">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Tuition</span>
                    <span className="font-semibold text-slate-900">{course.avgTuition}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Courses Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore More Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover other programs that might be perfect for your academic and career goals.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-green-500 text-white font-semibold py-3 px-8 rounded-2xl hover:bg-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View All Courses
              <ArrowLeft size={16} className="rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
