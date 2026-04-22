"use client";
import Link from "next/link";
import { useState } from "react";
import SideDrawer from "./sideDrawer";
import AuthAction from "../AuthAction";
import NavLinks from "./navLink";
import Image from "next/image";

export default function MainNavigationClient({ session }: any) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="border-b bg-background text-foreground w-full">
        <div className="w-full mx-auto flex items-center  flex justify-between p-4">
          <Link href="/" className="flex items-center">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
              <Image
                src="/sptlogo.png"
                alt="logo"
                fill
                sizes="(max-width: 768px) 56px, 80px"
                className="object-contain transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <div className="md:flex hidden gap-4 items-center">
            <NavLinks isLoggedIn={!!session} />
            <AuthAction session={session} />
          </div>
          <button onClick={() => setDrawerOpen(true)} className="md:hidden">
            ☰
          </button>
        </div>
      </header>

      <SideDrawer show={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <nav className="flex flex-col items-center justify-center h-full gap-6 p-4">
          <Link
            href="/"
            className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
            onClick={() => setDrawerOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/privates"
            className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
            onClick={() => setDrawerOpen(false)}
          >
            Private tours
          </Link>
          {session && (
            <>
              <Link
                href="/reports"
                className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
                onClick={() => setDrawerOpen(false)}
              >
                All Reports
              </Link>

              <Link
                href="/create"
                className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
                onClick={() => setDrawerOpen(false)}
              >
                New Report
              </Link>
              <Link
                href="/private-request"
                className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
                onClick={() => setDrawerOpen(false)}
              >
                Private tour requests
              </Link>
            </>
          )}
          <Link
            href="/about"
            className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
            onClick={() => setDrawerOpen(false)}
          >
            About us
          </Link>
          <AuthAction session={session} />
        </nav>
      </SideDrawer>
    </>
  );
}
