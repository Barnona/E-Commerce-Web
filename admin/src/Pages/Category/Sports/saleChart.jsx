import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { AgCharts } from "ag-charts-react";
import {
  BarSeriesModule,
  CategoryAxisModule,
  LegendModule,
  ModuleRegistry,
  NumberAxisModule,
} from "ag-charts-community";

ModuleRegistry.registerModules([
  BarSeriesModule,
  CategoryAxisModule,
  LegendModule,
  NumberAxisModule,
]);

const SaleChart = () => {
const [saleChart, setSaleChart] = useState([
    { month: "Jan", Fitness: 200, Outdoor: 50, Indoor: 40 },  // New Year Resolutions (Gym gear peak)
    { month: "Feb", Fitness: 180, Outdoor: 60, Indoor: 45 },
    { month: "Mar", Fitness: 150, Outdoor: 100, Indoor: 50 }, // Weather warms up
    { month: "Apr", Fitness: 140, Outdoor: 150, Indoor: 55 }, // Cricket/Football season
    { month: "May", Fitness: 130, Outdoor: 160, Indoor: 60 },
    { month: "Jun", Fitness: 120, Outdoor: 140, Indoor: 100 }, // Monsoon starts (Indoor games up)
    { month: "Jul", Fitness: 120, Outdoor: 80, Indoor: 140 },  // Peak Monsoon
    { month: "Aug", Fitness: 130, Outdoor: 90, Indoor: 130 },
    { month: "Sep", Fitness: 140, Outdoor: 110, Indoor: 100 },
    { month: "Oct", Fitness: 150, Outdoor: 160, Indoor: 80 }, // Post-monsoon outdoor
    { month: "Nov", Fitness: 160, Outdoor: 170, Indoor: 70 },
    { month: "Dec", Fitness: 180, Outdoor: 150, Indoor: 60 }, // Winter sports/Holiday gifting
]);

useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Sports");
        if (data) {
            if (data.saleChart && data.saleChart.length > 0) setSaleChart(data.saleChart);
        }
    };
    fetchSaleChart();
}, []);

const ChartExample = () => {
  const [options] = useState({
    data: saleChart,
    series: [
      { type: "bar", xKey: "month", yKey: "Fitness", yName: "Fitness Equipment", stacked: true, fill: "#ef4444" }, // Red (Energy)
      { type: "bar", xKey: "month", yKey: "Outdoor", yName: "Outdoor Sports", stacked: true, fill: "#22c55e" },   // Green (Field)
      { type: "bar", xKey: "month", yKey: "Indoor", yName: "Indoor Games", stacked: true, fill: "#f59e0b" },      // Orange (Fun)
    ],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left" },
    ],
  });

  return <AgCharts options={options} />;
};

  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md bg-white shadow-sm'>
      <b className='text-[22px] text-blue-900'>Sports Category Sales (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;