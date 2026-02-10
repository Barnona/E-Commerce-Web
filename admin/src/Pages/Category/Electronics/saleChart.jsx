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
    { month: "Jan", Mobiles: 140, Laptops: 80, Cameras: 20, Tablets: 40, Audio: 60 },
    { month: "Feb", Mobiles: 124, Laptops: 75, Cameras: 22, Tablets: 45, Audio: 65 },
    { month: "Mar", Mobiles: 112, Laptops: 90, Cameras: 25, Tablets: 50, Audio: 70 },
    { month: "Apr", Mobiles: 118, Laptops: 85, Cameras: 18, Tablets: 42, Audio: 68 },
    { month: "May", Mobiles: 128, Laptops: 88, Cameras: 20, Tablets: 44, Audio: 72 },
    { month: "Jun", Mobiles: 138, Laptops: 95, Cameras: 28, Tablets: 48, Audio: 75 },
    { month: "Jul", Mobiles: 148, Laptops: 100, Cameras: 30, Tablets: 55, Audio: 80 },
    { month: "Aug", Mobiles: 118, Laptops: 92, Cameras: 24, Tablets: 46, Audio: 74 },
    { month: "Sep", Mobiles: 150, Laptops: 110, Cameras: 26, Tablets: 60, Audio: 85 }, // Sales spike (New launches)
    { month: "Oct", Mobiles: 180, Laptops: 120, Cameras: 35, Tablets: 70, Audio: 100 }, // Festive season
    { month: "Nov", Mobiles: 170, Laptops: 115, Cameras: 32, Tablets: 65, Audio: 95 },
    { month: "Dec", Mobiles: 190, Laptops: 130, Cameras: 40, Tablets: 80, Audio: 110 },
]);

useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Electronics");
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
      { type: "bar", xKey: "month", yKey: "Mobiles", yName: "Mobiles", stacked: true },
      { type: "bar", xKey: "month", yKey: "Laptops", yName: "Laptops", stacked: true },
      { type: "bar", xKey: "month", yKey: "Tablets", yName: "Tablets", stacked: true },
      { type: "bar", xKey: "month", yKey: "Cameras", yName: "Cameras", stacked: true },
      { type: "bar", xKey: "month", yKey: "Audio", yName: "Audio Devices", stacked: true },
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
      <b className='text-[22px] text-blue-900'>Revenue by Category (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;