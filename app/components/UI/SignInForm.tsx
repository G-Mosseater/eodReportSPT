"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      setError("");
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/",
      });
      if (res?.error) {
        setError("Invalid credentials");
        return;
      }
      router.replace("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm space-y-4"
    >
      <h1 className="text-xl font-bold text-gray-800">Sign In</h1>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email</label>
        <input
          disabled={loading}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Password</label>
        <input
          disabled={loading}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`w-full text-white rounded px-3 py-2 font-medium transition-colors ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-secondary"}`}
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {error && (
        <p className="text-red-600 border border-red-300 px-3 py-2 rounded text-sm text-center">
          {error}
        </p>
      )}
    </form>
  );
}
