"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getReportById, updateReport } from "../../lib/api";
import { TourRow } from "../../components/TourRow";
import { PaymentSummary } from "../../components/PaymentSummary";
import { tourOptions } from "../../helpers/tours";
import { tours, tourOrder } from "../../types/tourOrder";

interface Row {
  id: string;
  type: tours;
}

export default function EditReport() {
  const [rows, setRows] = useState<Row[]>([]);
  const [rowsData, setRowsData] = useState<Record<string, any>>({});
  const [paymentData, setPaymentData] = useState({
    cash: 0,
    card: 0,
    voucher: 0,
    total: 0,
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace(
        `/signin?callbackUrl=${encodeURIComponent(`/edit/${id}`)}`,
      );
    }
  }, [status, router, id]);

  useEffect(() => {
    if (status !== "authenticated" || !id) {
      setIsLoading(false);
      return;
    }

    async function fetchReport() {
      setIsLoading(true);
      try {
        const data = await getReportById(String(id));

        const loadedRows: Row[] = data.rows.map((row: any) => ({
          id: crypto.randomUUID(),
          type: row.tourName,
        }));

        const loadedRowsData: Record<string, any> = {};
        loadedRows.forEach((r, index) => {
          loadedRowsData[r.id] = data.rows[index];
        });

        setRows(loadedRows);
        setRowsData(loadedRowsData);
        setPaymentData(
          data.payment || { cash: 0, card: 0, voucher: 0, total: 0, notes: "" },
        );
      } catch (err) {
        console.error(err);
        alert(
          "Failed to load report. It may have been deleted or you don't have access.",
        );
        router.push("/reports");
      } finally {
        setIsLoading(false);
      }
    }

    fetchReport();
  }, [id, status, router]);

  const addRow = useCallback((type: tours) => {
    const newId = crypto.randomUUID();
    setRows((prev) => {
      const newRows = [...prev, { id: newId, type }];
      return newRows.sort(
        (a, b) => tourOrder.indexOf(a.type) - tourOrder.indexOf(b.type),
      );
    });
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id) return;

    const allData = {
      rows: rows.map((row) => rowsData[row.id] || {}),
      payment: paymentData,
    };

    try {
      await updateReport(String(id), allData);
      alert("Report updated successfully!");
      router.push("/reports");
    } catch (err) {
      console.error(err);
      alert("Failed to update report. Please try again.");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading report...
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 mb-6">
        {[...Object.keys(tourOptions)].map((tourName) => (
          <button
            key={tourName}
            type="button"
            onClick={() => addRow(tourName as tours)}
            className="
                bg-blue-600 text-white
          px-3 py-1.5 lg:px-6 lg:py-3
          text-xs sm:text-sm lg:text-base
          rounded-md
          font-semibold
          flex-1 sm:flex-none
          min-w-[100px]
          transition
          hover:bg-blue-700
        "
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
          className="px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded font-semibold transition w-fit bg-green-600 hover:bg-green-700 text-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
