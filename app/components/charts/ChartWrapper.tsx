import { ClipLoader } from "react-spinners";

type Props = {
  title?: string;
  children: React.ReactNode;
  loading?: boolean;
};
export default function ChartWrapper({ children, loading }: Props) {
  return (
    <div className="bg-white p-4 rounded border border-secondary shadow mt-6 ">
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
