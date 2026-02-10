import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Large', value: 400, color: '#1d4ed8' },
    { label: 'Kitchen', value: 300, color: '#0ea5e9' },
    { label: 'Comfort', value: 200, color: '#2dd4bf' },
  ]);

  useEffect(() => {
        const fetchStats = async () => {
                    // Fetch specifically for category
          const data = await getCategoryData("Books and Toys");
            if (data) {
              if (data.topSubCategory && data.topSubCategory.length > 0) setTopSubCategory(data.topSubCategory);
            }
          };
          fetchStats();
  }, []);

  // Outer Circle: Specific Products
  const [topProduct, setTopProduct] = useState([
    { label: 'Refrigerators', value: 200, color: '#1e3a8a' },
    { label: 'Washing Machine', value: 200, color: '#2563eb' },
    
    { label: 'Mixer Grinder', value: 150, color: '#0284c7' },
    { label: 'Microwaves', value: 150, color: '#38bdf8' },
    
    { label: 'Split ACs', value: 100, color: '#0f766e' },
    { label: 'Air Purifiers', value: 100, color: '#14b8a6' },
  ]);

  useEffect(() => {
          const fetchStats = async () => {
                    // Fetch specifically for category
            const data = await getCategoryData("Beauty and Health");
              if (data) {
                if (data.topProduct && data.topProduct.length > 0) setTopProduct(data.topProduct);
              }
            };
            fetchStats();
  }, []);

  const settings = {
    series: [
      {
        innerRadius: 0,
        outerRadius: 100,
        data: topSubCategory,
      },
      {
        innerRadius: 120,
        outerRadius: 150,
        data: topProduct,
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

  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md bg-white shadow-sm h-full'>
      <b className='text-[22px] text-blue-900'>Best Sellers</b>
      <div className='mt-5 flex justify-center'>
        <PieCSSStyling />
      </div>
    </div>
  );
};

export default TopProducts;