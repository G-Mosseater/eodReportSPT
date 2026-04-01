import { useEffect, useState } from "react";
import { formatIsk } from "../helpers/formatCurrency";
import { PaymentProps } from "../types/payment";


export function PaymentSummary({ onChange, initialData = {} }: PaymentProps) {
  const [cash, setCash] = useState(initialData.cash || 0);
  const [card, setCard] = useState(initialData.card || 0);
  const [voucher, setVoucher] = useState(initialData.voucher || 0);
  const [notes, setNotes] = useState(initialData.notes || "");

  const total = initialData.total || cash + card + voucher;

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
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-6 p-3 lg:p-4 border rounded w-full mt-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 lg:gap-4">
        {(
          [
            ["Cash", cash, setCash],
            ["Card", card, setCard],
            ["Voucher", voucher, setVoucher],
          ] as [string, number, React.Dispatch<React.SetStateAction<number>>][]
        ).map(([label, value, setter]) => (
          <div key={label} className="flex flex-col">
            <label className="text-xs lg:text-sm font-medium text-muted-foreground mb-1">
              {label}
            </label>
            <input
              type="number"
              min={0}
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              className="border rounded px-2 py-1.5 lg:px-3 lg:py-2 w-full text-sm lg:text-base"
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label className="text-xs lg:text-sm font-medium text-muted-foreground mb-1">
            Total
          </label>
          <input
            type="text"
            readOnly
            value={formatIsk(total)}
            className="border rounded px-2 py-1.5 lg:px-3 lg:py-2 w-full bg-muted text-sm lg:text-base font-medium"
          />
        </div>
      </div>
      <div className="flex flex-col flex-grow min-w-[250px]">
        <label className="text-sm font-medium text-muted-foreground mb-1">
          Group info / Cash to bank / Private tours
        </label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded px-3 py-2 w-full h-24 text-base overflow-auto resize-y"
          placeholder="Write details here..."
        />
      </div>
    </div>
  );
}
