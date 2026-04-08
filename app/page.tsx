import Link from "next/link";

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
 <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
      <h1 className="text-3xl font-bold">Welcome to Special Tours Operations</h1>
      <p className="text-lg">Explore private tours here:</p>
      <Link
        href="/privates"
        className="bg-blue-600 text-white px-6 py-3 rounded text-lg hover:bg-blue-700 transition"
      >
        Explore 
      </Link>
    </div>
  );
}
