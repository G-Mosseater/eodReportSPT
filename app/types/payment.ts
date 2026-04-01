export interface PaymentProps {
  onChange: (data: {
    cash: number;
    card: number;
    voucher: number;
    total: number;
    notes: string;
  }) => void;
  initialData?: {
    cash?: number;
    card?: number;
    voucher?: number;
    total?: number;
    notes?: string;
  };
}