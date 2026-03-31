"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      setError("");

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      router.push("/signin");
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm space-y-4"
    >
      <h1 className="text-xl font-bold text-gray-800">Sign Up</h1>
      {error && (
        <p className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded text-sm text-center">
          {error}
        </p>
      )}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Name</label>
        <input
          disabled={pending}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Email</label>
        <input
          disabled={pending}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Password</label>
        <input
          disabled={pending}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
      </div>
      <button
        disabled={pending}
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white rounded px-3 py-2 font-medium transition-colors"
      >
        Sign Up
      </button>
    </form>
  );
}
