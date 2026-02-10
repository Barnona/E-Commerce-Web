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
    { month: "Jan", Makeup: 140, SkinCare: 116, HairCare: 94, Supplements: 72 },
    { month: "Feb", Makeup: 124, SkinCare: 120, HairCare: 94, Supplements: 82 },
    { month: "Mar", Makeup: 112, SkinCare: 130, HairCare: 118, Supplements: 94 },
    { month: "Apr", Makeup: 118, SkinCare: 124, HairCare: 114, Supplements: 94 },
    { month: "May", Makeup: 128, SkinCare: 124, HairCare: 114, Supplements: 94 },
    { month: "Jun", Makeup: 138, SkinCare: 124, HairCare: 114, Supplements: 94 },
    { month: "Jul", Makeup: 148, SkinCare: 124, HairCare: 114, Supplements: 94 },
    { month: "Aug", Makeup: 118, SkinCare: 124, HairCare: 114, Supplements: 94 },
    { month: "Sep", Makeup: 118, SkinCare: 124, HairCare: 114, Supplements: 94 },
    { month: "Oct", Makeup: 158, SkinCare: 144, HairCare: 124, Supplements: 114 },
    { month: "Nov", Makeup: 168, SkinCare: 154, HairCare: 134, Supplements: 124 },
    { month: "Dec", Makeup: 188, SkinCare: 164, HairCare: 144, Supplements: 134 },
]);

useEffect(() => {
    const fetchSaleChart = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Beauty and Health");
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
      { type: "bar", xKey: "month", yKey: "Makeup", yName: "Makeup", stacked: true },
      { type: "bar", xKey: "month", yKey: "SkinCare", yName: "Skin Care", stacked: true },
      { type: "bar", xKey: "month", yKey: "HairCare", yName: "Hair Care", stacked: true },
      { type: "bar", xKey: "month", yKey: "Supplements", yName: "Health Supplements", stacked: true },
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
      <b className='text-[22px] text-blue-900'>Revenue by Subcategory (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;