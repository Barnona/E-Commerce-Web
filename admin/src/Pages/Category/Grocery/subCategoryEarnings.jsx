import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 35, label: "Fruits & Veg", color: '#16a34a' },  // Green
            { id: 1, value: 25, label: "Dairy Products", color: '#facc15' },// Yellow
            { id: 2, value: 25, label: "Snacks", color: '#ea580c' },        // Orange
            { id: 3, value: 15, label: "Beverages", color: '#2563eb' },     // Blue
          ],
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={300}
      height={300}
    />
  );
}

const SubCategoryEarnings = () => {
  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md bg-white shadow-sm h-full'>
      <b className='text-[22px] text-blue-900'>Earnings Share</b>
      <div className='mt-5 flex justify-center items-center'>
        <BasicPie />
      </div>
    </div>
  );
};

export default SubCategoryEarnings;