"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getReports } from "../lib/api";
import { useSession } from "next-auth/react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ReportProps } from "../types/report";
export default function Reports() {
  const [reports, setReports] = useState<ReportProps[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState<Date | null>(null);
  const [monthOpen, setMonthOpen] = useState(false);
  const [yearOpen, setYearOpen] = useState(false);
  const router = useRouter();

  const filteredReports = reports.filter((report) => {
    const reportDate = new Date(report.createdAt);

    const monthMatch = selectedMonth
      ? reportDate.getMonth() === selectedMonth.getMonth()
      : true;

    const yearMatch = selectedYear
      ? reportDate.getFullYear() === selectedYear.getFullYear()
      : true;

    return monthMatch && yearMatch;
  });

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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex justify-end gap-4 mb-6">
          <DatePicker
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
            open={yearOpen}
            onClose={() => setYearOpen(false)}
            views={["year"]}
            label="Year"
            minDate={new Date(2026, 0)}
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
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => {
              setSelectedMonth(null);
              setSelectedYear(null);
            }}
          >
            Reset date
          </button>
        </div>
      </LocalizationProvider>
      <div className="grid gap-4 md:gap-6">
        {filteredReports.length === 0 && <p>No reports found</p>}
        {filteredReports.map((report) => (
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
