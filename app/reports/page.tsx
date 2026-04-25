"use client";
import { FaCalendarAlt, FaShip } from "react-icons/fa";
import { GiWhaleTail } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getReports } from "../lib/api";
import { useSession } from "next-auth/react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReportProps } from "../types/report";
import Link from "next/link";
import WaveBackground from "../components/UI/WaveBackground";

const LIMIT = 31;

export default function Reports() {
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/signin");
    },
  });

  async function fetchReports(
    currentCursor: string | null = null,
    month?: number,
    year?: number,
  ) {
    if (loading) return;
    try {
      setLoading(true);
      const data = await getReports(LIMIT, currentCursor, month, year);

      setReports((prev) =>
        currentCursor ? [...prev, ...data.reports] : data.reports,
      );
      setCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (status !== "authenticated") return;
    const month = selectedMonth?.getMonth();
    const year = selectedYear?.getFullYear();

    setReports([]);
    setCursor(null);
    setHasMore(true);
    fetchReports(null, month, year);
  }, [status, selectedMonth, selectedYear]);

  function loadMore() {
    const month = selectedMonth?.getMonth();
    const year = selectedYear?.getFullYear();

    fetchReports(cursor, month, year);
  }

  // const filteredReports = reports.filter((report) => {
  //   const reportDate = new Date(report.createdAt);

  //   const monthMatch = selectedMonth
  //     ? reportDate.getMonth() === selectedMonth.getMonth()
  //     : true;

  //   const yearMatch = selectedYear
  //     ? reportDate.getFullYear() === selectedYear.getFullYear()
  //     : true;

  //   return monthMatch && yearMatch;
  // });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base lg:text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="inline-block text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 hover:text-secondary transition">
          End of Day History Reports
        </h1>
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex items-center justify-between gap-4 mb-6">
          <Link
            href="/analytics"
            className="text-xs sm:text-sm text-center font-medium bg-background rounded border border-primary hover:bg-gray-100 text-primary px-2 py-4 sm:px-4 "
          >
            View Analytics
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <DatePicker
              sx={{
                width: { xs: 80, sm: 140, md: 180 },
              }}
              open={monthOpen}
              onClose={() => setMonthOpen(false)}
              views={["month"]}
              label="Month"
              minDate={new Date(2020, 0)}
              value={selectedMonth}
              onChange={(newValue) => setSelectedMonth(newValue)}
              slotProps={{
                field: {
                  onClick: () => setMonthOpen(true),
                },
                openPickerButton: {
                  onClick: () => setMonthOpen(true),
                  sx: {
                    display: { xs: "none", sm: "flex" },
                  },
                },
                popper: {
                  popperOptions: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 20],
                        },
                      },
                    ],
                  },
                  sx: {
                    "& .MuiPaper-root": {
                      paddingTop: "16px",
                    },
                  },
                },
              }}
            />
            <DatePicker
              sx={{
                width: { xs: 80, sm: 140, md: 180 },
              }}
              open={yearOpen}
              onClose={() => setYearOpen(false)}
              views={["year"]}
              label="Year"
              minDate={new Date(2025, 0)}
              maxDate={new Date(new Date().getFullYear() + 30, 11)}
              value={selectedYear}
              yearsPerRow={3}
              onChange={(newValue) => {
                (setSelectedYear(newValue), setSelectedMonth(null));
              }}
              slotProps={{
                field: {
                  onClick: () => setYearOpen(true),
                },
                openPickerButton: {
                  onClick: () => setYearOpen(true),
                  sx: {
                    display: { xs: "none", sm: "flex" },
                  },
                },
                popper: {
                  popperOptions: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 20],
                        },
                      },
                    ],
                  },
                  sx: {
                    "& .MuiPaper-root": {
                      paddingTop: "16px",
                    },
                  },
                },
              }}
            />
            <button
              className="px-4 py-4 text-sm bg-gray-200 rounded hover:bg-gray-300 whitespace-nowrap flex-shrink-0"
              onClick={() => {
                setSelectedMonth(null);
                setSelectedYear(null);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </LocalizationProvider>
      <div className="grid gap-4 md:gap-6">
        {!loading && reports.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <GiWhaleTail className="text-6xl text-muted-foreground opacity-30 mb-3" />
            <p className="text-lg font-semibold">No reports found</p>
            <p className="text-sm text-muted-foreground">
              Try changing filters or selecting another period
            </p>
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report._id}
              className="relative overflow-hidden cursor-pointer rounded-lg border p-4 md:p-5 lg:p-6 shadow-md transition-all hover:shadow-secondary hover:scale-[1.01] max-w-4xl w-full mx-auto "
              onClick={() => router.push(`/reports/${report._id}`)}
            >
              <div className="absolute inset-0 text-secondary">
                <WaveBackground />
              </div>
              <GiWhaleTail className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary text-7xl opacity-80 pointer-events-none blur-[0.3px] pulse" />
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center gap-2 text-foreground">
                  <FaCalendarAlt className="text-secondary text-sm" />
                  <h2 className="text-base md:text-lg lg:text-xl font-semibold text-foreground">
                    {new Date(report.createdAt).toLocaleDateString(undefined, {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FaShip className="text-secondary text-sm" />
                  <span className="font-medium text-black">
                    {report.rows.length} tours
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Click to view full report
              </p>
            </div>
          ))
        )}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-4 py-2 bg-primary  hover:bg-secondary text-white rounded"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
}
