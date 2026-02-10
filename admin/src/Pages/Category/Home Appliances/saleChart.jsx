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
    { month: "Jan", Large: 120, Kitchen: 140, Small: 90, Comfort: 40 }, // Winter (Heaters)
    { month: "Feb", Large: 110, Kitchen: 130, Small: 95, Comfort: 45 },
    { month: "Mar", Large: 130, Kitchen: 145, Small: 100, Comfort: 80 }, // Summer onset
    { month: "Apr", Large: 140, Kitchen: 150, Small: 105, Comfort: 150 }, // Peak AC Sales
    { month: "May", Large: 150, Kitchen: 155, Small: 110, Comfort: 180 },
    { month: "Jun", Large: 145, Kitchen: 150, Small: 100, Comfort: 160 },
    { month: "Jul", Large: 135, Kitchen: 140, Small: 95, Comfort: 120 },
    { month: "Aug", Large: 160, Kitchen: 160, Small: 115, Comfort: 90 },
    { month: "Sep", Large: 180, Kitchen: 170, Small: 120, Comfort: 80 },
    { month: "Oct", Large: 220, Kitchen: 200, Small: 140, Comfort: 70 }, // Diwali Peak
    { month: "Nov", Large: 200, Kitchen: 190, Small: 130, Comfort: 60 },
    { month: "Dec", Large: 180, Kitchen: 180, Small: 120, Comfort: 50 },
]);

useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Home Appliances");
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
      { type: "bar", xKey: "month", yKey: "Large", yName: "Large Appliances", stacked: true, fill: "#1e3a8a" },   // Dark Blue
      { type: "bar", xKey: "month", yKey: "Kitchen", yName: "Kitchen Appliances", stacked: true, fill: "#3b82f6" }, // Blue
      { type: "bar", xKey: "month", yKey: "Small", yName: "Small Appliances", stacked: true, fill: "#93c5fd" },     // Light Blue
      { type: "bar", xKey: "month", yKey: "Comfort", yName: "Home Comforts", stacked: true, fill: "#06b6d4" },      // Cyan
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
      <b className='text-[22px] text-blue-900'>Appliance Sales Trends (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;