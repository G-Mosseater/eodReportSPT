"use client";
import { getMonths } from "../../helpers/dateFilters";
import { tourOptions, TourKey } from "../../helpers/tours";
import { tourLabels } from "../../types/tourOrder";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import type { DateRange } from "react-day-picker";
import { useState, useRef, useEffect } from "react";

type Props = {
  month: number | "";
  year: number;
  tour: string;
  range: DateRange | undefined;

  setRange: (value: DateRange | undefined) => void;
  setMonth: (value: number | "") => void;
  setYear: (value: number) => void;
  setTour: (value: string) => void;
};
export default function DashboardFilters({
  month,
  year,
  range,
  tour,
  setRange,
  setMonth,
  setYear,
  setTour,
}: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const months = getMonths();
  const handleReset = () => {
    setRange(undefined);
    setMonth("");
    setYear(2026);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="flex gap-4 items-center flex-wrap">
        <select
          className="border p-2 rounded"
          value={tour}
          onChange={(e) => setTour(e.target.value)}
        >
          {Object.keys(tourOptions).map((key) => (
            <option key={key} value={key}>
              {tourLabels[key as TourKey]}
            </option>
          ))}
        </select>
        <select
          className="border p-2 rounded"
          value={month}
          onChange={(e) =>
            setMonth(e.target.value === "" ? "" : Number(e.target.value))
          }
        >
          <option value="">All months</option>

          {months.map((name, index) => (
            <option key={index} value={index}>
              {name}
            </option>
          ))}
        </select>
        <input
          type="number"
          className="border p-2 rounded w-24"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
        <div className="flex items-center gap-2">
          <span className="text-gray-400">|</span>

          <div className="relative" ref={boxRef}>
            <button
              className="border border-gray-300 bg-white px-4 py-2 rounded-md text-sm  hover:border-gray-400 hover:bg-gray-50 transition "
              onClick={() => setOpen((prev) => !prev)}
            >
              {range?.from && range?.to
                ? `${range.from.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })} - ${range.to.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}`
                : "Date Range"}
            </button>
            {open && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border rounded shadow-md p-2">
                <DayPicker
                  mode="range"
                  navLayout="around"
                  captionLayout="dropdown"
                  selected={range}
                  onSelect={(value) => {
                    setRange(value);
                  }}
                  numberOfMonths={1}
                />
              </div>
            )}
          </div>
          <button
            className="bg-primary p-2 rounded text-white hover:bg-secondary"
            onClick={handleReset}
          >
            Reset range
          </button>
        </div>
      </div>
    </div>
  );
}
