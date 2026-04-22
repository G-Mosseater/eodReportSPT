"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  isLoggedIn: boolean;
};

export default function NavLinks({isLoggedIn}:Props) {
  const pathname = usePathname();

  const linkStyle = (path: string) => {
    const isActive =
      path === "/" ? pathname === "/" : pathname.startsWith(path);

    return `px-3 md:px-1 py-1.5 text-sm lg:text-xl text-muted transition-colors duration-300 ease-in-out
    relative whitespace-nowrap
    ${isActive ? "text-secondary font-medium " : "text-muted-foreground "}
    after:content-[''] after:absolute after:left-0 after:-bottom-1
    after:h-[2px] after:bg-primary after:transition-all after:duration-300
    ${isActive ? "after:w-full" : "after:w-0 hover:after:w-full"}`;
  };
  return (
    <ul className="flex gap-1  md:gap-1 lg:gap-3">
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

      {isLoggedIn && (
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
