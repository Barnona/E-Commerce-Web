import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';
import { useTheme } from '@mui/material/styles';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Makeup', value: 400, color: '#ec4899' },
    { label: 'Skin Care', value: 300, color: '#fca5a5' },
    { label: 'Health', value: 300, color: '#34d399' },
  ]);

  useEffect(() => {
      const fetchStats = async () => {
          // Fetch specifically for category
          const data = await getCategoryData("Beauty and Health");
          if (data) {
              if (data.topSubCategory && data.topSubCategory.length > 0) setTopSubCategory(data.topSubCategory);
          }
      };
      fetchStats();
  }, []);

  // Outer Circle: Specific Products
  const [topProduct, setTopProduct] = useState([
    { label: 'Lipstick', value: 200, color: '#be185d' },
    { label: 'Foundation', value: 200, color: '#db2777' },
    
    { label: 'Moisturizer', value: 150, color: '#f87171' },
    { label: 'Sunscreen', value: 150, color: '#fca5a5' },
    
    { label: 'Vitamins', value: 150, color: '#059669' },
    { label: 'Proteins', value: 150, color: '#10b981' },
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
      <b className='text-[22px] text-blue-900'>Top Selling Distribution</b>
      <div className='mt-5 flex justify-center'>
        <PieCSSStyling />
      </div>
    </div>
  );
};

export default TopProducts;