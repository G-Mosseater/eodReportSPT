"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const linkStyle = (path: string) =>
    `px-3 py-1.5 rounded text-sm lg:text-base transition-colors ${
      pathname === path
        ? "bg-primary text-primary-foreground"
        : "hover:bg-muted"
    }`;
  return (
    <ul className="flex gap-2 lg:gap-4 items-center">
      <li>
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>
      </li>
      {session && (
        <>
          <li>
            <Link href="/reports" className={linkStyle("/reports")}>
              All Reports
            </Link>
          </li>
          <li>
            <Link href="/create" className={linkStyle("/create")}>
              New Report
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
