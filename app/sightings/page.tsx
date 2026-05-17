import ChartWrapper from "../components/charts/ChartWrapper";
import CancellationRateChart from "../components/charts/sightings/CancellationRateLineChart";
import HourDistributionChart from "../components/charts/sightings/HourDistributionBarChart";
import WhaleChart from "../components/charts/sightings/StackedBarChart";
import SpeciesRankingChart from "../components/charts/sightings/TotalSpeciesBarChart";
import WhaleKpiBoxes from "../components/charts/sightings/WhaleSightingsKpi";
import { aggregateSightings } from "../lib/aggregatedSightings";
import { loadSightings } from "../lib/loadSightings";
import Heatmap from "../components/charts/sightings/Heatmap";
import SpeciesPieChart from "../components/charts/sightings/PieChart";
import { GiWhaleTail } from "react-icons/gi";

export default async function Page() {
  const data = await loadSightings();
  const chartData = aggregateSightings(data);

  return (
    <div className="px-4 py-8 sm:px-6 sm:py-16 space-y-8 sm:space-y-10">
      <div className="absolute inset-0 -z-10 bg-[url('/watermarks/Whale.png')] bg-no-repeat bg-center bg-[length:700px] opacity-10" />
      <div className="space-y-3 p-4">
        <h1 className="text-2xl font-bold flex items-center gap-2 leading-tight">
          <GiWhaleTail className="text-secondary text-2xl opacity-90" />
          Whale Watching Classic 2025
        </h1>

        <p className="text-sm text-gray-500 max-w-2xl">
          Overview of whale sighting trends, species distribution, and
          operational performance across the 2025 season
        </p>
      </div>
      <ChartWrapper>
        <WhaleKpiBoxes
          totalSightings={chartData.totalSightings}
          totalCancelled={chartData.totalCancelled}
          totalPrivate={chartData.totalPrivate}
          breachingEvents={chartData.breachingEvents}
          endurkoma={chartData.endurkoma}
        />
        <div className="mt-6 flex flex-col xl:flex-row gap-6">
          <div className="flex-1 min-h-[320px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <WhaleChart months={chartData.months} series={chartData.series} />
          </div>

          <div className="flex-1 min-h-[320px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <CancellationRateChart
              cancellationRate={chartData.cancellationRate}
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col xl:flex-row gap-6">
          <div className="flex-1 min-h-[320px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <SpeciesRankingChart ranking={chartData.ranking} />
          </div>

          <div className="flex-1 min-h-[320px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <HourDistributionChart data={chartData.hourDistribution} />
          </div>
        </div>
        <div className="mt-6 flex flex-col xl:flex-row gap-6">
          <div className="flex-1 min-h-[320px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <SpeciesPieChart data={chartData.pieData} />
          </div>
          <div className="flex-1 min-h-[320px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <Heatmap
              heatmapData={chartData.heatmapData}
              months={chartData.months}
              hours={chartData.hours}
            />
          </div>
        </div>
      </ChartWrapper>
    </div>
  );
}
