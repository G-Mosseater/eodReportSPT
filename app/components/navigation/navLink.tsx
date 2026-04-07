"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const { data: session } = useSession();
  const linkStyle = (path: string) => {
    if (path === "/") {
      return `px-3 py-1.5 rounded text-sm lg:text-base transition-colors ${
        pathname === "/"
          ? "bg-blue-600 text-primary-foreground"
          : "hover:bg-blue-100"
      }`;
    } else {
      return `px-3 py-1.5 rounded text-sm lg:text-base transition-colors ${
        pathname.startsWith(path)
          ? "bg-blue-600 text-primary-foreground"
          : "hover:bg-blue-100"
      }`;
    }
  };
  return (
    <ul className="flex gap-2 lg:gap-4 items-center">
      <li>
        <Link href="/" className={linkStyle("/")}>
          Home
        </Link>
      </li>
      <li>
        <Link href="/privates" className={linkStyle("/privates")}>
          Private Tours
        </Link>
      </li>
      {session ? (
        <>
          <li>
            <Link href="/create" className={linkStyle("/create")}>
              New EOD Report
            </Link>
          </li>
          <li>
            <Link href="/reports" className={linkStyle("/reports")}>
              All Reports
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm lg:text-base transition-colors"
            >
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <li>
          <button
            onClick={() =>
              signIn("credentials", { redirect: true, callbackUrl: "/" })
            }
            className={linkStyle("/signin")}
          >
            Admin Access
          </button>
        </li>
      )}
    </ul>
  );
}
