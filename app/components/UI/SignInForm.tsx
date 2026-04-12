"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      setError("");
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl: "/"
      });
      if (res?.error) {
        setError("Invalid credentials");
        return;
      }
      router.push("/");
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
      <h1 className="text-xl font-bold text-gray-800">Sign In</h1>

      {error && (
        <p className="text-red-600 bg-red-100 border border-red-300 px-3 py-2 rounded text-sm text-center">
          {error}
        </p>
      )}
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
        className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded px-3 py-2 font-medium transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}
