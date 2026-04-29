import { X } from "lucide-react";
import { TourKey } from "../helpers/tours";
import { departureIcons } from "../helpers/DepartureScreenIcons";
import Image from "next/image";
import { watermarks } from "../helpers/DepartureWatermarks";
import { FaPlus } from "react-icons/fa";

type Row = {
  id: string;
  tour: TourKey;
  boat: string;
  hour: string;
  seaConditions: string;
  status: string;
};

type Props = {
  tourKey: TourKey;
  tour: {
    boats: string[];
    hours: string[];
  };
  rows: Row[];
  isAdmin: boolean;
  seaConditions: string[];
  statuses: string[];

  onAddRow: (tour: TourKey) => void;
  onRemoveTour: (tour: TourKey) => void;
  onRemoveRow: (id: string) => void;
  onChange: (
    id: string,
    field: "boat" | "hour" | "seaConditions" | "status",
    value: string,
  ) => void;
};

export default function DepartureCard({
  tourKey,
  tour,
  rows,
  isAdmin,
  seaConditions,
  statuses,
  onAddRow,
  onRemoveTour,
  onRemoveRow,
  onChange,
}: Props) {
  return (
    <div className="relative w-full rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <Image
        src={watermarks[tourKey]}
        alt="tour image"
        fill
        className="object-contain opacity-5 pointer-events-none"
      />
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          {/* <Image
            src={departureIscons[tourKey]}
            alt={tourKey}
            width={24}
            height={24}
            className="object-contain"
          /> */}
          <h2 className="text-lg font-semibold capitalize lg:text-xl">
            {tourKey.replace(/-/g, " ")}
          </h2>
        </div>
        {isAdmin && (
          <button
            onClick={() => onRemoveTour(tourKey)}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-700 transition"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {isAdmin && (
        <button
          onClick={() => onAddRow(tourKey)}
          className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded hover:bg-secondary transition"
        >
          <FaPlus size={14} />
          <span>Add</span>
        </button>
      )}
      <div className="flex w-full border-b text-sm font-medium lg:text-xl  underline rounded">
        <div className="flex-1 p-2">Boat</div>
        <div className="flex-1 p-2 ml-6">Hour</div>
        <div className="flex-1 p-2">Conditions</div>
        <div className="w-32 p-2 text-right">Status</div>
        <div className="w-10 p-2"></div>
      </div>
      <div className="flex flex-col ">
        {rows.map((row) => (
          <div
            key={row.id}
            className={`flex w-full border items-center lg:text-lg lg:font-medium   ${
              row.status === "Canceled"
                ? "bg-rose-50 text-rose-700 border-rose-100 rounded"
                : row.status === "On"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100 rounded"
                  : row.status === "Pending"
                    ? "bg-amber-50 text-amber-700 border-amber-100 rounded"
                    : ""
            }`}
          >
            <div className="flex-1 p-2 flex items-center lg:text-lg lg:font-medium">
              {isAdmin ? (
                <select
                  value={row.boat}
                  onChange={(e) => onChange(row.id, "boat", e.target.value)}
                  className="w-full border rounded p-1"
                >
                  {tour.boats.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              ) : (
                row.boat
              )}
            </div>

            <div className="flex-1 p-2 flex items-center lg:text-lg lg:font-medium">
              {isAdmin ? (
                <select
                  value={row.hour}
                  onChange={(e) => onChange(row.id, "hour", e.target.value)}
                  className="w-full border rounded p-1"
                >
                  {tour.hours.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              ) : (
                row.hour
              )}
            </div>

            <div className="flex-1 p-2 flex items-center lg:text-lg lg:font-medium">
              {isAdmin ? (
                <select
                  value={row.seaConditions}
                  onChange={(e) =>
                    onChange(row.id, "seaConditions", e.target.value)
                  }
                  className="w-full border rounded p-1"
                >
                  {seaConditions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                row.seaConditions
              )}
            </div>

            <div className="w-32 p-2 text-right flex items-center justify-center">
              {isAdmin ? (
                <select
                  value={row.status}
                  onChange={(e) => onChange(row.id, "status", e.target.value)}
                  className="w-full border rounded p-1"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="px-2 py-1 rounded text-sm lg:text-lg">
                  {row.status}
                </span>
              )}
            </div>

            {isAdmin && (
              <div className="w-10 flex items-center justify-center">
                <button
                  onClick={() => onRemoveRow(row.id)}
                  className="p-1 text-white bg-red-500 rounded hover:bg-red-700  transition"
                >
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
        ))}

        {rows.length === 0 && (
          <div className="p-3 text-gray-400 text-sm">No departures added</div>
        )}
      </div>
    </div>
  );
}
