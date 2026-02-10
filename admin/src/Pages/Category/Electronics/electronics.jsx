import React from 'react';
import SubCategoryEarnings from './subCategoryEarnings';
import TopProducts from './topProducts';
import SaleChart from './saleChart';
import Boxes from './boxes';
import ProductTable from './productTable';

const Electronics = () => {
  return (
    <div className="p-5 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-blue-900 mb-6">Electronics Overview</h1>
        
        {/* Top Row: Earnings, Top Products, Stats Boxes */}
        <div className='flex flex-col lg:flex-row gap-5 h-max'>
          <div className='w-full lg:w-[35%] h-full'>
            <SubCategoryEarnings />
          </div>
          <div className='w-full lg:w-[30%] h-full'>
            <TopProducts />
          </div>
          <div className='w-full lg:w-[35%] h-full'>
            <Boxes />
          </div>
        </div>

        {/* Middle Row: Annual Sales Chart */}
        <div className='w-full mt-5'>
          <SaleChart />
        </div>
    </div>
  );
};

export default Electronics;