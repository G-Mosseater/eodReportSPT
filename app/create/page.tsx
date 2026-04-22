"use client";
import { useCallback, useEffect, useState } from "react";
import { TourRow } from "../components/TourRow";
import { TourKey, tourOptions } from "../helpers/tours";
import { postTours } from "../lib/api";
import { PaymentSummary } from "../components/PaymentSummary";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { tourOrder, tourLabels } from "../types/tourOrder";
import { Modal } from "../components/UI/Modal";
interface Row {
  id: string;
  type: TourKey;
}

export default function NewReport() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [rows, setRows] = useState<Row[]>(() => {
    if (typeof window === "undefined") return [];
    const saved = localStorage.getItem("tourRows");
    return saved ? JSON.parse(saved) : [];
  });

  const [rowsData, setRowsData] = useState<{ [key: string]: any }>(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("tourRowsData");
    return saved ? JSON.parse(saved) : {};
  });

  const [paymentData, setPaymentData] = useState(() => {
    if (typeof window === "undefined") return {};
    const saved = localStorage.getItem("payment");
    return saved
      ? JSON.parse(saved)
      : {
          cash: 0,
          card: 0,
          voucher: 0,
          total: 0,
          notes: "",
          g11: 0,
          ae5: 0,
        };
  });
  const [staffData, setStaffData] = useState({
    reception: "",
    guides: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signin");
      return;
    }
  }, [status, router]);

  // Save data to local storage
  useEffect(() => {
    if (status !== "authenticated") return;

    localStorage.setItem("tourRows", JSON.stringify(rows));
    localStorage.setItem("tourRowsData", JSON.stringify(rowsData));
    localStorage.setItem("payment", JSON.stringify(paymentData));
    localStorage.setItem("staff", JSON.stringify(staffData));
  }, [rows, rowsData, paymentData, status, staffData]);

  const addRow = useCallback((type: TourKey) => {
    const newId = crypto.randomUUID();
    setRows((prev) => {
      const newRows = [...prev, { id: newId, type }];
      return [...newRows].sort(
        (a, b) => tourOrder.indexOf(a.type) - tourOrder.indexOf(b.type),
      );
    });
  }, []);

  const resetReport = useCallback(function resetForm() {
    localStorage.removeItem("tourRows");
    localStorage.removeItem("tourRowsData");
    localStorage.removeItem("payment");
    localStorage.removeItem("staff");

    setRows([]);
    setRowsData({});
    setPaymentData({
      cash: 0,
      card: 0,
      voucher: 0,
      total: 0,
      notes: "",
      g11: 0,
      ae5: 0,
      receptionStaff: "",
      guides: "",
    });
    setStaffData({
      reception: "",
      guides: "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  async function submitReport() {
    const allData = {
      rows: rows.map((row) => rowsData[row.id] || {}),
      payment: paymentData,
      staff: staffData,
    };

    try {
      setIsSubmitting(true);
      await postTours(allData);

      setShowSubmitModal(false);
      resetReport();
      router.push("/reports");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base lg:text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) return null;

  const isReportEmpty = rows.length === 0;
  const tourKeys = Object.keys(tourOptions) as TourKey[];
  return (
    <div className="min-h-screen bg-background p-4 lg:p-8">
      <h1 className="text-2xl lg:text-4xl font-semibold text-foreground mb-4">
        Select tour:
      </h1>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 mb-6">
        {tourKeys.map((tourName) => (
          <button
            key={tourName}
            type="button"
            onClick={() => addRow(tourName)}
            className=" bg-primary text-white px-3 py-1.5 lg:px-6 lg:py-3 text-xs sm:text-sm lg:text-base rounded-md font-semibold flex-1 sm:flex-none min-w-[100px] transition hover:bg-secondary"
          >
            Add {tourLabels[tourName]}
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

        <PaymentSummary data={paymentData} onChange={setPaymentData} />

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded font-semibold transition w-fit bg-green-600 hover:bg-green-700 text-white"
          >
            Submit Report
          </button>

          <button
            type="button"
            onClick={resetReport}
            className="px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded font-semibold transition w-fit bg-red-600 hover:bg-red-700 text-white"
          >
            Reset Report
          </button>
        </div>
      </form>

      <Modal
        show={showSubmitModal}
        onCancel={() => setShowSubmitModal(false)}
        header="Submit Report"
        footer={
          <div className="flex justify-end gap-3">
            <button
              disabled={isSubmitting}
              onClick={() => setShowSubmitModal(false)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors duration-200"
            >
              Cancel
            </button>

            <button
              disabled={isSubmitting || isReportEmpty}
              onClick={submitReport}
              className={`px-4 py-2 text-white rounded ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
              {isSubmitting ? "Submitting..." : "Confirm"}
            </button>
          </div>
        }
      >
        <p className="text-sm lg:text-base mb-0">
          {isReportEmpty
            ? "Report is empty. Cannot submit."
            : "Are you sure you want to submit this report?"}
        </p>
      </Modal>
    </div>
  );
}
