import ReactEcharts from "echarts-for-react";
import { loadingOption } from "./LoadingOption";

export default function HourlyLineChart({ data, loading }: any) {
  //   if (!data.length) return null;
  const option = {
    title: {
      text: "Total Hourly Passengers",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: 0,
      right: 0,
      top: 60,
      bottom: 30,
      containLabel: false,
    },
    xAxis: {
      type: "category",
      data: data.map((d: any) => d.hour),
      name: "Departure time",
      nameLocation: "middle",
      nameGap: 50,
      axisLabel: {
        fontSize: 13,
        fontWeight: 600,
        margin: 10,
      },
      boundaryGap: false,

      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    yAxis: {
      interval: 1000,
      type: "value",
      name: "Count",
      nameLocation: "middle",
      nameGap: 60,
      axisLabel: {
        fontSize: 12,
        fontWeight: 600,
        margin: 10,
      },
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    series: [
      {
        type: "line",
        data: data.map((d: any) => d.total),
        smooth: true,
        areaStyle: {},
        label: {
          position: "top",
          color: "#111",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 12,
          },
        },
      },
    ],
  };
  return (
    <div className="w-full h-[220px] sm:h-[280px] md:h-[350px]">
      <ReactEcharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}

// key={loading ? "loading" : "data"}
// option={option}
// notMerge={true}
// lazyUpdate={true}
