import ReactEcharts from "echarts-for-react";

export default function HourlyLineChart({ data }: any) {
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
      bottom: 40,
      containLabel: false,
    },
    xAxis: {
      type: "category",
      data: data.map((d: any) => d.hour),
      name: "Departure time",
      nameLocation: "middle",
      nameGap: 50,
      axisLabel: {
        fontSize: 14,
        margin: 8,
      },
      boundaryGap: false,

      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    yAxis: {
      type: "value",
      name: "Count",
      nameLocation: "middle",
      nameGap: 60,
      axisLabel: {
        fontSize: 14,
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
  return <ReactEcharts option={option} style={{ height: 350 }} />;
}
