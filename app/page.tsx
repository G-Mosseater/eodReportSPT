"use client";
import { useState } from "react";
import { TourRow } from "./components/TourRow";
import { tourOptions, tourTypes } from "./types/tourTypes";
import { getPrivateOptions } from "./helpers/tourOption";
import { postTours } from "./lib/api";
import { PaymentSummary } from "./components/PaymentSummary";
interface Row {
  id: string;
  type: tourTypes;
}
export const tourOrder: tourTypes[] = [
  "Whale Watching",
  "RIB Express",
  "Northern Lights",
  "Puffin by RIB",
  "Puffin Tour",
  "Sea Angling",
  "Private",
];

export default function Home() {
  const [rows, setRows] = useState<Row[]>([]);
  const [rowsData, setRowsData] = useState<{ [key: string]: any }>({});
  const [paymentData, setPaymentData] = useState({
    cash: 0,
    card: 0,
    voucher: 0,
    total: 0,
    notes: "",
  });

  function addRow(type: tourTypes) {
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
    console.log('this is all data rows+payments',allData)

    try {
     await postTours(allData);


      alert(`Inserted tours successfully!`);
    } catch (err) {
      console.error(err);
      alert("Failed to submit tours");
    }
  }

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        {[...Object.keys(tourOptions), "Private"].map((tourName) => (
          <button
            key={tourName}
            type="button"
            onClick={() => addRow(tourName as tourTypes)}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Add {tourName}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-start gap-4">
        {rows.map((row) => {
          const options =
            row.type === "Private"
              ? getPrivateOptions()
              : (tourOptions[row.type] ?? { boats: [], hours: [] });
          return (
            <TourRow
              key={row.id}
              rowId={row.id}
              tourName={row.type}
              boatOptions={options.boats}
              departureTimes={options.hours}
              onChange={updateRowData}
              onRemove={removeRow}
            />
          );
        })}
        <PaymentSummary onChange={setPaymentData} />
        <button
          type="submit"
          className="bg-green-600 text-white rounded px-3 py-2 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
