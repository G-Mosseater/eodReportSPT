export function downloadCSVFile(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  link.click();

  URL.revokeObjectURL(url);
}
export function reportToCSV(report: any) {
  const safe = (value: any): string => {
    if (value == null) return '""';
    const str = String(value).replace(/"/g, '""');
    return `"${str}"`;
  };
  const meta = [
    ["Created At", safe(new Date(report.createdAt).toLocaleString())],
  ];
  const headers = [
    "Tour",
    "Status",
    "Hour",
    "Boat",
    "Adults",
    "Youth",
    "Child",
    "Groups",
    "Free",
    "Total",
  ];

  const rows =
    report.rows?.map((row: any) => [
      safe(row.tourName),
      safe(row.status),
      safe(row.hour),
      safe(row.boat),
      safe(row.adults),
      safe(row.youth),
      safe(row.child),
      safe(row.groups),
      safe(row.free),
      safe(row.total),
    ]) ?? [];

  const paymentSummary = [
    ["PAYMENT SUMMARY"],
    ["Cash", safe(report.payment?.cash ?? 0)],
    ["Card", safe(report.payment?.card ?? 0)],
    ["Voucher", safe(report.payment?.voucher ?? 0)],
    ["Total", safe(report.payment?.total ?? 0)],
    ["Notes", safe(report.payment?.notes ?? "")],
  ];

  const csvContent = [
    ...meta.map((row) => row.join(",")),
    "", // Empty line
    headers.join(","), // Headers
    ...rows.map((row: any[]) => row.join(",")),
    "", // Empty line before payment summary
    ...paymentSummary.map((row) => row.join(",")),
  ].join("\n");

  return csvContent;
}
