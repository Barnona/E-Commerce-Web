import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { pieArcClasses, PieChart, pieClasses } from '@mui/x-charts/PieChart';

const TopProducts = () => {
function PieCSSStyling() {
  // Inner Circle: Categories
  const [topSubCategory, setTopSubCategory] = useState([
    { label: 'Men', value: 350, color: '#1e40af' },
    { label: 'Women', value: 450, color: '#be185d' },
    { label: 'Kids', value: 100, color: '#d97706' },
    { label: 'Accessories', value: 100, color: '#7c3aed' },
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
    { label: 'Shirts', value: 200, color: '#3b82f6' },
    { label: 'Jeans (M)', value: 150, color: '#60a5fa' },
    
    { label: 'Dresses', value: 250, color: '#ec4899' },
    { label: 'Tops', value: 200, color: '#f472b6' },
    
    { label: 'Kids Tees', value: 100, color: '#fbbf24' },
    { label: 'Handbags', value: 100, color: '#a78bfa' },
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