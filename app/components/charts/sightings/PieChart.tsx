"use client";
import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  SPECIES_COLORS,
  SPECIES_LABELS,
} from "../../../lib/aggregatedSightings";

type Props = {
  data: { name: string; value: number }[];
};

export default function SpeciesPieChart({ data }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const option = {
    title: {
      top: 0,
      text: "Species Distribution",
      subtext: "Share of all sightings recorded during 2025",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 16,
      },
    },

    tooltip: {
      trigger: "item",
    },

    legend: {
      bottom: 0,
      textStyle: {
        fontSize: isMobile ? 10 : 12,
      },
      itemWidth: isMobile ? 10 : 14,
      itemHeight: isMobile ? 10 : 14,
    },

    series: [
      {
        type: "pie",
        startAngle: 120,
        minAngle: 5,

        radius: isMobile ? ["20%", "35%"] : ["30%", "55%"],

        center: ["50%", isMobile ? "40%" : "45%"],
        data: data.map((item) => {
          const key = item.name;

          return {
            name: SPECIES_LABELS[key] ?? key,
            value: item.value,

            itemStyle: {
              color: SPECIES_COLORS[key] || "#999999",
            },
          };
        }),
        label: {
          show: true,

          fontSize: isMobile ? 10 : 14,

          formatter: (params: any) => {
            const percent = params.percent?.toFixed(1);

            return isMobile
              ? `${params.name}\n${percent}%`
              : `${params.name}: ${percent}%`;
          },
        },

        labelLine: {
          show: true,
          length: isMobile ? 14 : 35,
          length2: isMobile ? 12 : 70,
        },

        emphasis: {
          scale: true,
        },
      },
    ],
  };

  return (
    <div className="w-full h-[320px] sm:h-[380px] lg:h-[450px] xl:h-[500px]">
      <ReactECharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
