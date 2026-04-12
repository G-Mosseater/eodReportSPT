import Link from "next/link";
import Image from "next/image";
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
    <div className="flex flex-col md:flex-row items-center justify-between  px-6 md:px-16 lg:px-24 py-40 gap-12">
      <div className="flex flex-col gap-6 text-center md:text-left max-w-xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Special Tours <br /> Operations
        </h1>

        <p className="text-gray-600 text-base md:text-lg">
          Platform for managing private tour requests and internal
          operations.
        </p>

        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            href="/privates"
            className="px-6 py-3 bg-black text-white rounded-lg bg-primary hover:bg-secondary transition"
          >
            Private Tours
          </Link>
        </div>
      </div>

      <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-sm lg:max-w-xl">
        {" "}
        <Image
          src="/balena.png"
          alt="Humpback Whale"
          width={1000}
          height={800}
          className="w-full h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
