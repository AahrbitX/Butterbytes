"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image src="/assets/images/ButterBytes.png" alt="ButterBytes" width={56} height={56} className="rounded-full mb-3" />
          <h1 className="text-brown font-bold text-xl font-display">Admin Login</h1>
          <p className="text-brown-mid text-xs mt-1">ButterBytes Dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card border border-cream-dark rounded-2xl p-8 flex flex-col gap-4 shadow-lg shadow-brown/5">
          <div className="flex flex-col gap-1">
            <label className="text-brown-mid text-xs font-medium">Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="admin@example.com"
              className="bg-cream text-brown text-sm px-4 py-3 rounded-xl outline-none border border-cream-dark focus:border-accent transition-colors duration-300 placeholder-brown-mid/40"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-brown-mid text-xs font-medium">Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required placeholder="••••••••"
              className="bg-cream text-brown text-sm px-4 py-3 rounded-xl outline-none border border-cream-dark focus:border-accent transition-colors duration-300 placeholder-brown-mid/40"
            />
          </div>

          {error && <p className="text-red-500 text-xs text-center">{error}</p>}

          <button
            type="submit" disabled={loading}
            className="mt-2 bg-brown text-cream font-semibold text-sm py-3 rounded-full hover:bg-brown-mid transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
