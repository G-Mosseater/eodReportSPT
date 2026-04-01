"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getReports } from "../lib/api";
import { useSession } from "next-auth/react";

export default function Reports() {
  const [reports, setReports] = useState<any[] | null>([]);
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/signin");
    },
  });

  useEffect(() => {
    if (status !== "authenticated") return;
    async function fetchReports() {
      try {
        const data = await getReports();

        setReports(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReports();
  }, [status]);

  if (status === "loading" || reports === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base lg:text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6">
        All Reports
      </h1>

      <div className="grid gap-4 md:gap-6">
        {reports.map((report) => (
          <div
            key={report._id}
            className="cursor-pointer rounded-lg border border-border bg-card p-4 md:p-5 lg:p-6 shadow-sm transition-all hover:shadow-md hover:scale-[1.01]"
            onClick={() => router.push(`/reports/${report._id}`)}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <h2 className="text-base md:text-lg lg:text-xl font-semibold text-foreground">
                {new Date(report.createdAt).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <span className="text-sm text-muted-foreground">
                {report.rows.length} tours
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
