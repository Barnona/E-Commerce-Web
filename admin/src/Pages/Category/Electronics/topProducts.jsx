import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Mobiles', value: 500, color: '#3b82f6' },
    { label: 'Laptops', value: 300, color: '#6366f1' },
    { label: 'Audio', value: 200, color: '#ec4899' },
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

  // Outer Circle: Specific Models
  const [topProduct, setTopProduct] = useState([
    { label: 'iPhone 15', value: 250, color: '#2563eb' },
    { label: 'Samsung S24', value: 250, color: '#1d4ed8' },
    
    { label: 'MacBook Air', value: 150, color: '#4f46e5' },
    { label: 'Dell XPS', value: 150, color: '#4338ca' },
    
    { label: 'AirPods Pro', value: 100, color: '#db2777' },
    { label: 'Sony WH-1000XM5', value: 100, color: '#be185d' },
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
      <b className='text-[22px] text-blue-900'>Top Selling Models</b>
      <div className='mt-5 flex justify-center'>
        <PieCSSStyling />
      </div>
    </div>
  );
};

export default TopProducts;