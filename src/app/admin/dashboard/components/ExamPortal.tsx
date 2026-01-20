"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

const ExamPortal = () => {
  /* ================= STATES ================= */
  const [selectedExamTypes, setSelectedExamTypes] = useState<string[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryExpanded, setCategoryExpanded] = useState(true);

  /* ================= STATIC UI LIST (MATCH MODEL ENUM) ================= */
  const examTypes = ["National", "State"];

  /* ================= FETCH EXAMS ================= */
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);

      const params = new URLSearchParams();

      selectedExamTypes.forEach((t) =>
        params.append("exam_type", t)
      );

      if (searchQuery) params.append("q", searchQuery);

      const res = await fetch(`/api/exams?${params.toString()}`);
      const data = await res.json();

      setExams(data.exams || []);
      setLoading(false);
    };

    const timer = setTimeout(fetchExams, 300);
    return () => clearTimeout(timer);
  }, [selectedExamTypes, searchQuery]);

  /* ================= RESET ================= */
  const handleReset = () => {
    setSelectedExamTypes([]);
    setSearchQuery("");
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex gap-8">

        {/* LEFT FILTER */}
        <aside className="w-80 bg-white p-6 rounded-xl border">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Filters</h3>
            <button onClick={handleReset} className="text-blue-600 text-xs">
              Clear
            </button>
          </div>

          {/* Exam Type */}
          <button
            onClick={() => setCategoryExpanded(!categoryExpanded)}
            className="flex justify-between w-full mb-3"
          >
            <span className="font-semibold">Exam Type</span>
            {categoryExpanded ? <ChevronDown /> : <ChevronRight />}
          </button>

          {categoryExpanded &&
            examTypes.map((type) => (
              <label key={type} className="flex gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={selectedExamTypes.includes(type)}
                  onChange={(e) =>
                    e.target.checked
                      ? setSelectedExamTypes([...selectedExamTypes, type])
                      : setSelectedExamTypes(
                          selectedExamTypes.filter((t) => t !== type)
                        )
                  }
                />
                {type}
              </label>
            ))}
        </aside>

        {/* RIGHT CONTENT */}
        <main className="flex-1">
          <input
            placeholder="Search exams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded"
          />

          {loading && <p>Loading...</p>}

          {!loading && exams.length === 0 && (
            <p>No exams found</p>
          )}

          <div className="space-y-4">
            {exams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white p-6 rounded-xl border"
              >
                <h3 className="text-xl font-bold">{exam.name}</h3>

                <span className="inline-block mt-2 text-xs bg-blue-100 px-2 py-1 rounded">
                  {exam.exam_type}
                </span>

                {exam.overview && (
                  <p className="mt-3 text-gray-600">
                    {exam.overview}
                  </p>
                )}

                {exam.important_dates && (
                  <p className="mt-2 text-sm text-gray-500">
                    <b>Important Dates:</b> {exam.important_dates}
                  </p>
                )}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamPortal;
