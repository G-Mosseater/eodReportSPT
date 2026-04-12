"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { LogOut, User } from "lucide-react";

export default function AuthAction({ onClick }: { onClick?: () => void }) {
  const { data: session } = useSession();

  const handleClick = () => {
    if (session) {
      signOut({ callbackUrl: "/" });
    } else {
      signIn("credentials", { callbackUrl: "/" });
    }

    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex items-center gap-2
        px-3 py-1.5 rounded
        bg-primary hover:bg-secondary
        text-white
      "
    >
      {session ? <LogOut size={18} /> : <User size={18} />}
    </button>
  );
}
