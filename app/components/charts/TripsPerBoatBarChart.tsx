import ReactECharts from "echarts-for-react";

export default function TripsPerBoat({ data }: any) {
  const colors: Record<string, string> = {
    Andrea: "#3b82f6",
    Lilja: "#22c55e",
    Rosin: "#f97316",
    Skuli: "#a855f7",
    Katla: "#ef4444",
    Dagmar: "#eab308",
    Other: "#6b7280",
  };

  const option = {
    grid: { left: 0, right: 15, top: 60, bottom: 30, containLabel: true },
    title: { text: "Boat Trips", left: "center" },

    xAxis: {
      type: "value",
      name: "Trips",
      axisLabel: {
        fontSize: 13,
        fontWeight: 600,
      },
    },

    yAxis: {
      type: "category",

      data: data.map((d: any) => d.boat),
      axisLabel: {
        fontSize: 13,
        fontWeight: 600,
        margin: 16,
      },
    },

    series: [
      {
        type: "bar",
        barWidth: 36,
        data: data.map((d: any) => ({
          value: d.trips,
          itemStyle: {
            color: colors[d.boat] || "#64748b",
          },
        })),

        label: {
          show: true,
          position: "right",
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 350 }} />;
}
