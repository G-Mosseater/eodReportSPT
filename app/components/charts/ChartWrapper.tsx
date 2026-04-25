import { ClipLoader } from "react-spinners";

type Props = {
  title?: string;
  children: React.ReactNode;
  loading?: boolean;
};
export default function ChartWrapper({ children, loading }: Props) {
  return (
    <div className="bg-gradient-to-br from-blue-50/25 to-white p-6 rounded-xl border border-blue-100 shadow-sm mt-6">
      {" "}
      <div className="relative">
        {children}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <ClipLoader size={50} color="#000" />
          </div>
        )}
      </div>
    </div>
  );
}
