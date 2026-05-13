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
    w-fit flex items-center gap-2
  px-2 py-1 text-xs
  md:px-3 md:py-2 md:text-sm
  lg:px-4 lg:py-2 lg:text-base
  bg-white text-black
    border border-secondary
    rounded
    hover:bg-gray-50
    hover:shadow-sm shadow-secondary
    transition-all duration-200 ease-out hover:-translate-y-[1px]
  "
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
