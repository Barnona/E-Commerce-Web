import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { PieChart } from '@mui/x-charts/PieChart';

const SubCategoryEarnings = () => {

const [subEarnings, setSubEarnings] = useState([
  { id: 0, value: 20, label: "Men's Top", color: '#1e3a8a' },      // Dark Blue
  { id: 1, value: 15, label: "Men's Bottom", color: '#3b82f6' },   // Blue
  { id: 2, value: 25, label: "Women's Top", color: '#db2777' },    // Pink
  { id: 3, value: 15, label: "Women's Bottom", color: '#f472b6' }, // Light Pink
  { id: 4, value: 10, label: "Kids", color: '#f59e0b' },           // Orange
  { id: 5, value: 5, label: "Men's Footwear", color: '#4b5563' },  // Gray
  { id: 6, value: 5, label: "Women's Footwear", color: '#9ca3af' },// Light Gray
  { id: 7, value: 5, label: "Bags", color: '#8b5cf6' },            // Purple
]);

useEffect(() => {
    const fetchSubEarnings = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Fashion");
        if (data) {
            if (data.subEarnings && data.subEarnings.length > 0) setSubEarnings(data.subEarnings);
        }
    };
    fetchSubEarnings();
}, []);

function BasicPie() {
  return (
    <PieChart
      series={[
        {
          data: subEarnings,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      width={300}
      height={300}
    />
  );
}

  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md bg-white shadow-sm h-full'>
      <b className='text-[22px] text-blue-900'>Earnings by Category</b>
      <div className='mt-5 flex justify-center items-center'>
        <BasicPie />
      </div>
    </div>
  );
};

export default SubCategoryEarnings;