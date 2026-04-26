import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import WhaleAnimation from "./components/UI/WhaleAnimation";
export default function Home() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.replace("/create");
  //   }
  // }, [status, router]);
  // if (status === "loading") {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       Loading...
  //     </div>
  //   );
  // }

  return (
    <div
      className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between px-6 md:px-16 lg:px-24 min-h-screen gap-16 md:gap-24 lg:gap-32
"
    >
      <div className="flex flex-col gap-6 text-center md:text-left max-w-xl justify-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Special Tours <br /> Operations
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          Platform for managing private tour requests and internal operations.
        </p>

        <Link
          href="/privates"
          className="w-fit  flex items-center mx-auto md:mx-0 px-6 py-3 bg-white text-black border border-secondary rounded hover:bg-gray-50 hover:shadow-sm shadow-secondary transition gap-2"
        >
          <FaArrowRight className="text-sm text-secondary" />
          Check out private tours
        </Link>
      </div>
      <div className="w-full max-w-[140px] lg:mr-24 sm:max-w-[140px] md:max-w-[180px] lg:max-w-[220px] flex justify-center md:justify-end z-10">
        <WhaleAnimation />
      </div>
    </div>
  );
}
