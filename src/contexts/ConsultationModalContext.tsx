"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ConsultationModalContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType | undefined>(undefined);

interface ConsultationModalProviderProps {
  children: ReactNode;
}

export function ConsultationModalProvider({ children }: ConsultationModalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <ConsultationModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </ConsultationModalContext.Provider>
  );
}

export function useConsultationModal() {
  const context = useContext(ConsultationModalContext);
  if (context === undefined) {
    throw new Error('useConsultationModal must be used within a ConsultationModalProvider');
  }
  return context;
}
