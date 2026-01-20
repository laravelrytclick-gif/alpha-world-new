"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

export type College = {
  _id: string;
  name: string;
  location: string;
     
  type: string;
  rank: string;
  tuition: string;
  established: string;
  newArrivals: boolean;
  newsArticles: string[];
  contactInfo : {
    address: string;
    pincode: string;
    phone: string;
  };
  overview: string;
  highlights: string[];
  eligibility: string;
  duration: string;
  level: string;
  fees: string;
  description: string;
  admission_process: string;
  website: string;
  image_url: string;
  ranking : string;
  courseCount: number;
  rating: string;
  image: string;
  tags: string[];
  status: string;
};

type Filters = {
  location?: string;
};

type CollegesContextType = {
  state: {
    colleges: College[];
    filteredColleges: College[];
    filters: Filters;
    currentPage: number;
  };
  actions: {
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    setPage: (page: number) => void;
    getPaginatedColleges: () => College[];
    getTotalPages: () => number;
    refetch: () => Promise<void>;
  };
};

const CollegesContext = createContext<CollegesContextType | null>(null);

export function CollegesProvider({ children }: { children: React.ReactNode }) {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [filters, setFilters] = useState<Filters>({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const fetchColleges = useCallback(async () => {
    try {
      const res = await fetch("/api/colleges");
      const data = await res.json();

      setColleges(Array.isArray(data.colleges) ? data.colleges : []);
    } catch (error) {
      console.error("Failed to fetch colleges", error);
      setColleges([]);
    }
  }, []);
useEffect(() => {
  console.log("UPDATED colleges:", colleges);
}, [colleges]);

  useEffect(() => {
    fetchColleges();
    // console.log("agdsfuaghdsf",colleges)
  }, [fetchColleges]);

  useEffect(() => {
    let data = [...colleges];

    if (filters.location) {
      data = data.filter((c) =>
        c.location
          ?.toLowerCase()
          .includes(filters.location!.toLowerCase())
      );
    }

    setFilteredColleges(data);
    setCurrentPage(1);
  }, [filters, colleges]);

  const getPaginatedColleges = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredColleges.slice(start, start + itemsPerPage);
  };

  const getTotalPages = () =>
    Math.ceil(filteredColleges.length / itemsPerPage);

  const value: CollegesContextType = {
    state: {
      colleges,
      filteredColleges,
      filters,
      currentPage,
    },
    actions: {
      setFilters,
      setPage: setCurrentPage,
      getPaginatedColleges,
      getTotalPages,
      refetch: fetchColleges,
    },
  };

  return (
    <CollegesContext.Provider value={value}>
      {children}
    </CollegesContext.Provider>
  );
}

export const useColleges = () => {
  const context = useContext(CollegesContext);
  if (!context) {
    throw new Error("useColleges must be used inside CollegesProvider");
  }
  return context;
};
