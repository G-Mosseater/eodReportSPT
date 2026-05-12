import WhaleChart from "../components/charts/sightings/StackedBarChart";
import SpeciesRankingChart from "../components/charts/sightings/TotalSpeciesBarChart";
import WhaleKpiBoxes from "../components/charts/sightings/WhaleSightingsKpi";
import { aggregateSightings } from "../lib/aggregatedSightings";
import { loadSightings } from "../lib/loadSightings";

export default async function Page() {
  const data = await loadSightings();
  const chartData = aggregateSightings(data);

  return (
    <div className="p-6 flex flex-col gap-10">
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Whale Watching Classic 2025
        </h1>
        <p className="text-sm text-gray-500">
          Sightings, species distribution and operational insights
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-10">
        <section className="space-y-3">
          <WhaleKpiBoxes
            totalSightings={chartData.totalSightings}
            totalCancelled={chartData.totalCancelled}
            totalPrivate={chartData.totalPrivate}
            breachingEvents={chartData.breachingEvents}
          />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Species Ranking</h2>

          <SpeciesRankingChart ranking={chartData.ranking} />
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Sightings Over Time</h2>

          <div className="w-full h-[500px]">
            <WhaleChart months={chartData.months} series={chartData.series} />
          </div>
        </section>
      </div>
    </div>
  );
}
