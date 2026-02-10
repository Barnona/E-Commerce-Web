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
    { month: "Jan", Books: 200, Toys: 100, Stationery: 150 }, // New Year (Books/Diaries)
    { month: "Feb", Books: 180, Toys: 90, Stationery: 140 },
    { month: "Mar", Books: 190, Toys: 80, Stationery: 160 },
    { month: "Apr", Books: 170, Toys: 110, Stationery: 180 }, // Exam season end
    { month: "May", Books: 210, Toys: 150, Stationery: 130 }, // Summer reading
    { month: "Jun", Books: 180, Toys: 120, Stationery: 250 }, // Back to School (Stationery Peak)
    { month: "Jul", Books: 190, Toys: 110, Stationery: 220 },
    { month: "Aug", Books: 180, Toys: 100, Stationery: 190 },
    { month: "Sep", Books: 200, Toys: 110, Stationery: 180 },
    { month: "Oct", Books: 220, Toys: 160, Stationery: 170 },
    { month: "Nov", Books: 230, Toys: 180, Stationery: 160 },
    { month: "Dec", Books: 250, Toys: 280, Stationery: 150 }, // Holidays (Toys Peak)
]);

useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Books and Toys");
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
      { type: "bar", xKey: "month", yKey: "Books", yName: "Books", stacked: true, fill: "#6366f1" },      // Indigo
      { type: "bar", xKey: "month", yKey: "Toys", yName: "Toys & Games", stacked: true, fill: "#ec4899" }, // Pink
      { type: "bar", xKey: "month", yKey: "Stationery", yName: "Stationery", stacked: true, fill: "#f59e0b" }, // Amber
    ],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left" },
    ],
  });

  return <AgCharts options={options} />;
};


  return (
    <div className='box p-5 cursor-pointer border border-indigo-900 rounded-md bg-white shadow-sm'>
      <b className='text-[22px] text-indigo-900'>Category Sales Volume (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;