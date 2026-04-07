"use client";
import Link from "next/link";
import NavLinks from "./navLink";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import SideDrawer from "./sideDrawer";

export default function MainNavigation() {
  const { data: session, status } = useSession({ required: false });
  const [drawerOpen, setDrawerOpen] = useState(false);
  if (status === "loading") {
    return null;
  }
  return (
    <>
      <header className="border-b bg-background text-foreground w-full">
        <div className="w-full mx-auto flex items-center  flex justify-between p-4">
          <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
            <Link href="/" className="hover:text-primary transition-colors">
              Special Tours Operations
            </Link>
          </h1>
          <div className="md:flex hidden items-center gap-4">
            <NavLinks />

            {session ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm lg:text-base transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() =>
                  signIn("credentials", { redirect: true, callbackUrl: "/" })
                }
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm lg:text-base transition-colors"
              >
                Sign In
              </button>
            )}
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
            New report
          </Link>

          {session ? (
            <button
              onClick={() => {
                signOut({ callbackUrl: "/" });
                setDrawerOpen(false);
              }}
              className="mt-6 px-6 py-2 rounded bg-red-500 hover:bg-red-600 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Sign Out
            </button>
          ) : (
            <button
              onClick={() => {
                signIn("credentials", { callbackUrl: "/" });
                setDrawerOpen(false);
              }}
              className="mt-6 px-6 py-2 rounded bg-green-500 hover:bg-green-600 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              Sign In
            </button>
          )}
        </nav>
      </SideDrawer>
    </>
  );
}
