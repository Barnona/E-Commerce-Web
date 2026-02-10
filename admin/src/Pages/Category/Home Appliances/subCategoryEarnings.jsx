import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { PieChart } from '@mui/x-charts/PieChart';

const SubCategoryEarnings = () => {

const [subEarnings, setSubEarnings] = useState([
            { id: 0, value: 45, label: "Large Appliances", color: '#1e40af' }, // Royal Blue
            { id: 1, value: 25, label: "Kitchen Appliances", color: '#0ea5e9' }, // Sky Blue
            { id: 2, value: 20, label: "Home Comforts", color: '#14b8a6' }, // Teal
            { id: 3, value: 10, label: "Small Appliances", color: '#94a3b8' }, // Slate
]);

useEffect(() => {
    const fetchSubEarnings = async () => {

        const data = await getCategoryData("Home Appliances");
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