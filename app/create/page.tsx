"use client";
import { useEffect, useState } from "react";
import { TourRow } from "../components/TourRow";
import { tourOptions } from "../helpers/tours";
// import { getPrivateOptions } from "./helpers/tourOption";
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
  const [rows, setRows] = useState<Row[]>([]);
  const [rowsData, setRowsData] = useState<{ [key: string]: any }>({});
  const [paymentData, setPaymentData] = useState({
    cash: 0,
    card: 0,
    voucher: 0,
    total: 0,
    notes: "",
  });
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [status, router]);

  // Load data from local storage
  useEffect(() => {
    try {
      const savedRows = localStorage.getItem("tourRows");
      if (savedRows) setRows(JSON.parse(savedRows));
    } catch (err) {
      console.warn("Failed to parse tourRows from localStorage:", err);
      setRows([]);
    }

    try {
      const savedRowsData = localStorage.getItem("tourRowsData");
      if (savedRowsData) setRowsData(JSON.parse(savedRowsData));
    } catch (err) {
      console.warn("Failed to parse tourRowsData from localStorage:", err);
      setRowsData({});
    }

    try {
      const savedPayment = localStorage.getItem("payment");
      if (savedPayment) setPaymentData(JSON.parse(savedPayment));
    } catch (err) {
      console.warn("Failed to parse paymentData from localStorage:", err);
      setPaymentData({ cash: 0, card: 0, voucher: 0, total: 0, notes: "" });
    }
  }, []);

  // Save data to local storage
  useEffect(() => {
    (localStorage.setItem("tourRows", JSON.stringify(rows)),
      localStorage.setItem("tourRowsData", JSON.stringify(rowsData)),
      localStorage.setItem("payment", JSON.stringify(paymentData)));
  }, [rows, rowsData, paymentData]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base lg:text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) return null;
  function addRow(type: tours) {
    const id = crypto.randomUUID();
    const newRows = [...rows, { id, type }];

    newRows.sort(
      (a, b) => tourOrder.indexOf(a.type) - tourOrder.indexOf(b.type),
    );

    setRows(newRows);
  }

  function removeRow(id: string) {
    setRows((prev) => prev.filter((row) => row.id !== id));

    setRowsData((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  }

  function updateRowData(rowId: string, data: any) {
    setRowsData((prev) => ({ ...prev, [rowId]: data }));
  }

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
      localStorage.removeItem("tourRows");
      localStorage.removeItem("tourRowData");
      localStorage.removeItem("payment");
      setRows([]);
      setRowsData({});
      setPaymentData({ cash: 0, card: 0, voucher: 0, total: 0, notes: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to submit tours");
    }
  }

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

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white rounded px-4 py-2 lg:px-6 lg:py-3 mt-4 w-fit text-sm lg:text-base"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
}
