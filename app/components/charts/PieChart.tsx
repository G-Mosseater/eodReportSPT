import ReactEcharts from "echarts-for-react";

export default function PieChart({ data }: any) {
  const option = {
    title: {
      text: "Total Passenger Distribution",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      show: false,
    },
    label: {
      fontSize: 13,
      fontWeight: 500,
      formatter: "{b}: {c}",
      overflow: "truncate",
    },
    series: [
      {
        name: "Tours",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "55%"],
        data: data.map((d: any) => ({
          name: d.tour,
          value: d.total,
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <div className="w-full h-[350px] min-w-[320px]">
      <ReactEcharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
