"use client";

import { useConsultationModal } from "../../contexts/ConsultationModalContext";

interface BookConsultationButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function BookConsultationButton({
  className = "",
  variant = "primary",
  size = "md",
  children,
  disabled = false
}: BookConsultationButtonProps) {
  const { openModal } = useConsultationModal();

  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white text-green-600 border-2 border-green-500 hover:bg-green-50 shadow-md hover:shadow-lg",
    outline: "bg-transparent text-green-600 border-2 border-green-500 hover:bg-green-50"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      onClick={openModal}
      className={buttonClasses}
      disabled={disabled}
    >
      {children || "Book FREE Consultation"}
    </button>
  );
}
