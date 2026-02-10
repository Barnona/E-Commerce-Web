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
    { month: "Jan", MenTop: 120, WomenTop: 150, Kids: 80, Footwear: 90, Bags: 40 },
    { month: "Feb", MenTop: 110, WomenTop: 140, Kids: 75, Footwear: 85, Bags: 45 },
    { month: "Mar", MenTop: 130, WomenTop: 160, Kids: 90, Footwear: 95, Bags: 50 },
    { month: "Apr", MenTop: 140, WomenTop: 180, Kids: 85, Footwear: 100, Bags: 55 }, // Summer collection start
    { month: "May", MenTop: 150, WomenTop: 190, Kids: 90, Footwear: 110, Bags: 60 },
    { month: "Jun", MenTop: 145, WomenTop: 185, Kids: 88, Footwear: 105, Bags: 58 },
    { month: "Jul", MenTop: 135, WomenTop: 170, Kids: 85, Footwear: 100, Bags: 50 },
    { month: "Aug", MenTop: 160, WomenTop: 200, Kids: 110, Footwear: 120, Bags: 70 }, // Sale Season
    { month: "Sep", MenTop: 155, WomenTop: 195, Kids: 100, Footwear: 115, Bags: 65 },
    { month: "Oct", MenTop: 190, WomenTop: 240, Kids: 130, Footwear: 140, Bags: 90 }, // Festive
    { month: "Nov", MenTop: 180, WomenTop: 230, Kids: 125, Footwear: 135, Bags: 85 },
    { month: "Dec", MenTop: 200, WomenTop: 250, Kids: 140, Footwear: 150, Bags: 95 }, // Winter/Holiday
]);
useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Fashion");
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
      { type: "bar", xKey: "month", yKey: "MenTop", yName: "Men's Wear", stacked: true },
      { type: "bar", xKey: "month", yKey: "WomenTop", yName: "Women's Wear", stacked: true },
      { type: "bar", xKey: "month", yKey: "Kids", yName: "Kids", stacked: true },
      { type: "bar", xKey: "month", yKey: "Footwear", yName: "Footwear (M&W)", stacked: true },
      { type: "bar", xKey: "month", yKey: "Bags", yName: "Bags & Luggage", stacked: true },
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
      <b className='text-[22px] text-blue-900'>Fashion Sales Trends (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;