import WhaleChart from "../components/charts/sightings/StackedBarChart";
import SpeciesRankingChart from "../components/charts/sightings/TotalSpeciesBarChart";
import WhaleKpiBoxes from "../components/charts/sightings/WhaleSightingsKpi";
import { aggregateSightings } from "../lib/aggregatedSightings";
import { loadSightings } from "../lib/loadSightings";

export default async function Page() {
  const data = await loadSightings();
  const chartData = aggregateSightings(data);

  return (
    <div className="p-6 flex flex-col gap-10 min-h-screen overflow-x-hidden">
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Whale Watching Classic 2025
        </h1>
        <p className="text-sm text-gray-500">
          Sightings, species distribution and operational insights
        </p>
      </div>

      <div className="w-full flex flex-col gap-10">
        <div className="w-full">
          <WhaleKpiBoxes
            totalSightings={chartData.totalSightings}
            totalCancelled={chartData.totalCancelled}
            totalPrivate={chartData.totalPrivate}
            breachingEvents={chartData.breachingEvents}
            endurkoma={chartData.endurkoma}
          />
        </div>

        <div className="w-full flex flex-col xl:flex-row gap-6">
          <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm transition min-h-[320px]">
            <WhaleChart months={chartData.months} series={chartData.series} />
          </div>

          <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm transition min-h-[320px]">
            <SpeciesRankingChart ranking={chartData.ranking} />
          </div>
        </div>
      </div>
    </div>
  );
}
