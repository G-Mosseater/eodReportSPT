export interface TourRowProps {
  rowId: string;
  tourName: string;
  boatOptions: string[];
  departureTimes: string[];
  onChange: (rowId: string, data: any) => void;
  onRemove: (rowId: string) => void;
  payment?: {
    cash: number;
    card: number;
    voucher: number;
    total: number;
  };
  initialData?: {
    hour?: string;
    boat?: string;
    adults?: number;
    groups?: number;
    youth?: number;
    child?: number;
    endurkoma?: number;
    free?: number;
    status?: string;
  };
}