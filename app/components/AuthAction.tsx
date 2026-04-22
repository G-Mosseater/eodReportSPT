import { signIn, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";
type Props = {
  session: any;
  onClick?: () => void;
};
export default function AuthAction({ session, onClick }: Props) {
  const handleClick = async () => {
    if (session) {
      await signOut({ callbackUrl: "/" });
    } else {
      await signIn("credentials", { callbackUrl: "/" });
    }
    onClick?.();
  };

  return (
    <button
      onClick={handleClick}
      className="
        flex items-center gap-2 text-sm px-2 py-1 rounded bg-background border border-primary hover:bg-secondary/10 text-black"
    >
      {session ? (
        <>
          <LogOut size={18} />
          <span>Logout</span>
        </>
      ) : (
        <>
          <User size={18} />
          <span>Login</span>
        </>
      )}
    </button>
  );
}
