import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Fitness', value: 450, color: '#b91c1c' },
    { label: 'Outdoor', value: 350, color: '#15803d' },
    { label: 'Indoor', value: 200, color: '#b45309' },
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
    { label: 'Treadmills', value: 250, color: '#ef4444' },
    { label: 'Dumbbells', value: 200, color: '#f87171' },
    
    { label: 'Cricket Bats', value: 200, color: '#22c55e' },
    { label: 'Footballs', value: 150, color: '#4ade80' },
    
    { label: 'Carrom Boards', value: 100, color: '#f59e0b' },
    { label: 'Chess Sets', value: 100, color: '#fbbf24' },
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
      <b className='text-[22px] text-blue-900'>Best Selling Gear</b>
      <div className='mt-5 flex justify-center'>
        <PieCSSStyling />
      </div>
    </div>
  );
};

export default TopProducts;