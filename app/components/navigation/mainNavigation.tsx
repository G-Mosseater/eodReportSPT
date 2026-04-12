"use client";
import Link from "next/link";
import NavLinks from "./navLink";
import { useSession } from "next-auth/react";
import { useState } from "react";
import SideDrawer from "./sideDrawer";
import AuthAction from "../AuthAction";
import Image from "next/image";

export default function MainNavigation() {
  const { data: session, status } = useSession({ required: false });
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <header className="border-b bg-background text-foreground w-full">
        <div className="w-full mx-auto flex items-center  flex justify-between p-4">
          <Link href="/" className="flex items-center">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
              <Image
                src="/sptlogo.png"
                alt="SPT Logo"
                fill
                sizes="(max-width: 768px) 56px, 80px"
                className="object-contain transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <div className="md:flex hidden items-center gap-4">
            <NavLinks />

            <AuthAction />
          </div>
          <button
            className="md:hidden flex flex-col justify-between w-6 h-6 p-1"
            onClick={() => setDrawerOpen(true)}
          >
            <span className="block h-0.5 bg-black rounded"></span>
            <span className="block h-0.5 bg-black rounded"></span>
            <span className="block h-0.5 bg-black rounded"></span>
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
          <AuthAction />
        </nav>
      </SideDrawer>
    </>
  );
}
