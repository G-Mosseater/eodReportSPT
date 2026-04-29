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
      <header className="border-b bg-background text-foreground w-full shadow rounded ">
        <div className="w-full mx-auto flex items-center  flex justify-between p-4 gap-10">
          <Link href="/" className="flex items-center">
            <div className="relative ">
              <Image
                src="/logo.svg"
                alt="logo"
                width={100}
                height={40}
                className="w-16 sm:w-20 md:w-24 lg:w-28 h-auto object-contain transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <div className="md:flex hidden gap-4 items-center ">
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
          <Link
            href="/departures"
            className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
            onClick={() => setDrawerOpen(false)}
          >
            Departure Screen
          </Link>
          {session && (
            <>
              <Link
                href="/reports"
                className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
                onClick={() => setDrawerOpen(false)}
              >
                EOD history
              </Link>

              <Link
                href="/create"
                className="text-xl font-semibold text-gray-800 hover:text-primary transition-colors duration-200"
                onClick={() => setDrawerOpen(false)}
              >
                New EOD
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
