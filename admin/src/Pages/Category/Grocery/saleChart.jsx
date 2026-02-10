import React, { useState } from "react";
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

function getData() {
  return [
    { month: "Jan", FruitsVeg: 180, Snacks: 120, Beverages: 80, Dairy: 150 },
    { month: "Feb", FruitsVeg: 170, Snacks: 115, Beverages: 85, Dairy: 145 },
    { month: "Mar", FruitsVeg: 190, Snacks: 125, Beverages: 110, Dairy: 155 }, // Summer onset (Beverages up)
    { month: "Apr", FruitsVeg: 200, Snacks: 130, Beverages: 150, Dairy: 160 },
    { month: "May", FruitsVeg: 210, Snacks: 135, Beverages: 180, Dairy: 165 }, // Peak Summer
    { month: "Jun", FruitsVeg: 200, Snacks: 130, Beverages: 170, Dairy: 160 },
    { month: "Jul", FruitsVeg: 190, Snacks: 125, Beverages: 140, Dairy: 155 },
    { month: "Aug", FruitsVeg: 185, Snacks: 140, Beverages: 120, Dairy: 160 },
    { month: "Sep", FruitsVeg: 190, Snacks: 145, Beverages: 110, Dairy: 165 },
    { month: "Oct", FruitsVeg: 220, Snacks: 190, Beverages: 130, Dairy: 190 }, // Festivals (Snacks/Dairy)
    { month: "Nov", FruitsVeg: 210, Snacks: 180, Beverages: 100, Dairy: 180 },
    { month: "Dec", FruitsVeg: 200, Snacks: 170, Beverages: 90, Dairy: 175 },
  ];
}

const ChartExample = () => {
  const [options] = useState({
    data: getData(),
    series: [
      { type: "bar", xKey: "month", yKey: "FruitsVeg", yName: "Fruits & Veg", stacked: true, fill: "#4ade80" }, // Green
      { type: "bar", xKey: "month", yKey: "Dairy", yName: "Dairy", stacked: true, fill: "#fef08a" },           // Cream/Yellow
      { type: "bar", xKey: "month", yKey: "Snacks", yName: "Snacks", stacked: true, fill: "#fb923c" },          // Orange
      { type: "bar", xKey: "month", yKey: "Beverages", yName: "Beverages", stacked: true, fill: "#60a5fa" },    // Blue
    ],
    axes: [
      { type: "category", position: "bottom" },
      { type: "number", position: "left" },
    ],
  });

  return <AgCharts options={options} />;
};

const SaleChart = () => {
  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md bg-white shadow-sm'>
      <b className='text-[22px] text-blue-900'>Grocery Sales Volume (Annual)</b>
      <div className='mt-5 h-[400px] w-full'>
        <ChartExample />
      </div>
    </div>
  );
};

export default SaleChart;