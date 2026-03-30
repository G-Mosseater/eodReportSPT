import { useEffect, useState } from "react";
import { formatIsk } from "../helpers/formatCurrency";
type Props = {
  onChange: (data: {
    cash: number;
    card: number;
    voucher: number;
    total: number;
    notes: string;
  }) => void;
};

export function PaymentSummary({ onChange }: Props) {
  const [cash, setCash] = useState(0);
  const [card, setCard] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [notes, setNotes] = useState("");

  const total = cash + card + voucher;
  useEffect(() => {
    onChange({
      cash,
      card,
      voucher,
      total,
      notes,
    });
  }, [cash, card, voucher, total, notes]);
  return (
    <div className="flex gap-4 p-2 border rounded w-max mt-4">
      {(
        [
          ["Cash", cash, setCash],
          ["Card", card, setCard],
          ["Voucher", voucher, setVoucher],
        ] as [string, number, React.Dispatch<React.SetStateAction<number>>][]
      ).map(([label, value, setter]) => (
        <div key={label} className="flex flex-col items-center">
          <label className="text-sm">{label}</label>
          <input
            type="number"
            min={0}
            value={value}
            onChange={(e) => setter(Number(e.target.value))}
            className="border rounded px-2 py-1 w-24"
          />
        </div>
      ))}
      <div className="flex flex-col items-center">
        <label className="text-sm">Total</label>
        <input
          type="text"
          readOnly
          value={formatIsk(total)}
          className="border rounded px-2 py-1 w-24 bg-gray-100"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm">Additional Info</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded px-2 py-1 w-96 h-24 resize-none"
          placeholder="Write any extra details here..."
        />
      </div>
    </div>
  );
}
