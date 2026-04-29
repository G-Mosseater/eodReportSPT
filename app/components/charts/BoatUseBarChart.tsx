import ReactECharts from "echarts-for-react";
const boatColors: Record<string, string> = {
  Andrea: "#3b82f6",
  Lilja: "#22c55e",
  Rosin: "#f97316",
  Skuli: "#a855f7",
  Katla: "#ef4444",
  Dagmar: "#eab308",
  Other: "#6b7280",
  Unknown: "#d5d9df",
};
export default function BoatChart({ data }: any) {
  const option = {
    grid: { left: 0, right: 0, top: 60, bottom: 30, containLabel: true },

    title: { text: "Passengers by Boat", left: "center" },
    tooltip: {},
    xAxis: {
      type: "category",
      data: data.map((d: any) => d.boat),
      axisLabel: {
        fontSize: 13,
        fontWeight: 600
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 13,
        fontWeight: 600,
        
      },
    },

    series: [
      {
        type: "bar",
        data: data.map((d: any) => ({
          value: d.total,
          itemStyle: {
            color: boatColors[d.boat] || "#64748b",
          },
        })),
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
}
