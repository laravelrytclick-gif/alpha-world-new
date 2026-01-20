"use client";

import { X, Phone } from "lucide-react";
import ContactForm from "./ContactForm";
import { useConsultationModal } from "../../contexts/ConsultationModalContext";

export default function ConsultationModal() {
  const { isModalOpen, closeModal } = useConsultationModal();

  if (!isModalOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={closeModal}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-w-sm sm:max-w-md mx-4 transform transition-all duration-300 scale-100 z-10">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute -top-2 -right-2 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="text-xl font-bold">
                Ready to Start Your Journey?
              </h3>
              <p className="text-green-100 text-sm mt-1">
                Let's connect and discuss your options
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <ContactForm
            onClose={closeModal}
            isModal={true}
          />
        </div>
      </div>
    </div>
  );
}

