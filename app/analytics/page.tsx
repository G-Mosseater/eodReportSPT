"use client";
import ChartWrapper from "../components/charts/ChartWrapper";
import DashboardFilters from "../components/charts/DashboardFilters";
import KpiBox from "../components/charts/KpiBox";
import HourlyLineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import useAnalytics from "../helpers/useAnalytics";

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
    loading,
    totalCanceledTours,
    totalPassengers,
    totalGroup,
    totalFree,
    totalAdults,
    totalYouth,
  } = useAnalytics();
  return (
    <div className="p-6  space-y-4">
      <h1 className="text-2xl font-bold">Analytics Dashboard</h1>

      <DashboardFilters
        month={month}
        year={year}
        tour={selectedTour}
        setMonth={setMonth}
        setYear={setYear}
        setTour={setSelectedTour}
      />

      <ChartWrapper loading={loading}>
        <KpiBox
          totalCanceledTours={totalCanceledTours}
          totalPassengers={totalPassengers}
          totalGroup={totalGroup}
          totalFree={totalFree}
          totalAdults={totalAdults}
          totalYouth={totalYouth}
        />
        <div className="flex flex-col xl:flex-row gap-4 mt-8">
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-[800px]">
              <HourlyLineChart data={hourly} />
            </div>
          </div>

          <div className="flex-1 min-w-[260px]">
            <PieChart data={byTour} />
          </div>
        </div>  
      </ChartWrapper>
    </div>
  );
}
