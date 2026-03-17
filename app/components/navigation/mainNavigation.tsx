import Link from "next/link";
import NavLinks from "./navLink";

export default function MainNavigation() {
  return (
    <header className="bg-gray-900 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">
          <Link href="/">EOD</Link>
        </h1>

        <nav>
          <NavLinks />
        </nav>
      </div>
    </header>
  );
}
