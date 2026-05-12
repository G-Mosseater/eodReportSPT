"use client";

import ReactECharts from "echarts-for-react";
import { SPECIES_COLORS } from "../../../lib/aggregatedSightings";

type Props = {
  months: number[];
  series: {
    name: string;
    data: number[];
    species: string;
  }[];
};

// export const COLORS = [
//   "#2F6F9F", // M - Minke (strong blue)
//   "#0B2D4D", // M! - Breaching Minke (deep navy)

//   "#F28E2B", // H - Humpback (orange)
//   "#C85A00", // H! - Breaching Humpback (dark orange)

//   "#1B9E77", // WBD - Dolphin (green-teal)
//   "#66C2A5", // P - Porpoise (lighter teal but distinct)

//   "#D95F02", // O - Orca (strong red-orange)
//   "#7570B3", // F - Fin Whale (purple)
//   "#8C510A", // S - Sei Whale (brown)
//   "#E6AB02", // G - Pilot Whale (gold)

//   "#666666", // BS - Shark (neutral dark gray)
//   "#2C7FB8", // L - Seals (cool teal)
//   "#F781BF", // C - Common Dolphin (pink highlight)
// ];
const MONTH_LABELS = [
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
  const option = {
    title: {
      text: "Total sightings distribution over time",
      left: "center",
      top: 5,
      textStyle: {
        fontSize: 18,
      },
    },
    color: SPECIES_COLORS,
    grid: {
      left: 10,
      right: 10,
      top: 30,
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
      bottom: 0,
      left: "center",

      itemWidth: 18,
      itemHeight: 12,
      itemGap: 20,

      textStyle: {
        fontSize: 14,
        fontWeight: 500,
      },
    },

    xAxis: {
      type: "category",
      data: months.map((m) => MONTH_LABELS[m - 1]),
      axisLabel: {
        fontSize: 14,
        fontWeight: 500,
      },
    },

    yAxis: {
      type: "value",
      axisLabel: {
        fontSize: 14,
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
      },
    })),
  };

  return (
    <div style={{ height: 600, marginBottom: 40 }}>
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}
