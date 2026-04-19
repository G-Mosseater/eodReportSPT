"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const { data: session } = useSession();
  const linkStyle = (path: string) => {
    const isActive =
      path === "/" ? pathname === "/" : pathname.startsWith(path);

    return `px-3 py-1.5 text-sm lg:text-xl text-muted transition-colors duration-300 ease-in-out
    relative whitespace-nowrap
    ${isActive ? "text-secondary font-medium " : "text-muted-foreground "}
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-primary after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;
  };
  return (
    <ul className="flex gap-1  md:gap-2 lg:gap-3">
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

      {session && (
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
            <Link
              href="/private-request"
              className={linkStyle("/private-request")}
            >
              Private requests
            </Link>
          </li>
        </>
      )}
      <li>
        <Link href="/about" className={linkStyle("/about")}>
          About us
        </Link>
      </li>
    </ul>
  );
}
