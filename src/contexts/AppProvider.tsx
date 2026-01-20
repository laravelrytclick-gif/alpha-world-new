"use client";

import React, { ReactNode } from 'react';
import { CollegesProvider } from './CollegesContext';
import { BlogsProvider } from './BlogsContext';
import { CoursesProvider } from './CoursesContext';
import { CountriesProvider } from './CountriesContext';
import { ConsultationModalProvider } from './ConsultationModalContext';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ConsultationModalProvider>
      <CollegesProvider>
        <BlogsProvider>
          <CoursesProvider>
            <CountriesProvider>
              {children}
            </CountriesProvider>
          </CoursesProvider>
        </BlogsProvider>
      </CollegesProvider>
    </ConsultationModalProvider>
  );
}
