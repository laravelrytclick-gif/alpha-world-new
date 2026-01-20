"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Country, University } from '@/lib/types';

// Countries and Universities data - moved from PopularCountries component to centralized location
const countriesData: Country[] = [
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Ireland', flag: '🇮🇪' },
  { name: 'United States', flag: '🇺🇸' },
  { name: 'United Kingdom', flag: '🇬🇧' },
];

const universitiesData: University[] = [
  {
    id: 1,
    name: 'Western University',
    location: 'London, Ontario, CA',
    logo: 'https://logo.clearbit.com/uwo.ca',
    image: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Since 1878, Western University has been a choice destination for minds seeking the best education at a research university in Canada. Students at Western University can choose from over 400...',
    isFeatured: true,
  },
  {
    id: 2,
    name: 'Laurentian University',
    location: 'Sudbury, Ontario, CA',
    logo: 'https://logo.clearbit.com/laurentian.ca',
    image: 'https://images.pexels.com/photos/1181391/pexels-photo-1181391.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Laurentian University was once only a regional school serving Sudbury, and while it still serves the area well, it has grown into an international leader in niches such as stressed watershed systems...',
    isFeatured: true,
  },
  {
    id: 3,
    name: 'Lakehead University',
    location: 'Thunder Bay, Ontario, CA',
    logo: 'https://logo.clearbit.com/lakeheadu.ca',
    image: 'https://images.pexels.com/photos/207636/pexels-photo-207636.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Lakehead University is small enough to offer the personalized approach to supports and education that allows students to thrive. And they\'re big enough to embody a truly global perspective.',
    isFeatured: true,
  },
];

interface CountriesState {
  countries: Country[];
  universities: University[];
  filteredUniversities: University[];
  activeCountry: string;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

type CountriesAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_COUNTRIES'; payload: Country[] }
  | { type: 'SET_UNIVERSITIES'; payload: University[] }
  | { type: 'SET_ACTIVE_COUNTRY'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'FILTER_UNIVERSITIES' };

const initialState: CountriesState = {
  countries: countriesData,
  universities: universitiesData,
  filteredUniversities: universitiesData,
  activeCountry: 'Canada',
  searchQuery: '',
  isLoading: false,
  error: null,
};

function countriesReducer(state: CountriesState, action: CountriesAction): CountriesState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'SET_COUNTRIES':
      return { ...state, countries: action.payload };

    case 'SET_UNIVERSITIES':
      return { ...state, universities: action.payload };

    case 'SET_ACTIVE_COUNTRY':
      return { ...state, activeCountry: action.payload };

    case 'SET_SEARCH':
      const searchFiltered = state.universities.filter(university =>
        university.name.toLowerCase().includes(action.payload.toLowerCase()) ||
        university.location.toLowerCase().includes(action.payload.toLowerCase()) ||
        university.description.toLowerCase().includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        searchQuery: action.payload,
        filteredUniversities: searchFiltered
      };

    case 'FILTER_UNIVERSITIES':
      // For future filtering logic based on active country or other criteria
      return { ...state, filteredUniversities: state.universities };

    default:
      return state;
  }
}

interface CountriesContextType {
  state: CountriesState;
  actions: {
    setActiveCountry: (country: string) => void;
    setSearchQuery: (query: string) => void;
    getUniversitiesByCountry: (country: string) => University[];
    getFeaturedUniversities: () => University[];
  };
}

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export function CountriesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(countriesReducer, initialState);

  const actions = {
    setActiveCountry: (country: string) => {
      dispatch({ type: 'SET_ACTIVE_COUNTRY', payload: country });
    },

    setSearchQuery: (query: string) => {
      dispatch({ type: 'SET_SEARCH', payload: query });
    },

    getUniversitiesByCountry: (country: string): University[] => {
      // For now, return all universities. In a real app, you'd filter by country
      return state.filteredUniversities;
    },

    getFeaturedUniversities: (): University[] => {
      return state.filteredUniversities.filter(university => university.isFeatured);
    },
  };

  return (
    <CountriesContext.Provider value={{ state, actions }}>
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error('useCountries must be used within a CountriesProvider');
  }
  return context;
}
