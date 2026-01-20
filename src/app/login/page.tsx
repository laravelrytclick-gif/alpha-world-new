"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

   
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

    
      console.log("LOGIN SUCCESS:", data);

    
      if (data.user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100">
        <div className="px-8 pt-8 pb-4 border-b border-slate-100">
          <h1 className="text-2xl font-black text-slate-900 mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500">
            Log in to continue your global education journey with AlphaWorld.
          </p>
        </div>

        <div className="px-8 pt-6 pb-8 space-y-5">
          {error && (
            <div className="text-xs text-red-600 font-semibold">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>


          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-100 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </div>

        <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          New to AlphaWorld?{" "}
          <Link
            href="/sign-up"
            className="font-semibold text-green-600 hover:text-green-700"></Link>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-100 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="text-center text-xs text-slate-500">
            New to AlphaWorld?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-green-600"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
