"use client";

import { useEffect, useState } from "react";
import { getPrivateRequests } from "../lib/api";
import { tourNameMap, tourStyles } from "../helpers/tourCardStyle";

type Request = {
  _id: string;
  tourName: string;
  company: string;
  pax: number;
  date: string;
  notes?: string;
  createdAt: string;
  boat: string;
  email: string;
};

export default function PrivateRequestsPage() {
  const [data, setData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getPrivateRequests();
        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Private Tour Requests</h1>

      <div className="space-y-4">
        {data.map((t) => {
          const key = tourNameMap[t.tourName];
          return (
            <div
              key={t._id}
              className={`border rounded-lg p-4 shadow-sm text-gray-900 ${
                key ? tourStyles[key] : "bg-white"
              }`}
            >
              <div className="flex justify-between">
                <h2 className="font-semibold">{t.tourName}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(t.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm mt-1">
                <strong>Company:</strong> {t.company}
              </p>
              <p className="text-sm">
                <strong>Boat:</strong> {t.boat}
              </p>
              <p className="text-sm">
                <strong>Pax:</strong> {t.pax}
              </p>
              <p className="text-sm">
                <strong>Date requested:</strong>{" "}
                {new Date(t.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {t.email}
              </p>
              <p className="text-sm">
                <strong>Aditional requests:</strong> {t.notes}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
