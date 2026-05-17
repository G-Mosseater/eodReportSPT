"use client";

import ReactECharts from "echarts-for-react";
import { MONTH_LABELS } from "./StackedBarChart";
import { useIsMobile } from "../../../helpers/useIsMobile";

type Props = {
  cancellationRate: {
    month: number;
    rate: number;
  }[];
};

export default function CancellationRateChart({ cancellationRate }: Props) {
  const isMobile = useIsMobile();

  const option = {
    title: {
      top: 0,
      text: "Tour Cancellation Rate",
      subtext:
        "Percentage of tours cancelled each month (based on total scheduled trips)",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 15,
      },
    },

    tooltip: {
      trigger: "axis",
      valueFormatter: (value: number) => `${value}%`,
    },

    grid: {
      left: 20,
      right: 20,
      top: 50,
      bottom: 0,
      containLabel: true,
    },

    xAxis: {
      type: "category",

      data: cancellationRate.map((item) => MONTH_LABELS[item.month - 1]),

      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },

    yAxis: {
      type: "value",

      axisLabel: {
        formatter: "{value}%",
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },

    series: [
      {
        name: "Cancellation Rate",
        data: cancellationRate.map((item) => item.rate),
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(21, 90, 150, 0.35)",
              },
              {
                offset: 1,
                color: "rgba(21, 90, 150, 0.04)",
              },
            ],
          },
        },
        lineStyle: {
          width: isMobile ? 2 : 3,
          color: "#155a96",
        },
        symbolSize: 7,
      },
    ],
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[450px] xl:h-[500px] mb-6">
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}
