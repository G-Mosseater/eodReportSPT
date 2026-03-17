"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getReports } from "../../lib/api";

export default function Reports() {
  const [reports, setReports] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await getReports();

        setReports(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReports();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-6">
      {reports.map((report) => (
        <div
          key={report._id}
          className="flex items-center justify-between border rounded-lg p-6 shadow-md bg-white cursor-pointer 
                     hover:scale-105 transform transition-all duration-300"
          onClick={() => router.push(`/reports/${report._id}`)}
        >
          <div className="text-left">
            <p className="text-xl font-bold text-gray-800">
              {new Date(report.createdAt).toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">{report.rows.length} tours</p>
          </div>
        </div>
      ))}
    </div>
  );
}
