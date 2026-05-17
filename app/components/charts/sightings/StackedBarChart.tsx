"use client";

import ReactECharts from "echarts-for-react";
import { SPECIES_COLORS } from "../../../lib/aggregatedSightings";
import { useIsMobile } from "../../../helpers/useIsMobile";
type Props = {
  months: number[];
  series: {
    name: string;
    data: number[];
    species: string;
  }[];
};

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function WhaleChart({ months, series }: Props) {
  const isMobile = useIsMobile();
  const option = {
    title: {
      text: "Total Sightings Over Time",
      top: 0,
      subtext:
        "Monthly distribution of whale sightings grouped by species (stacked comparison)",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 15,
      },
    },
    grid: {
      left: 10,
      right: 10,
      top: 50,
      bottom: 85,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: (params: any) => {
        const filtered = params.filter((p: any) => p.value > 0);

        if (!filtered.length) return "";

        const title = filtered[0].axisValue;

        const lines = filtered.map((p: any) => `${p.seriesName}: ${p.value}`);

        return [`<b>${title}</b>`, ...lines].join("<br/>");
      },
    },

    legend: {
      data: series.map((s) => s.name),

      orient: "horizontal",
      bottom: 0,
      left: "center",
      itemWidth: isMobile ? 10 : 14,
      itemHeight: isMobile ? 8 : 14,
      itemGap: isMobile ? 8 : 18,
      textStyle: { fontSize: isMobile ? 10 : 14 },
    },

    xAxis: {
      type: "category",
      data: months.map((m) => MONTH_LABELS[m - 1]),
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
    series: series.map((s) => ({
      name: s.name,
      type: "bar",
      stack: "species",
      data: s.data,
      itemStyle: {
        color: SPECIES_COLORS[s.species] || "#999",
        borderRadius: 3,
        borderColor: "white",
        borderWidth: 1,
      },
    })),
  };

  return (
    <div className="w-full h-[300px] sm:h-[380px] lg:h-[450px] xl:h-[500px] mb-6">
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}
