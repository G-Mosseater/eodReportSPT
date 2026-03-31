'use client'
import Link from "next/link";
import NavLinks from "./navLink";

export default function MainNavigation() {
  return (
    <header className="border-b bg-background text-foreground w-full">
      <div className="w-full mx-auto flex items-center  flex justify-between p-4">
        <h1 className="text-lg lg:text-xl font-bold">
          <Link href="/" className="hover:text-primary transition-colors">
            EOD
          </Link>
        </h1>

        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
