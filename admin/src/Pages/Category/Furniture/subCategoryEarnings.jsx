import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { PieChart } from '@mui/x-charts/PieChart';

const SubCategoryEarnings = () => {

const [subEarnings, setSubEarnings] = useState([
  { id: 0, value: 40, label: "Living Room", color: '#795548' },   // Brown
  { id: 1, value: 30, label: "Bedroom", color: '#a1887f' },       // Light Brown
  { id: 2, value: 20, label: "Office", color: '#4e342e' },        // Dark Walnut
  { id: 3, value: 10, label: "Dining", color: '#d7ccc8' },        // Beige
]);

useEffect(() => {
    const fetchSubEarnings = async () => {

        const data = await getCategoryData("Furniture");
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