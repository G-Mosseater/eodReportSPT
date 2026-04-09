
import { useEffect, useState } from "react";
import { formatIsk } from "../helpers/formatCurrency";
import { PaymentProps } from "../types/payment";

export function PaymentSummary({ onChange, initialData = {} }: PaymentProps) {
  const [cash, setCash] = useState(initialData.cash || 0);
  const [card, setCard] = useState(initialData.card || 0);
  const [voucher, setVoucher] = useState(initialData.voucher || 0);
  const [notes, setNotes] = useState(initialData.notes || "");
  const [g11, setG11] = useState(initialData.g11 || 0);
  const [ae5, setAE5] = useState(initialData.ae5 || 0);

  const totalWalkins = g11 + ae5;

  useEffect(() => {
    setCash(initialData.cash || 0);
    setCard(initialData.card || 0);
    setVoucher(initialData.voucher || 0);
    setNotes(initialData.notes || "");
    setG11(initialData.g11 || 0);
    setAE5(initialData.ae5 || 0);
  }, [initialData]);

  const total = cash + card + voucher;
  useEffect(() => {
    onChange({
      cash,
      card,
      voucher,
      total,
      notes,
      g11,
      ae5,
    });
  }, [cash, card, voucher, total, notes, ae5, g11]);

  return (
    <div className="flex flex-col gap-3 lg:gap-6 p-3 lg:p-4 border rounded w-full mt-4">
      <label className="text-sm font-medium text-muted-foreground ">
        <span className="border-b border-current pb-0.5">Payments</span>
      </label>
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
              value={value}
              onChange={(e) => setter(Number(e.target.value))}
              className="border rounded px-2 py-1.5 lg:px-3 lg:py-2 w-full text-sm lg:text-base focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>
        ))}
        <div className="flex flex-col">
          <label className="text-xs lg:text-sm font-medium text-muted-foreground mb-1 ">
            Total
          </label>
          <input
            type="text"
            readOnly
            value={formatIsk(total)}
            className="border rounded px-2 py-1.5 lg:px-3 lg:py-2 w-full bg-muted text-sm lg:text-base font-medium focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
          />
        </div>
      </div>
      <div>
        <div className="mb-4">
          <label className="text-sm font-medium text-muted-foreground">
            <span className="border-b border-current pb-0.5">Walk-ins</span>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="flex flex-col ">
            <label className="text-xs font-medium text-muted-foreground mb-1">
              G11
            </label>
            <input
              type="number"
              value={g11}
              onChange={(e) => setG11(Number(e.target.value))}
              className="border rounded px-2 py-1.5 w-full focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-1">
              AE5
            </label>
            <input
              type="number"
              value={ae5}
              onChange={(e) => setAE5(Number(e.target.value))}
              className="border rounded px-2 py-1.5 w-full focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-medium text-muted-foreground mb-1">
              Total walkins
            </label>
            <input
              type="number"
              value={totalWalkins}
              readOnly
              className="border rounded px-2 py-1.5 w-full bg-muted font-medium focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow ">
        <label className="text-sm font-medium text-muted-foreground mb-1">
          Group info / Cash to bank / Private tours
        </label>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="border rounded px-3 py-2 w-full h-24 text-base overflow-auto resize-y focus:outline-none focus:border-[#1E73BE] focus:ring-1 focus:ring-[#1E73BE]"
          placeholder="Write details here..."
        />
      </div>
    </div>
  );
}
