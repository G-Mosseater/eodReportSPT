export interface PaymentProps {
  onChange: (data: {
    cash: number;
    card: number;
    voucher: number;
    total: number;
    notes: string;
    g11: number;
    ae5: number;
  }) => void;
  initialData?: {
    cash?: number;
    card?: number;
    voucher?: number;
    total?: number;
    notes?: string;
    g11?: number;
    ae5?: number;
  };
}
