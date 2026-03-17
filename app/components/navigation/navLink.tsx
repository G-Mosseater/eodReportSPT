'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    `transition-colors ${
      pathname === path ? "text-blue-400 font-semibold" : "hover:text-blue-400"
    }`;
  return (
    <ul className="flex gap-6 items-center p-4 bg-gray-900 text-white">
      <li>
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>
      </li>

      <li>
        <Link href="/reports" className={linkStyle("/reports")}>
          All Reports
        </Link>
      </li>
    </ul>
  );
}
