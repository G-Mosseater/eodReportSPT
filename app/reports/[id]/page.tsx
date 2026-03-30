"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getReportById } from "../../lib/api";
import { handleDeleteReport } from "../../lib/actions";

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchReport() {
      if (!id) return;
      try {
        const data = await getReportById(String(id));
        setReport(data);
        console.log("this is the data", data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchReport();
  }, [id]);

  if (!report) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Report Details</h1>
      <p className="mb-4">
        Created at: {new Date(report.createdAt).toLocaleString()}
      </p>

      <h2 className="text-xl font-semibold mb-2">Tours</h2>
      <ul className="space-y-4 mb-6">
        {report.rows?.map((row: any) => (
          <li
            key={row._id || row.tourName + row.hour}
            className={`p-4 border rounded shadow-sm ${
              row.status === "Canceled" ? "bg-red-100 border-red-400" : ""
            }`}
          >
            <p>
              <strong>Tour:</strong> {row.tourName}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  row.status === "Canceled" ? "text-red-600 font-bold" : ""
                }
              >
                {row.status}
              </span>
            </p>
            <p>
              <strong>Hour:</strong> {row.hour}
            </p>
            <p>
              <strong>Boat:</strong> {row.boat}
            </p>
            <p>
              <strong>Adults:</strong> {row.adults}
            </p>
            <p>
              <strong>Youth:</strong> {row.youth}
            </p>
            <p>
              <strong>Child:</strong> {row.child}
            </p>
            <p>
              <strong>Groups:</strong> {row.groups}
            </p>
            <p>
              <strong>Free:</strong> {row.free}
            </p>
            <p>
              <strong>Total:</strong> {row.total}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Payment</h2>
      <div className="p-4 border rounded shadow-sm mb-6">
        {report.payment?.cash != null && (
          <p>
            <strong>Cash:</strong> {report.payment.cash}
          </p>
        )}
        {report.payment?.card != null && (
          <p>
            <strong>Card:</strong> {report.payment.card}
          </p>
        )}
        {report.payment?.voucher != null && (
          <p>
            <strong>Voucher:</strong> {report.payment.voucher}
          </p>
        )}
        {report.payment?.total != null && (
          <p>
            <strong>Total:</strong> {report.payment.total}
          </p>
        )}
        {report.payment?.notes && (
          <p>
            <strong>Notes:</strong>
            <span className="block whitespace-pre-wrap">
              {report.payment.notes}
            </span>
          </p>
        )}
      </div>
      <button
        onClick={() => handleDeleteReport(String(id), router)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Delete Report
      </button>
    </div>
  );
}
