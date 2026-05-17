"use client";
import ReactECharts from "echarts-for-react";
import {
  SPECIES_COLORS,
  SPECIES_LABELS,
} from "../../../lib/aggregatedSightings";
import { useIsMobile } from "../../../helpers/useIsMobile";
type Props = {
  ranking: {
    species: string;
    count: number;
  }[];
};

export default function SpeciesRankingChart({ ranking }: Props) {
  const isMobile = useIsMobile();
  const option = {
    title: {
      top: 0,
      text: "Total Sightings by Specie",
      subtext:
        "Total number of sightings per species, ranked from highest to lowest",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 15,
      },
    },

    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
    },

    grid: {
      left: 10,
      right: 15,
      top: 50,
      bottom: 0,
      containLabel: true,
    },

    xAxis: {
      type: "value",
      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },

    yAxis: {
      type: "category",
      data: ranking.map((r) => SPECIES_LABELS[r.species]),

      axisLabel: {
        fontSize: isMobile ? 10 : 14,
        fontWeight: 500,
      },
    },

    series: [
      {
        name: "Sightings",
        type: "bar",
        
        barWidth: isMobile ? "55%" : "65%",
        data: ranking.map((r) => ({
          value: r.count,

          label: {
            show: true,
            position: "right",
            fontSize: isMobile ? 10 : 12,
            color: "#333",
          },
          itemStyle: {
            color: SPECIES_COLORS[r.species] || "#999",
            borderRadius: [0, 6, 6, 0],
          },
        })),
      },
    ],
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[450px] xl:h-[500px] mb-6">
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}
