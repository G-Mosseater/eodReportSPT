"use client";
import Link from "next/link";
import NavLinks from "./navLink";
import { signIn, signOut, useSession } from "next-auth/react";

export default function MainNavigation() {
  const { data: session, status } = useSession({ required: false });
  if (status === "loading") {
    return null;
  }
  return (
    <header className="border-b bg-background text-foreground w-full">
      <div className="w-full mx-auto flex items-center  flex justify-between p-4">
        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
          <Link href="/" className="hover:text-primary transition-colors">
            Special Tours Operations
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <NavLinks />

          {session ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => signOut()}
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
      </div>
    </header>
  );
}
