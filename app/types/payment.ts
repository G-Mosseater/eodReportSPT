export interface PaymentProps {
  onChange: (data: PaymentData) => void;
  initialData?: Partial<PaymentData>;
}


export interface PaymentData {
  cash: number;
  card: number;
  voucher: number;
  total: number;
  notes?: string;
  g11?: number;
  ae5?: number;
}