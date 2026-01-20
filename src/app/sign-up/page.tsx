"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function OnboardingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  // We currently have 4 actual content screens:
  // 1) Destination country, 2) Field of study, 3) Financials, 4) Final signup/benefits
  const totalSteps = 4;
  const [formData, setFormData] = useState({
    country: "",
    field: "",
    level: "",
    englishTest: null,
    funds: 0,
    wantsLoan: false,
    fullName: "",
    email: "",
    password: "",
  });

  const next = () => {
    setStep((s) => {
      if (s >= totalSteps) {
        router.push("/");
        return s;
      }
      return Math.min(s + 1, totalSteps);
    });
  };
  const prev = () => setStep((s) => Math.max(s - 1, 1));
const handleSubmit = async (e?: React.FormEvent) => {
  e?.preventDefault();

  try {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,

        country: formData.country,
        field: formData.field,
        level: formData.level,
        englishTest: formData.englishTest,
        funds: formData.funds,
        wantsLoan: formData.wantsLoan,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    console.log("SIGNUP SUCCESS:", data);
    router.push("/");
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    alert("Something went wrong");
  }
};


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[750px] border border-slate-100">
        {/* Header & Progress */}
        <div className="px-8 pt-8">
          <div className="flex justify-between items-center mb-6">
            {step > 1 ? (
              <button
                onClick={prev}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            ) : (
              <div className="w-6" />
            )}
            <span className="text-[10px] font-black tracking-widest text-slate-300 uppercase">
              Step {step} of {totalSteps}
            </span>
            <div className="w-6" />
          </div>
          <div className="flex gap-1.5 mb-2">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  step > i ? "bg-green-600" : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 px-8 py-6 flex flex-col overflow-y-auto no-scrollbar">
          <AnimatePresence mode="wait">
            {/* STEP 1: DESTINATION COUNTRY */}
            {step === 1 && (
              <motion.div
                key="st1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                      <path d="M6 12v5c3 3 9 3 12 0v-5" />
                    </svg>
                  </div>
                  <h2 className="font-bold text-2xl tracking-tight">
                    Where would you like to study?
                  </h2>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-4 text-white text-xs relative overflow-hidden shadow-lg shadow-green-100">
                  <p className="relative z-10 font-medium leading-relaxed">
                    Home to 8 of the world's top 10 universities. We'll help you
                    navigate the process.
                  </p>
                  <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12">
                    <svg
                      width="80"
                      height="80"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L1 12h3v9h6v-6h4v6h6v-9h3L12 2z" />
                    </svg>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {["Canada", "U.S.A.", "Australia", "U.K."].map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setFormData({ ...formData, country: c });
                        next();
                      }}
                      className={`p-4 border-2 rounded-2xl flex flex-col items-start gap-3 transition-all ${
                        formData.country === c
                          ? "border-green-500 bg-green-50/50"
                          : "border-slate-50 bg-slate-50/50 hover:border-slate-200"
                      }`}
                    >
                      <span className="text-2xl">
                        {c === "U.S.A."
                          ? "🇺🇸"
                          : c === "Canada"
                          ? "🇨🇦"
                          : c === "Australia"
                          ? "🇦🇺"
                          : "🇬🇧"}
                      </span>
                      <span className="text-xs font-bold">{c}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: FIELD OF STUDY */}
            {step === 2 && (
  <motion.div
    key="st2"
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex flex-col flex-1"
  >
    {/* Question Header with Icon */}
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white text-lg">
        🎓
      </div>
      <h2 className="font-bold text-xl text-slate-800">
        What would you like to study?
      </h2>
    </div>

    {/* Thematic Header Image */}
    <div className="rounded-2xl h-36 bg-green-50 overflow-hidden mb-6">
      <img
        src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400"
        className="w-full h-full object-cover opacity-90"
        alt="Study fields"
      />
    </div>

    {/* Input Fields */}
    <div className="space-y-3">
      {/* Field of Study Selection */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <select
          className="w-full p-4 pl-12 pr-10 bg-white rounded-xl border border-slate-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm text-slate-600 appearance-none cursor-pointer"
          defaultValue=""
          onChange={(e) => setFormData({...formData, field: e.target.value})}
        >
          <option value="" disabled>Select a field of study</option>
          <option value="engineering">Engineering</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Program of Study Selection */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <select
          className="w-full p-4 pl-12 pr-10 bg-white rounded-xl border border-slate-200 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none text-sm text-slate-600 appearance-none cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>Select a program of study</option>
          <option value="cs">Computer Science</option>
          <option value="mechanical">Mechanical Engineering</option>
        </select>
      </div>
    </div>
  </motion.div>
)}

            {/* STEP 3: FINANCIALS */}
            {step === 3 && (
              <motion.div
                key="st3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <h2 className="font-bold text-2xl tracking-tight leading-tight">
                  Your available budget for tuition & living?
                </h2>

                <div className="text-center py-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="text-green-600 text-4xl font-black">
                    ${formData.funds.toLocaleString()}
                  </div>
                  <div className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">
                    Available USD per year
                  </div>
                </div>

                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    step="1000"
                    value={formData.funds}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        funds: parseInt(e.target.value),
                      })
                    }
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-green-600"
                  />
                </div>

                <label className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
                  <input
  type="checkbox"
  checked={formData.wantsLoan}
  onChange={(e) =>
    setFormData({ ...formData, wantsLoan: e.target.checked })
  }
/>

                  <span className="text-xs font-bold text-slate-600">
                    I am interested in education loan options
                  </span>
                </label>
              </motion.div>
            )}

            {/* STEP 4: SIGN UP */}
            {step === 4 && (
              <motion.form
                key="st4"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full flex-col items-center justify-center space-y-6"
              >
                <div className="w-full max-w-md space-y-6">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                      Sign up
                    </h1>
                    <p className="mt-1 text-xs text-slate-500">
                      Create your account to continue your study abroad journey.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="Your full name"
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-100 focus:bg-white outline-none text-sm transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="you@example.com"
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-100 focus:bg-white outline-none text-sm transition-all"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                      Password
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      placeholder="Create a password"
                      className="w-full p-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-green-100 focus:bg-white outline-none text-sm transition-all"
                      required
                    />
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

        {/* Persistent Action Button Area */}
        <div className="px-8 pb-8 pt-4 bg-white">
        <button
  type={step === totalSteps ? "submit" : "button"}
  onClick={step === totalSteps ? handleSubmit : next}
  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 shadow-xl shadow-green-100 hover:from-green-600 hover:to-green-700 active:scale-[0.98] transition-all"
>

            {step === totalSteps ? (
              <>
                <span className="text-sm font-black uppercase tracking-widest">
                  Sign up
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </>
            ) : (
              <>
                <span className="text-sm font-black uppercase tracking-widest">
                  Continue
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
