"use client";
import ReactECharts from "echarts-for-react";
import { useIsMobile } from "../../../helpers/useIsMobile";

type Props = {
  data: { hour: string; count: number; exposure: number }[];
};

export default function HourDistributionChart({ data }: Props) {
  const isMobile = useIsMobile();

  const option = {
    title: {
      top: 0,
      text: "Total Sightings Count by Hour",
      subtext: "Sightings distribution of all tours by hour of the day",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 15,
      },
    },
    tooltip: {
      confine: true,
      trigger: "axis",
    },
    grid: {
      left: 10,
      right: 10,
      top: 40,
      bottom: 0,
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: data.map((d) => d.hour),
      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },
    legend: {
      top: 0,
      right: 0,
    },
    series: [
      {
        name: "Sightings",
        type: "bar",
        data: data.map((d) => d.count),
        barWidth: isMobile ? "35%" : "60%",
        itemStyle: {
          borderRadius: [10, 10, 0, 0],
          color: "#155a96",
        },
      },
      {
        name: "Tours Operated",
        type: "line",
        data: data.map((d) => d.exposure),
        smooth: true,
        lineStyle: {
          width: 2,
          color: "rgb(81, 192, 229)",
        },
        itemStyle: {
          color: "#29b9ad",
          borderWidth: 2,
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
