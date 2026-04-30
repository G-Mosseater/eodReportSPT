"use client";
import ChartWrapper from "../components/charts/ChartWrapper";
import DashboardFilters from "../components/charts/DashboardFilters";
import KpiBox from "../components/charts/KpiBox";
import HourlyLineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import useAnalytics from "../helpers/useAnalytics";
import BoatChart from "../components/charts/BoatUseBarChart";
import BoatUtilChart from "../components/charts/BoatUtilisationBarChart";
import TripsPerBoat from "../components/charts/TripsPerBoatBarChart";

export default function DashboardPage() {
  const {
    hourly,
    byTour,
    month,
    year,
    selectedTour,
    setMonth,
    setYear,
    setSelectedTour,
    setRange,
    range,
    loading,
    totalCanceledTours,
    totalPassengers,
    totalGroup,
    totalFree,
    totalAdults,
    totalYouth,
    byBoat,
    boatUtilisation,
    // payment
  } = useAnalytics();
  return (
    <div className="px-6 py-16 space-y-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Analytics Dashboard</h1>

      <DashboardFilters
        month={month}
        year={year}
        tour={selectedTour}
        setMonth={setMonth}
        setYear={setYear}
        setTour={setSelectedTour}
        setRange={setRange}
        range={range}
      />

      <ChartWrapper loading={loading}>
        <KpiBox
          totalCanceledTours={totalCanceledTours}
          totalPassengers={totalPassengers}
          totalGroup={totalGroup}
          totalFree={totalFree}
          totalAdults={totalAdults}
          totalYouth={totalYouth}
          // payment={payment}
        />
        <div className="flex flex-col xl:flex-row gap-6 mt-6 ">
          <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <div className="w-full h-full ">
              <HourlyLineChart data={hourly} loading={loading} />
            </div>
          </div>

          <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <BoatChart data={byBoat} />
          </div>
        </div>
        <div className="flex flex-col xl:flex-row gap-6  mt-6 ">
          <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <PieChart data={byTour} />
          </div>

          <div className="flex-1 bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-sm hover:shadow-primary transition">
            <BoatUtilChart data={boatUtilisation} />
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="w-full max-w-[1300px] bg-white/70 backdrop-blur border border-blue-100 rounded-lg p-4 shadow-sm hover:shadow-primary transition">
            <TripsPerBoat data={boatUtilisation} />
          </div>
        </div>
      </ChartWrapper>
    </div>
  );
}
