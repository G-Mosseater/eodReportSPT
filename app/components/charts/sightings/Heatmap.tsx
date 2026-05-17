"use client";
import ReactECharts from "echarts-for-react";
import { MONTH_LABELS } from "./StackedBarChart";
import { useIsMobile } from "../../../helpers/useIsMobile";

type Props = {
  heatmapData: number[][];
  hours: string[];
  months: number[];
};

export default function Heatmap({ heatmapData, hours, months }: Props) {
  const isMobile = useIsMobile();

  const option = {
    title: {
      top: 0,
      text: "Whale Sightings by Time and Month",
      subtext: "Intensity of whale sightings by month and hour of the day",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 15,
      },
    },
    tooltip: {
      position: "top",
      formatter: (params: any) => {
        const [hourIndex, monthIndex, sightings, tours] = params.data;

        const hour = hours[hourIndex];
        const month = MONTH_LABELS[months[monthIndex] - 1];

        const rate = tours > 0 ? (sightings / tours).toFixed(2) : "0";

        return `
      <b>${month} - ${hour}</b><br/>
      Sightings: ${sightings}<br/>
      Tours: ${tours}<br/>
      Rate: ${rate} per tour
    `;
      },
    },

    grid: {
      left: 20,
      right: 20,
      top: 55,
      bottom: 80,
      containLabel: true,
    },

    xAxis: {
      type: "category",
      data: hours,
      splitArea: {
        show: true,
      },
      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },

    yAxis: {
      type: "category",
      data: months.map((m) => MONTH_LABELS[m - 1]),
      splitArea: {
        show: true,
      },
      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },

    visualMap: {
      min: 0,
      max: Math.max(...heatmapData.map((d) => d[3])) || 1,
      calculable: true,
      orient: "horizontal",
      left: "center",
      bottom: "0%",
      inRange: {
        color: ["#d9e8f5", "#155a96"],
      },
    },

    series: [
      {
        name: "Total whale sightings",
        type: "heatmap",

        data: heatmapData,

        label: {
          show: true,
        },

        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
    ],
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[450px] xl:h-[500px]">
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}
