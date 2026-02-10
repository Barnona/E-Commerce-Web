import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Living', value: 450, color: '#5d4037' },
    { label: 'Bedroom', value: 350, color: '#8d6e63' },
    { label: 'Others', value: 200, color: '#bcaaa4' },
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
    { label: 'L-Shape Sofa', value: 250, color: '#3e2723' },
    { label: 'Recliners', value: 200, color: '#4e342e' },
    
    { label: 'King Beds', value: 200, color: '#6d4c41' },
    { label: 'Wardrobes', value: 150, color: '#795548' },
    
    { label: 'Office Chairs', value: 100, color: '#a1887f' },
    { label: 'Dining Sets', value: 100, color: '#d7ccc8' },
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