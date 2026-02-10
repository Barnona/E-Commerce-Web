import React, { useRef, useState } from 'react';
import DashboardBox from './DashboardBox';
import SalesChart from './saleChart'
import CategoryEarning from './categoryEarning';
import TopProduct from './topProduct';
import Target from './target';
import Visit from './visit';
import NewOrder from './newOrder';
import UserSatisfaction from './userSatisfaction.jsx';

import './Dashboard.css';
const Dashboard =() => {
  return (
    <div>
      <div className='UpperInfo w-[100%] mt-5 gap-5 flex items-center justify-between'>
        <div className='w-[65%]'><SalesChart/></div>
        <div className='w-[35%]'>
          <CategoryEarning/>
        </div>
      </div>
      <div className='mt-5 w-[100%]'><DashboardBox/></div>
      <div className='mt-5 gap-5 flex items-center'>
        <div className='w-[32%]'><TopProduct/></div>
        <div className='w-[22.5%]'><Target/></div>
        <div className='w-[22%] relative'>
          <div><Visit/></div>
          <div className='mt-4'><NewOrder/></div>
        </div>
        <div className='w-[22.5%]'>
          <UserSatisfaction/>
        </div>
      </div>
    </div>
  )
}
export default Dashboard