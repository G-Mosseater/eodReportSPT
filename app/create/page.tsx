"use client";
import { useCallback, useEffect, useState } from "react";
import { TourRow } from "../components/TourRow";
import { tourOptions } from "../helpers/tours";
import { postTours } from "../lib/api";
import { PaymentSummary } from "../components/PaymentSummary";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { tours, tourOrder } from "../types/tourOrder";
interface Row {
  id: string;
  type: tours;
}

export default function NewReport() {
  const [isLoading, setIsLoading] = useState(true);
  const [rows, setRows] = useState<Row[]>(() => {
    const saved = localStorage.getItem("tourRows");
    return saved ? JSON.parse(saved) : [];
  });

  const [rowsData, setRowsData] = useState<{ [key: string]: any }>(() => {
    const saved = localStorage.getItem("tourRowsData");
    return saved ? JSON.parse(saved) : {};
  });

  const [paymentData, setPaymentData] = useState(() => {
    const saved = localStorage.getItem("payment");
    return saved
      ? JSON.parse(saved)
      : { cash: 0, card: 0, voucher: 0, total: 0, notes: "" };
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  // Load data from local storage
  useEffect(() => {
    if (status === "unauthenticated") {
      setIsLoading(false);
      router.replace("/signin");
    }
    setIsLoading(true);
    try {
      const savedRows = localStorage.getItem("tourRows");
      const savedRowsData = localStorage.getItem("tourRowsData");
      const savedPayment = localStorage.getItem("payment");

      if (savedRows) setRows(JSON.parse(savedRows));
      if (savedRowsData) setRowsData(JSON.parse(savedRowsData));
      if (savedPayment) setPaymentData(JSON.parse(savedPayment));
    } catch (err) {
      console.warn("Failed to load from localStorage:", err);
      setRows([]);
      setRowsData({});
      setPaymentData({ cash: 0, card: 0, voucher: 0, total: 0, notes: "" });
    } finally {
      setIsLoading(false);
    }
  }, [status]);

  // Save data to local storage
  useEffect(() => {
    if (status !== "authenticated") return;

    localStorage.setItem("tourRows", JSON.stringify(rows));
    localStorage.setItem("tourRowsData", JSON.stringify(rowsData));
    localStorage.setItem("payment", JSON.stringify(paymentData));
  }, [rows, rowsData, paymentData, status]);

  const addRow = useCallback((type: tours) => {
    const newId = crypto.randomUUID();
    setRows((prev) => {
      const newRows = [...prev, { id: newId, type }];
      return newRows.sort(
        (a, b) => tourOrder.indexOf(a.type) - tourOrder.indexOf(b.type),
      );
    });
  }, []);

  const resetReport = useCallback(function resetForm() {
    localStorage.removeItem("tourRows");
    localStorage.removeItem("tourRowsData");
    localStorage.removeItem("payment");

    setRows([]);
    setRowsData({});
    setPaymentData({ cash: 0, card: 0, voucher: 0, total: 0, notes: "" });
  }, []);

  const removeRow = useCallback((rowId: string) => {
    setRows((prev) => prev.filter((row) => row.id !== rowId));
    setRowsData((prev) => {
      const copy = { ...prev };
      delete copy[rowId];
      return copy;
    });
  }, []);

  const updateRowData = useCallback((rowId: string, data: any) => {
    setRowsData((prev) => ({ ...prev, [rowId]: data }));
  }, []);

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const allData = {
      rows: rows.map((row) => rowsData[row.id] || {}),
      payment: paymentData,
    };
    console.log("this is all data rows+payments", allData);

    try {
      await postTours(allData);
      alert(`Inserted tours successfully!`);
      resetReport();

      router.push("/reports");
    } catch (err) {
      console.error(err);
      alert("Failed to submit tours");
    }
  }
  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base lg:text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) return null;
  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="flex flex-wrap gap-2 mb-6">
        {[...Object.keys(tourOptions)].map((tourName) => (
          <button
            key={tourName}
            type="button"
            onClick={() => addRow(tourName as tours)}
            className="bg-primary text-primary-foreground px-3 py-1.5 lg:px-4 lg:py-2 rounded text-sm lg:text-base"
          >
            Add {tourName}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {rows.map((row) => (
          <TourRow
            key={row.id}
            rowId={row.id}
            tourName={row.type}
            boatOptions={tourOptions[row.type].boats}
            departureTimes={tourOptions[row.type].hours}
            onChange={updateRowData}
            onRemove={removeRow}
            initialData={rowsData[row.id]}
          />
        ))}

        <PaymentSummary onChange={setPaymentData} initialData={paymentData} />

        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white rounded px-6 py-3 text-sm lg:text-base"
          >
            Submit Report
          </button>

          <button
            type="button"
            onClick={resetReport}
            className="bg-red-600 hover:bg-red-700 text-white rounded px-6 py-3 text-sm lg:text-base"
          >
            Reset Report
          </button>
        </div>
      </form>
    </div>
  );
}
