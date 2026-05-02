"use client";
import DepartureCard from "../components/DepartureCard";
import { useState, useEffect, useCallback } from "react";
import {
  tourOptions,
  statuses,
  seaConditions,
  TourKey,
} from "../helpers/tours";
import { useSession } from "next-auth/react";
import { getDepartureScreen, saveDepartureScreen } from "../lib/api";

type Row = {
  id: string;
  tour: TourKey;
  boat: string;
  hour: string;
  seaConditions: string;
  status: string;
};

export default function DepartureScreen() {
  const { data: session, status } = useSession();
  const isAdmin = status === "authenticated";
  const tourKeys = Object.keys(tourOptions) as TourKey[];
  const [serverRows, setServerRows] = useState<Row[]>([]);
  const [draftRows, setDraftRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [visibleTours, setVisibleTours] = useState<TourKey[]>([]);

  const addRow = (tour: TourKey) => {
    const newRow: Row = {
      id: crypto.randomUUID(),
      tour,
      boat: tourOptions[tour].boats[0],
      hour: tourOptions[tour].hours[0],
      seaConditions: seaConditions[0],
      status: statuses[0],
    };

    setDraftRows((prev) => [...(prev ?? []), newRow]);
  };
  const addTour = (tour: TourKey) => {
    setVisibleTours((prev) => (prev.includes(tour) ? prev : [...prev, tour]));
  };

  const handleChange = (
    id: string,
    field: "boat" | "hour" | "seaConditions" | "status",
    value: string,
  ) => {
    setDraftRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const removeRow = async (id: string) => {
    setDraftRows((prev) => prev.filter((row) => row.id !== id));
  };

  const removeTour = (tour: TourKey) => {
    setVisibleTours((prev) => prev.filter((t) => t !== tour));
    setDraftRows((prev) => prev.filter((r) => r.tour !== tour));
  };

  const fetchData = async () => {
    const data = await getDepartureScreen();
    return Array.isArray(data) ? data : [];
  };

  const loadData = useCallback(async () => {
    const data = await fetchData();

    setServerRows(data);

    if (isAdmin) {
      setDraftRows(data);
      const tours = Array.from(new Set(data.map((r) => r.tour)));

      setVisibleTours(tours as TourKey[]);
    }
  }, [isAdmin]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (isAdmin) return;

    const interval = setInterval(async () => {
      const data = await fetchData();
      setServerRows(data);
    }, 7000);

    return () => clearInterval(interval);
  }, [isAdmin]);

  const handleSave = async () => {
    try {
      setSaving(true);
      await saveDepartureScreen(draftRows);

      await loadData();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };
  const activeRows = isAdmin ? (draftRows ?? []) : (serverRows ?? []);

  const toursToRender = isAdmin
    ? visibleTours
    : tourKeys.filter((tour) => serverRows.some((r) => r.tour === tour));

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
  });
  return (
    <div className="p-6 space-y-6 min-h-screen">
      <h1 className="text-xl lg:text-2xl font-bold text-center">
        {isAdmin ? "Admin Departure Screen" : `Daily Departures - ${today}`}
      </h1>

      {isAdmin && (
        <div>
          {tourKeys.map((tourKey) => (
            <button
              key={tourKey}
              onClick={() => addTour(tourKey)}
              className="mr-2 mb-2 px-3 py-1 bg-primary hover:bg-secondary transition text-white rounded capitalize"
            >
              Add {tourKey.replace(/-/g, " ")}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {toursToRender?.map((tourKey) => {
          const tour = tourOptions[tourKey];
          const tourRows = activeRows.filter((r) => r.tour === tourKey);

          return (
            <DepartureCard
              key={tourKey}
              tourKey={tourKey}
              tour={tour}
              rows={tourRows}
              isAdmin={isAdmin}
              seaConditions={seaConditions}
              statuses={statuses}
              onAddRow={addRow}
              onRemoveTour={removeTour}
              onRemoveRow={removeRow}
              onChange={handleChange}
            />
          );
        })}
      </div>
      {isAdmin && (
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-secondary disabled:opacity-50 transition"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      )}
    </div>
  );
}
