"use client";
import ReactECharts from "echarts-for-react";
import {
  SPECIES_COLORS,
  SPECIES_LABELS,
} from "../../../lib/aggregatedSightings";

type Props = {
  ranking: {
    species: string;
    count: number;
  }[];
};

export default function SpeciesRankingChart({ ranking }: Props) {
  const option = {
    title: {
      text: "Total sightings by species",
      left: "center",
    },

    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },

    grid: {
      left: 10,
      right: 15,
      top: 30,
      bottom: 85,
      containLabel: true,
    },

    xAxis: {
      type: "value",
      axisLabel: {
        fontSize: 14,
        fontWeight: 500,
      },
    },

    yAxis: {
      type: "category",
      data: ranking.map((r) => SPECIES_LABELS[r.species]),
      axisLabel: {
        fontSize: 14,
        fontWeight: 500,
      },
    },

    series: [
      {
        name: "Sightings",
        type: "bar",
        data: ranking.map((r) => ({
          value: r.count,
          itemStyle: {
            color: SPECIES_COLORS[r.species] || "#999",
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[450px] xl:h-[500px] mb-6">
      {" "}
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}
