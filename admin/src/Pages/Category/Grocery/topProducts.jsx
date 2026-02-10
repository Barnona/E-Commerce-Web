import React from 'react';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

function PieCSSStyling() {
  // Inner Circle: Categories
  const data1 = [
    { label: 'Fresh', value: 400, color: '#15803d' },
    { label: 'Pantry', value: 300, color: '#c2410c' },
    { label: 'Liquids', value: 200, color: '#1d4ed8' },
  ];

  // Outer Circle: Specific Products
  const data2 = [
    { label: 'Onions & Potatoes', value: 200, color: '#22c55e' },
    { label: 'Seasonal Fruits', value: 200, color: '#4ade80' },
    
    { label: 'Chips/Biscuits', value: 150, color: '#f97316' },
    { label: 'Milk/Curd', value: 150, color: '#fdba74' },
    
    { label: 'Soft Drinks', value: 100, color: '#3b82f6' },
    { label: 'Juices', value: 100, color: '#60a5fa' },
  ];

  const settings = {
    series: [
      {
        innerRadius: 0,
        outerRadius: 100,
        data: data1,
      },
      {
        innerRadius: 120,
        outerRadius: 150,
        data: data2,
      },
    ],
    height: 300,
    slotProps: {
        legend: { hidden: true },
    },
  };

  return (
    <PieChart
      {...settings}
      sx={{
        [`.${pieClasses.series} .${pieArcClasses.root}`]: {
          stroke: '#fff',
          strokeWidth: 2,
        },
      }}
    />
  );
}

const TopProducts = () => {
  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md bg-white shadow-sm h-full'>
      <b className='text-[22px] text-blue-900'>Daily Essentials</b>
      <div className='mt-5 flex justify-center'>
        <PieCSSStyling />
      </div>
    </div>
  );
};

export default TopProducts;