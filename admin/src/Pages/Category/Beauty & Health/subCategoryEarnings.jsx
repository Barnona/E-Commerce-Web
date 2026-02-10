import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { PieChart } from '@mui/x-charts/PieChart';

const SubCategoryEarnings = () => {

const [subEarnings, setSubEarnings] = useState([
  { id: 0, value: 35, label: 'Makeup', color: '#ec4899' }, // Pink
  { id: 1, value: 25, label: 'Skin Care', color: '#fca5a5' }, // Light Pink
  { id: 2, value: 20, label: 'Hair Care', color: '#fbbf24' }, // Amber
  { id: 3, value: 20, label: 'Supplements', color: '#34d399' }, // Emerald
]);

useEffect(() => {
    const fetchSubEarnings = async () => {
        // Fetch specifically for category
        const data = await getCategoryData("Beauty and Health");
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
      <b className='text-[22px] text-blue-900'>Earnings by Subcategory</b>
      <div className='mt-5 flex justify-center items-center'>
        <BasicPie />
      </div>
    </div>
  );
};

export default SubCategoryEarnings;