import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactForm from "../Components/ContactForm";

export default function ContactPage() {
  return (
    <div className=" bg-slate-50 pt-20 lg:pt-28">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Get In Touch
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto">
              Ready to start your international education journey? We're here to
              guide you every step of the way.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-slate-600 mb-8">
                  Reach out to us through any of the channels below. Our team of
                  education consultants is ready to help you achieve your study
                  abroad goals.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4 sm:space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">
                      Phone
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      +92-305-2223011
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      Mon-Fri: 9AM-6PM PST
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200">
                  <div className="bg-blue-100 p-2 sm:p-3 rounded-lg">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">
                      Email
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      info@alphaworldeducation.com
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200">
                  <div className="bg-green-100 p-2 sm:p-3 rounded-lg">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">
                      Office Address
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base">
                      7A Plaza, near cars&car
                      <br />
                      People Colony 1, Faisalabad
                      <br />
                      Pakistan
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-6 bg-white rounded-lg sm:rounded-xl shadow-sm border border-slate-200">
                  <div className="bg-purple-100 p-2 sm:p-3 rounded-lg">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">
                      Business Hours
                    </h3>
                    <div className="text-slate-600 space-y-1 text-sm sm:text-base">
                      <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p>Saturday: 10:00 AM - 4:00 PM</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4">
                  Why Choose AlphaWorld Education?
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-green-100">Visa Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">5000+</div>
                    <div className="text-green-100">Students Placed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional - you can add Google Maps embed here) */}
    </div>
  );
}