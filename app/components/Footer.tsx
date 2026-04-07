"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Special Tours Operations
        </p>

        <div className="flex gap-4 text-sm">
          <Link href="/" className="hover:text-blue-600 transition">
            Home
          </Link>
          <Link href="/privates" className="hover:text-blue-600 transition">
            Private Tours
          </Link>
        </div>

        <p className="text-sm text-gray-600 text-center md:text-right">
          Built by Gabriel <br />
          <a
            href="mailto:Gabriel.bachelor@gmail.com"
            className="hover:text-blue-600 transition"
          >
            Gabriel.bachelor@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}