import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { PieChart } from '@mui/x-charts/PieChart';

const SubCategoryEarnings = () => {

const [subEarnings, setSubEarnings] = useState([
  { id: 0, value: 45, label: "Books", color: '#6366f1' },       // Indigo
  { id: 1, value: 30, label: "Toys & Games", color: '#ec4899' }, // Pink
  { id: 2, value: 25, label: "Stationery", color: '#f59e0b' },   // Amber
]);

useEffect(() => {
    const fetchSubEarnings = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Books and Toys");
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
    <div className='box p-5 cursor-pointer border border-indigo-900 rounded-md bg-white shadow-sm h-full'>
      <b className='text-[22px] text-indigo-900'>Earnings Share</b>
      <div className='mt-5 flex justify-center items-center'>
        <BasicPie />
      </div>
    </div>
  );
};

export default SubCategoryEarnings;