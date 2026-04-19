import Link from "next/link";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-600 lg:text-base">
          © {new Date().getFullYear()} Special Tours Operations
        </p>

        <div className="flex gap-4 text-sm lg:text-base whitespace-nowrap">
          <Link href="/" className="hover:text-secondary transition">
            Home
          </Link>
          <Link href="/privates" className="hover:text-secondary transition">
            Private Tours
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs tracking-wide px-4 lg:text-base whitespace-nowrap">
            Follow us on
          </span>

          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-600 transition"
            >
              <FaFacebook className="text-lg" />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram className="text-lg" />
            </a>
          </div>
        </div>

        <p className="text-sm text-gray-600 text-center md:text-right lg:text-base">
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
