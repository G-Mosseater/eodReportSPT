import { GiWhaleTail } from "react-icons/gi";
import { MdCancel, MdOutlineSearchOff } from "react-icons/md";
import { IoBoatOutline, IoStatsChartOutline } from "react-icons/io5";
import { TbWavesElectricity } from "react-icons/tb";

type Props = {
  totalSightings: number;
  totalCancelled: number;
  totalPrivate: number;
  breachingEvents: number;
  endurkoma: number;
};

const kpis = (data: Props) => [
  {
    label: "Total Sightings",
    value: data.totalSightings,
    icon: GiWhaleTail,
    color: "text-primary",
  },
  {
    label: "Private Tours",
    value: data.totalPrivate,
    icon: IoBoatOutline,
    color: "text-primary",
  },
  {
    label: "Breaching Events",
    value: data.breachingEvents,
    icon: TbWavesElectricity,
    color: "text-primary",
  },
  {
    label: "Cancelled Tours",
    value: data.totalCancelled,
    icon: MdCancel,
    color: "text-red-500",
  },
  {
    label: "Endurkoma",
    value: data.endurkoma,
    icon: MdOutlineSearchOff,
    color: "text-red-500",
  },
];

export default function WhaleKpiBoxes(props: Props) {
  return (
    <div className="space-y-4">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <IoStatsChartOutline className="text-primary" />
        Operational Overview
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {kpis(props).map((kpi) => {
          const Icon = kpi.icon;

          return (
            <div
              key={kpi.label}
              className="group bg-white/70 backdrop-blur border border-blue-100 rounded-xl p-5 shadow-sm
                         hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 font-medium">{kpi.label}</p>

                <div className="p-2 rounded-full bg-blue-50 group-hover:bg-blue-100 transition">
                  <Icon className={`text-xl ${kpi.color}`} />
                </div>
              </div>

              <p className={`text-xl md:text-2xl font-bold mt-3 ${kpi.color}`}>
                {kpi.value.toLocaleString()}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
