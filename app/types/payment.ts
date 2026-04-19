export interface PaymentProps {
  onChange: (data: PaymentData) => void;
  initialData?: Partial<PaymentData>;
  data: {
    cash: number;
    card: number;
    voucher: number;
    notes: string;
    g11: number;
    ae5: number;
    receptionStaff: string;
    guides: string;
  };
}

export interface PaymentData {
  cash: number;
  card: number;
  voucher: number;
  notes: string;
  g11: number;
  ae5: number;
  receptionStaff: string;
  guides: string;
  total?: number;
}
