"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { BlogPost, BlogFilters, BlogSortOption } from '@/lib/types';

// Blogs data - moved from blogs page to centralized location


const blogCategories = ["All Topics", "Student Visas", "University Rankings", "Scholarships", "Life Abroad"];

interface BlogsState {
  blogs: BlogPost[];
  filteredBlogs: BlogPost[];
  filters: BlogFilters;
  sortBy: BlogSortOption;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

type BlogsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_BLOGS'; payload: BlogPost[] }
  | { type: 'SET_FILTERS'; payload: Partial<BlogFilters> }
  | { type: 'SET_SORT'; payload: BlogSortOption }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'RESET_FILTERS' };

const initialState: BlogsState = {
  blogs: [],
  filteredBlogs: [],
  filters: {},
  sortBy: 'date-desc',
  currentPage: 1,
  itemsPerPage: 6,
  searchQuery: '',
  selectedCategory: 'All Topics',
  categories: blogCategories,
  isLoading: false,
  error: null,
};

function blogsReducer(state: BlogsState, action: BlogsAction): BlogsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };

    case 'SET_BLOGS':
      return { ...state, blogs: action.payload, filteredBlogs: action.payload };

    case 'SET_FILTERS':
      const newFilters = { ...state.filters, ...action.payload };
      const filtered = applyFilters(state.blogs, newFilters, state.searchQuery, state.selectedCategory);
      const sorted = applySorting(filtered, state.sortBy);
      return {
        ...state,
        filters: newFilters,
        filteredBlogs: sorted,
        currentPage: 1
      };

    case 'SET_SORT':
      const sortedBlogs = applySorting(state.filteredBlogs, action.payload);
      return { ...state, sortBy: action.payload, filteredBlogs: sortedBlogs, currentPage: 1 };

    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };

    case 'SET_SEARCH':
      const searchFiltered = applyFilters(state.blogs, state.filters, action.payload, state.selectedCategory);
      const searchSorted = applySorting(searchFiltered, state.sortBy);
      return {
        ...state,
        searchQuery: action.payload,
        filteredBlogs: searchSorted,
        currentPage: 1
      };

    case 'SET_CATEGORY':
      const categoryFiltered = applyFilters(state.blogs, state.filters, state.searchQuery, action.payload);
      const categorySorted = applySorting(categoryFiltered, state.sortBy);
      return {
        ...state,
        selectedCategory: action.payload,
        filteredBlogs: categorySorted,
        currentPage: 1
      };

    case 'RESET_FILTERS':
      const resetFiltered = applySorting(state.blogs, state.sortBy);
      return {
        ...state,
        filters: {},
        searchQuery: '',
        selectedCategory: 'All Topics',
        filteredBlogs: resetFiltered,
        currentPage: 1
      };

    default:
      return state;
  }
}

function applyFilters(blogs: BlogPost[], filters: BlogFilters, searchQuery: string, selectedCategory: string): BlogPost[] {
  return blogs.filter(blog => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = blog.title.toLowerCase().includes(query) ||
                           blog.description.toLowerCase().includes(query) ||
                           blog.category.toLowerCase().includes(query) ||
                           (blog.author?.name.toLowerCase().includes(query));
      if (!matchesSearch) return false;
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'All Topics' && blog.category !== selectedCategory) {
      return false;
    }

    // Date range filter
    if (filters.dateRange) {
      const blogDate = new Date(blog.date);
      const startDate = new Date(filters.dateRange[0]);
      const endDate = new Date(filters.dateRange[1]);
      if (blogDate < startDate || blogDate > endDate) {
        return false;
      }
    }

    return true;
  });
}

function applySorting(blogs: BlogPost[], sortBy: BlogSortOption): BlogPost[] {
  return [...blogs].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'read-time-asc':
        return parseInt(a.readTime) - parseInt(b.readTime);
      case 'read-time-desc':
        return parseInt(b.readTime) - parseInt(a.readTime);
      default:
        return 0;
    }
  });
}

interface BlogsContextType {
  state: BlogsState;
  actions: {
    setFilters: (filters: Partial<BlogFilters>) => void;
    setSort: (sortBy: BlogSortOption) => void;
    setPage: (page: number) => void;
    setSearch: (query: string) => void;
    setCategory: (category: string) => void;
    resetFilters: () => void;
    getBlogBySlug: (slug: string) => BlogPost | undefined;
    getPaginatedBlogs: () => BlogPost[];
    getTotalPages: () => number;
    loadMore: () => void;
  };
}

const BlogsContext = createContext<BlogsContextType | undefined>(undefined);

export function BlogsProvider({ children }: { children: ReactNode }) {
  // const [blogsData, setBlogsData] = React.useState<BlogPost[]>([]);

    const [state, dispatch] = useReducer(blogsReducer, initialState);

  useEffect(() => {
    const fetchBlogs = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
dispatch({
  type: "SET_BLOGS",
  payload: Array.isArray(data.blogs) ? data.blogs : [],
});

      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    fetchBlogs();
  }, []);
  const actions = {
    setFilters: (filters: Partial<BlogFilters>) => {
      dispatch({ type: 'SET_FILTERS', payload: filters });
    },

    setSort: (sortBy: BlogSortOption) => {
      dispatch({ type: 'SET_SORT', payload: sortBy });
    },

    setPage: (page: number) => {
      dispatch({ type: 'SET_PAGE', payload: page });
    },

    setSearch: (query: string) => {
      dispatch({ type: 'SET_SEARCH', payload: query });
    },

    setCategory: (category: string) => {
      dispatch({ type: 'SET_CATEGORY', payload: category });
    },

    resetFilters: () => {
      dispatch({ type: 'RESET_FILTERS' });
    },

    getBlogBySlug: (slug: string): BlogPost | undefined => {
      return state.blogs.find(blog => blog.slug === slug);
    },

    getPaginatedBlogs: (): BlogPost[] => {
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      return state.filteredBlogs.slice(startIndex, startIndex + state.itemsPerPage);
    },

    getTotalPages: (): number => {
      return Math.ceil(state.filteredBlogs.length / state.itemsPerPage);
    },

    loadMore: () => {
      const newItemsPerPage = state.itemsPerPage + 6;
      dispatch({ type: 'SET_LOADING', payload: true });
      // Simulate API call delay
      setTimeout(() => {
        dispatch({ type: 'SET_LOADING', payload: false });
        // In a real app, this would load more data from an API
        // For now, we'll just increase the items per page
      }, 500);
    },
  };

  return (
    <BlogsContext.Provider value={{ state, actions }}>
      {children}
    </BlogsContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogsContext);
  if (context === undefined) {
    throw new Error('useBlogs must be used within a BlogsProvider');
  }
  return context;
}
