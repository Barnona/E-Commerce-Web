import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Books', value: 500, color: '#4338ca' },      // Indigo-700
    { label: 'Toys', value: 300, color: '#db2777' },       // Pink-600
    { label: 'Stationery', value: 200, color: '#d97706' }, // Amber-600
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

  // Outer Circle: Specific Sub-types
  const [topProduct, setTopProduct] = useState([
    // Books Split
    { label: 'Fiction', value: 250, color: '#6366f1' },    // Indigo-500
    { label: 'Educational', value: 250, color: '#818cf8' }, // Indigo-400
    
    // Toys Split
    { label: 'Puzzles', value: 150, color: '#ec4899' },    // Pink-500
    { label: 'Action Figs', value: 150, color: '#f472b6' },// Pink-400
    
    // Stationery Split
    { label: 'Notebooks', value: 100, color: '#f59e0b' },  // Amber-500
    { label: 'Pens/Art', value: 100, color: '#fbbf24' },   // Amber-400
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
    <div className='box p-5 cursor-pointer border border-indigo-900 rounded-md bg-white shadow-sm h-full'>
      <b className='text-[22px] text-indigo-900'>Top Categories</b>
      <div className='mt-5 flex justify-center'>
        <PieCSSStyling />
      </div>
    </div>
  );
};

export default TopProducts;