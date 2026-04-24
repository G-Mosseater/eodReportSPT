"use client";
import { useEffect, useState, useMemo } from "react";
import { getOvertimeAnalytics } from "../lib/api";

export default function useAnalytics() {
  const [hourly, setHourly] = useState<any[]>([]);
  const [byTour, setByTour] = useState<any[]>([]);
  const [month, setMonth] = useState<number | "">("");
  const [year, setYear] = useState<number>(2026);
  const [loading, setLoading] = useState(false);
  const [selectedTour, setSelectedTour] = useState("whale-watching");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const result = await getOvertimeAnalytics(
          month === "" ? undefined : month,
          year,
          selectedTour,
        );
        setHourly(result.hourly);
        setByTour(result.byTour);
      } catch (err) {
        console.error("Failed to fetch analytics", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [month, year, selectedTour]);

  const totalPassengers = useMemo(() => {
    return hourly.reduce((sum, d) => sum + d.total, 0);
  }, [hourly]);

  const totalCanceledTours = useMemo(() => {
    return hourly.reduce((sum, d) => sum + d.canceled, 0);
  }, [hourly]);

  const totalGroup = useMemo(() => {
    return hourly.reduce((sum, d) => sum + d.groups, 0);
  }, [hourly]);

  const totalFree = useMemo(() => {
    return hourly.reduce((sum, d) => sum + d.free, 0);
  }, [hourly]);

  const totalAdults = useMemo(() => {
    return hourly.reduce((sum, d) => sum + d.adults, 0);
  }, [hourly]);

  const totalYouth = useMemo(() => {
    return hourly.reduce((sum, d) => sum + d.youth, 0);
  }, [hourly]);

  console.log("hourly log", byTour);

  return {
    hourly,
    byTour,
    month,
    year,
    selectedTour,
    setMonth,
    setYear,
    setSelectedTour,
    loading,
    totalPassengers,
    totalCanceledTours,
    totalGroup,
    totalFree,
    totalAdults,
    totalYouth,
  };
}
