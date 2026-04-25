import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";

export default function PieChart({ data }: any) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const option = {
    title: {
      text: "Passenger Distribution",
      left: "center",
      textStyle: {
        fontSize: isMobile ? 12 : 16,
      },
    },

    tooltip: {
      trigger: "item",
    },

    series: [
      {
        type: "pie",

        radius: isMobile ? ["38%", "62%"] : ["40%", "70%"],
        center: ["50%", isMobile ? "52%" : "55%"],

        data: data.map((d: any) => ({
          name: d.tour,
          value: d.total,
        })),

        label: {
          show: true,
          fontSize: isMobile ? 11 : 13,

          formatter: (params: any) => {
            return isMobile
              ? `${params.name}\n${params.percent}%`
              : `${params.name}: ${params.value}`;
          },
        },

        labelLine: {
          show: true,
          length: isMobile ? 8 : 12,
          length2: isMobile ? 6 : 10,
        },

        emphasis: {
          scale: true,
        },
      },
    ],
  };

  return (
    <div className="w-full h-[260px] sm:h-[320px] md:h-[360px]">
      <ReactEcharts option={option} style={{ width: "100%", height: "100%" }} />
    </div>
  );
}
