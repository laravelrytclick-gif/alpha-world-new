"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Course, CourseFilters, CourseSortOption } from "@/lib/types";
import { Quattrocento } from "next/font/google";

/* ------------------ Constants ------------------ */

const courseCategories = ["All", "Business", "Technology", "Medicine", "Engineering"];

/* ------------------ State ------------------ */

interface CoursesState {
  courses: Course[];
  
  filteredCourses: Course[];
  filters: CourseFilters;
  sortBy: CourseSortOption;
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  selectedCategory: string;
  categories: string[];
  isLoading: boolean;
  error: string | null;
}

type CoursesAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_COURSES"; payload: Course[] }
  | { type: "SET_FILTERS"; payload: Partial<CourseFilters> }
  | { type: "SET_SORT"; payload: CourseSortOption }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_CATEGORY"; payload: string }
  | { type: "RESET_FILTERS" };

const initialState: CoursesState = {
  courses: [],
  filteredCourses: [],
  filters: {},
  sortBy: "title-asc",
  currentPage: 1,
  itemsPerPage: 6,
  searchQuery: "",
  selectedCategory: "All",
  categories: courseCategories,
  isLoading: false,
  error: null,
};


/* ------------------ Reducer ------------------ */

function coursesReducer(state: CoursesState, action: CoursesAction): CoursesState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };

    case "SET_COURSES":
      return {
        ...state,
        courses: action.payload,
        filteredCourses: action.payload,
        isLoading: false,
        error: null,
      };

    case "SET_FILTERS": {
      const filters = { ...state.filters, ...action.payload };
      return {
        ...state,
        filters,
        filteredCourses: applySorting(
          applyFilters(state.courses, filters, state.searchQuery, state.selectedCategory),
          state.sortBy
        ),
        currentPage: 1,
      };
    }

    case "SET_SORT":
      return {
        ...state,
        sortBy: action.payload,
        filteredCourses: applySorting(state.filteredCourses, action.payload),
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
        filteredCourses: applySorting(
          applyFilters(state.courses, state.filters, action.payload, state.selectedCategory),
          state.sortBy
        ),
        currentPage: 1,
      };

    case "SET_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
        filteredCourses: applySorting(
          applyFilters(state.courses, state.filters, state.searchQuery, action.payload),
          state.sortBy
        ),
        currentPage: 1,
      };

    case "SET_PAGE":
      return { ...state, currentPage: action.payload };

    case "RESET_FILTERS":
      return {
        ...state,
        filters: {},
        searchQuery: "",
        selectedCategory: "All",
        filteredCourses: applySorting(state.courses, state.sortBy),
        currentPage: 1,
      };

    default:
      return state;
  }
}

/* ------------------ Helpers ------------------ */

function applyFilters(
  courses: Course[],
  filters: CourseFilters,
  searchQuery: string,
  selectedCategory: string
) {
  return courses.filter((course) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !course.title.toLowerCase().includes(q) &&
        !course.description.toLowerCase().includes(q) &&
        !course.category.toLowerCase().includes(q) &&
        !course.prospects.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    if (selectedCategory !== "All" && course.category !== selectedCategory) {
      return false;
    }

    if (filters.duration && !course.duration.includes(filters.duration)) {
      return false;
    }

    if (
      filters.location &&
      !course.popularIn.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    return true;
  });
}

function applySorting(courses: Course[], sortBy: CourseSortOption) {
  return [...courses].sort((a, b) => {
    if (sortBy === "title-asc") return a.title.localeCompare(b.title);
    if (sortBy === "title-desc") return b.title.localeCompare(a.title);
    return 0;
  });
}

/* ------------------ Context ------------------ */

const CoursesContext = createContext<any>(undefined);

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(coursesReducer, initialState);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const res = await fetch("/api/courses");
        if (!res.ok) throw new Error("Failed to fetch courses");
        const data = await res.json();
        dispatch({ type: "SET_COURSES", payload: data.courses });
      } catch (err: any) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ state, dispatch }}>
      {children}
    </CoursesContext.Provider>
  );
}


export function useCourses() {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses must be used within CoursesProvider");
  }

  const { state, dispatch } = context;

  const getPaginatedCourses = () => {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    return state.filteredCourses.slice(
      startIndex,
      startIndex + state.itemsPerPage
    );
  };

  const getTotalPages = () => {
    return Math.ceil(state.filteredCourses.length / state.itemsPerPage);
  };

  // ✅ ADD THIS
  const getCourseBySlug = (slug: string) => {
    return state.courses.find((course: Course) => course.slug === slug);
  };

  return {
    state,
    dispatch,
    getPaginatedCourses,
    getTotalPages,
    getCourseBySlug, // ✅ EXPOSE
  };
}
