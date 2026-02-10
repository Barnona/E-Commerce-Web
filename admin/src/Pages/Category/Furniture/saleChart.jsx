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
    { month: "Jan", Living: 150, Bedroom: 120, Office: 80, Dining: 60 },
    { month: "Feb", Living: 140, Bedroom: 110, Office: 85, Dining: 65 },
    { month: "Mar", Living: 160, Bedroom: 130, Office: 90, Dining: 70 },
    { month: "Apr", Living: 155, Bedroom: 125, Office: 100, Dining: 75 }, // Fiscal year start (Office buy)
    { month: "May", Living: 165, Bedroom: 135, Office: 95, Dining: 80 },
    { month: "Jun", Living: 170, Bedroom: 140, Office: 90, Dining: 85 },
    { month: "Jul", Living: 160, Bedroom: 130, Office: 85, Dining: 80 },
    { month: "Aug", Living: 180, Bedroom: 150, Office: 95, Dining: 90 },
    { month: "Sep", Living: 190, Bedroom: 160, Office: 100, Dining: 95 },
    { month: "Oct", Living: 220, Bedroom: 190, Office: 110, Dining: 120 }, // Festive Season
    { month: "Nov", Living: 210, Bedroom: 180, Office: 105, Dining: 115 },
    { month: "Dec", Living: 230, Bedroom: 200, Office: 100, Dining: 130 }, // Year end
]);

useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Furniture");
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
      { type: "bar", xKey: "month", yKey: "Living", yName: "Living Room", stacked: true, fill: "#8d6e63" }, // Brown
      { type: "bar", xKey: "month", yKey: "Bedroom", yName: "Bedroom", stacked: true, fill: "#bdbdbd" },    // Grey
      { type: "bar", xKey: "month", yKey: "Office", yName: "Office", stacked: true, fill: "#5d4037" },      // Dark Brown
      { type: "bar", xKey: "month", yKey: "Dining", yName: "Dining Room", stacked: true, fill: "#ffcc80" }, // Light Wood
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
      <b className='text-[22px] text-blue-900'>Furniture Sales Trends (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;