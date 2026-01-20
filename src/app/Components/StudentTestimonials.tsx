"use client"
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Testimonial = {
  name: string;
  course: string;
  quote: string;
  image: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Sarah Jenkins",
    course: "MSC DATA SCIENCE, NYU",
    quote:
      "AlphaWorld Education helped me navigate the complex US admission process. I got accepted into my dream university with a scholarship!",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Michael Chen",
    course: "MBA, TORONTO",
    quote:
      "The counselors were available 24/7. My visa was rejected once before, but AlphaWorld Education's team got it approved in record time.",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
  {
    name: "Priya Sharma",
    course: "B.ARCH, MELBOURNE",
    quote:
      "I didn't think I could afford Australia, but they found me financial aid options I didn't know existed. Forever grateful.",
    image: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400",
  },
];

export default function StudentTestimonials() {
  return (
    <section id="testimonials" className="bg-gradient-to-br from-slate-50 via-green-50/20 to-white py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-48 h-48 sm:w-80 sm:h-80 bg-green-100 rounded-full blur-[80px] sm:blur-[120px] opacity-30" />
        <div className="absolute bottom-20 left-10 w-64 h-64 sm:w-96 sm:h-96 bg-green-200 rounded-full blur-[80px] sm:blur-[100px] opacity-25" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-6 sm:mb-8">
            <span>⭐</span>
            Success Stories
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-700">Students Say</span>
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4">
            Real stories from real students who've achieved their dreams with our guidance.
            <strong className="text-green-600"> 98.5% satisfaction rate</strong> speaks for itself.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500 text-base sm:text-lg">★</span>
              <span className="font-semibold text-sm sm:text-base">4.9/5 Average Rating</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500 text-base sm:text-lg">✓</span>
              <span className="font-semibold text-sm sm:text-base">Verified Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <span className="text-green-500 text-base sm:text-lg">🏆</span>
              <span className="font-semibold text-sm sm:text-base">Award-Winning Service</span>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-3 sm:gap-4">
            <button className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 border-slate-200 text-slate-600 transition-all hover:bg-green-50 hover:border-green-300 hover:text-green-600 shadow-lg">
              <ArrowLeft size={20} className="sm:w-[24px] sm:h-[24px]" />
            </button>
            <button className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-green-600 text-white transition-all hover:bg-green-700 shadow-lg transform hover:scale-105">
              <ArrowRight size={20} className="sm:w-[24px] sm:h-[24px]" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl sm:rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-sm transition hover:shadow-md"
            >
              {/* Stars */}
              <div className="mb-3 sm:mb-4 flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-sm sm:text-base">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 sm:mb-8 text-base sm:text-lg italic leading-relaxed text-slate-700 line-clamp-4 sm:line-clamp-none">
                “{item.quote}”
              </p>

              {/* User */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 text-sm sm:text-base">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm font-medium uppercase text-green-500 truncate">
                    {item.course}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
