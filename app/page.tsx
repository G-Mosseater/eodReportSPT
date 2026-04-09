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
    <div className="flex flex-col items-center gap-6 text-center px-4 pt-32 flex-1">
      <h1 className="text-3xl md:text-4xl font-bold">
       Special Tours Operations
      </h1>
      <div className="w-full max-w-lg">
        <Image
          src="/humpback.png"
          alt="Humpback Whale"
          width={640}
          height={480}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
