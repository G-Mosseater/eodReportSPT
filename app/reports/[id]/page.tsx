"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getReportById, removeReport } from "../../lib/api";
import { formatIsk } from "../../helpers/formatCurrency";
import { useSession } from "next-auth/react";
import { downloadCSVFile, reportToCSV } from "../../helpers/downloadCsv";
import { Modal } from "../../components/UI/Modal";

export default function ReportPage() {
  const { id } = useParams();
  const [report, setReport] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/signin");
    },
  });
  function handleDownload() {
    if (!report) return;

    const csv = reportToCSV(report);
    downloadCSVFile(`report-${report._id}.csv`, csv);
  }

  async function handleDeleteReport(id: string, router: any) {
    try {
      await removeReport(id);
      setShowModal(false);
      router.push("/reports");
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (status !== "authenticated" || !id) return;
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
  }, [status, id]);

  if (status === "loading" || report === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base lg:text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Report Details
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
            Created: {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>

        <section className="mb-6 lg:mb-8">
          <div className="flex items-center justify-between mb-3 lg:mb-4">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
              Tours
            </h2>

            <button
              onClick={() => router.back()}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm md:text-base hidden lg:inline-block"
            >
              Go back
            </button>
          </div>
          <div className="space-y-4 lg:space-y-6">
            {report.rows?.map((row: any) => {
              const isCanceled = row.status === "Canceled";
              return (
                <div
                  key={row._id || row.tourName + row.hour}
                  className={`w-full rounded-lg border p-4 md:p-2 lg:p-3 shadow-sm transition-all ${
                    isCanceled
                      ? "bg-red-50 border-red-300 dark:bg-red-950/30 dark:border-red-800"
                      : "bg-card border-border"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 lg:mb-5">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground">
                        {row.tourName}
                      </h3>
                      <span
                        className={`px-2 py-0.5 lg:px-3 lg:py-1 rounded-full text-xs lg:text-sm font-medium ${
                          isCanceled
                            ? "bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {row.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 lg:w-5 lg:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {row.hour}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4 lg:w-5 lg:h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {row.boat}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 lg:gap-4">
                    <div className="bg-background/50 rounded-md p-2 lg:p-3 text-center border border-border/50">
                      <p className="text-xs lg:text-sm text-muted-foreground mb-0.5 lg:mb-1">
                        Adults
                      </p>
                      <p className="text-base lg:text-xl font-semibold text-foreground">
                        {row.adults}
                      </p>
                    </div>
                    <div className="bg-background/50 rounded-md p-2 lg:p-3 text-center border border-border/50">
                      <p className="text-xs lg:text-sm text-muted-foreground mb-0.5 lg:mb-1">
                        Youth
                      </p>
                      <p className="text-base lg:text-xl font-semibold text-foreground">
                        {row.youth}
                      </p>
                    </div>
                    <div className="bg-background/50 rounded-md p-2 lg:p-3 text-center border border-border/50">
                      <p className="text-xs lg:text-sm text-muted-foreground mb-0.5 lg:mb-1">
                        Child
                      </p>
                      <p className="text-base lg:text-xl font-semibold text-foreground">
                        {row.child}
                      </p>
                    </div>
                    <div className="bg-background/50 rounded-md p-2 lg:p-3 text-center border border-border/50">
                      <p className="text-xs lg:text-sm text-muted-foreground mb-0.5 lg:mb-1">
                        Groups
                      </p>
                      <p className="text-base lg:text-xl font-semibold text-foreground">
                        {row.groups}
                      </p>
                    </div>
                    <div className="bg-background/50 rounded-md p-2 lg:p-3 text-center border border-border/50">
                      <p className="text-xs lg:text-sm text-muted-foreground mb-0.5 lg:mb-1">
                        Free
                      </p>
                      <p className="text-base lg:text-xl font-semibold text-foreground">
                        {row.free}
                      </p>
                    </div>
                    <div className="bg-primary/10 rounded-md p-2 lg:p-3 text-center border border-primary/20">
                      <p className="text-xs lg:text-sm text-primary mb-0.5 lg:mb-1">
                        Total
                      </p>
                      <p className="text-base lg:text-xl font-bold text-primary">
                        {row.total}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mb-6 lg:mb-8">
          <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-3 lg:mb-4">
            Payment Summary
          </h2>
          <div className="w-full bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 shadow-sm">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-6 mb-4 lg:mb-6">
              {report.payment?.cash != null && (
                <div className="bg-background/50 rounded-md p-3 lg:p-4 text-center border border-border/50">
                  <p className="text-xs lg:text-sm text-muted-foreground mb-1 lg:mb-2">
                    Cash
                  </p>
                  <p className="text-lg lg:text-2xl font-semibold text-foreground">
                    {formatIsk(report.payment.cash)}
                  </p>
                </div>
              )}
              {report.payment?.card != null && (
                <div className="bg-background/50 rounded-md p-3 lg:p-4 text-center border border-border/50">
                  <p className="text-xs lg:text-sm text-muted-foreground mb-1 lg:mb-2">
                    Card
                  </p>
                  <p className="text-lg lg:text-2xl font-semibold text-foreground">
                    {formatIsk(report.payment.card)}
                  </p>
                </div>
              )}
              {report.payment?.voucher != null && (
                <div className="bg-background/50 rounded-md p-3 lg:p-4 text-center border border-border/50">
                  <p className="text-xs lg:text-sm text-muted-foreground mb-1 lg:mb-2">
                    Voucher
                  </p>
                  <p className="text-lg lg:text-2xl font-semibold text-foreground">
                    {formatIsk(report.payment.voucher)}
                  </p>
                </div>
              )}
              {report.payment?.total != null && (
                <div className="bg-primary/10 rounded-md p-3 lg:p-4 text-center border border-primary/20">
                  <p className="text-xs lg:text-sm text-primary mb-1 lg:mb-2">
                    Total
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-primary">
                    {formatIsk(report.payment.total)}
                  </p>
                </div>
              )}
            </div>

            {report.payment?.notes && (
              <div className="border-t border-border pt-4 lg:pt-5">
                <p className="text-sm lg:text-base font-medium text-foreground mb-2">
                  Notes
                </p>
                <p className="text-sm lg:text-base text-muted-foreground whitespace-pre-wrap bg-background/50 rounded-md p-3 lg:p-4 border border-border/50">
                  {report.payment.notes}
                </p>
              </div>
            )}
          </div>
        </section>
        <div className="flex flex-wrap justify-between items-center gap-3 w-full mt-6">
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded font-semibold transition w-fit bg-red-600 hover:bg-red-700 text-white"
          >
            Delete Report
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => router.push(`/edit/${id}`)}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded font-semibold transition w-fit  text-primary-foreground"
            >
              Edit Report
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 lg:px-6 lg:py-3 text-sm lg:text-base rounded font-semibold transition w-fit bg-green-600 hover:bg-green-700 text-white"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        header="Delete Report"
        footer={
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 rounded text-sm lg:text-base bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => handleDeleteReport(String(id), router)}
              className="px-4 py-2 rounded text-sm lg:text-base bg-red-600 hover:bg-red-700 text-white transition"
            >
              Delete
            </button>
          </div>
        }
      >
        <p className="text-sm lg:text-base text-muted-foreground mb-0">
          Are you sure you want to delete this report?
        </p>
      </Modal>
    </div>
  );
}
