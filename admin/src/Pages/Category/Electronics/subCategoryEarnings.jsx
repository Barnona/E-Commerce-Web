import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { PieChart } from '@mui/x-charts/PieChart';

const SubCategoryEarnings = () => {

const [subEarnings, setSubEarnings] = useState([
            { id: 0, value: 40, label: 'Mobiles', color: '#3b82f6' }, // Blue
            { id: 1, value: 25, label: 'Laptops', color: '#6366f1' }, // Indigo
            { id: 2, value: 15, label: 'Audio', color: '#ec4899' },   // Pink
            { id: 3, value: 10, label: 'Tablets', color: '#06b6d4' }, // Cyan
            { id: 4, value: 10, label: 'Cameras', color: '#8b5cf6' }, // Violet
]);

useEffect(() => {
    const fetchSubEarnings = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Electronics");
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
      <b className='text-[22px] text-blue-900'>Earnings Share</b>
      <div className='mt-5 flex justify-center items-center'>
        <BasicPie />
      </div>
    </div>
  );
};

export default SubCategoryEarnings;