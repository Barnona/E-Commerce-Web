import React, { useState, useEffect } from 'react';
import { AiOutlineGift, AiOutlineProduct } from "react-icons/ai";
import { HiOutlineChartPie } from "react-icons/hi2";
import { LuUsers, LuChartNoAxesCombined } from "react-icons/lu";
import { BsBank } from "react-icons/bs";
import { enUS } from '@mui/x-charts/locales';
import { FaSpinner } from 'react-icons/fa';

import { getDashboardData } from '../../service/api';

const DashboardBox = () => {
  const [data, setData] = useState({
        totalOrders: 86665,
        totalUsers: 52489,
        totalProducts: 8542,
        totalSales: 86526,
        totalRevenue: 515636023
    });

  useEffect(() => {
    const fetchStates = async () => {
            const data = await getDashboardData();
            if (data) {
                if (data.states && data.states.length > 0) setData(data.states); 
            }
        };
        fetchStates();
  }, []);

  if (!data) return <div className="w-full flex justify-center p-5"><FaSpinner className="animate-spin text-blue-500" /></div>;

  return (
    <div className='w-full flex items-center gap-3 justify-between'>
      <div className='box p-5 cursor-pointer hover:bg-blue-100 border border-blue-500 rounded-md gap-7 flex items-center h-[100px] w-[20%]'>
          <AiOutlineGift className='text-[40px] text-blue-500'/>
          <div className='info w-[50%] text-blue-800'>
              <h3 className='text-[18px]'>Orders</h3>
              <b>{data.totalOrders.toLocaleString(enUS)}</b>
          </div>
          <LuChartNoAxesCombined className='text-[40px] text-blue-500 ml-7'/>
      </div>
      <div className='box p-5 cursor-pointer hover:bg-red-100 border border-red-500 rounded-md gap-7 flex items-center h-[100px] w-[20%]'>
          <LuUsers className='text-[40px] text-red-500'/>
          <div className='info w-[50%] text-red-800'>
              <h3 className='text-[18px]'>Users</h3>
              <b>{data.totalUsers.toLocaleString(enUS)}</b>
          </div>
          <LuChartNoAxesCombined className='text-[40px] text-red-500 ml-7'/>
      </div>
      <div className='box p-5 cursor-pointer hover:bg-purple-100 border border-purple-500 rounded-md gap-7 flex items-center h-[100px] w-[20%]'>
          <AiOutlineProduct className='text-[40px] text-purple-500'/>
          <div className='info w-[50%] text-purple-800'>
              <h3 className='text-[18px]'>Products</h3>
              <b>{data.totalProducts.toLocaleString(enUS)}</b>
          </div>
          <LuChartNoAxesCombined className='text-[40px] text-purple-500 ml-7'/>
      </div>
      <div className='box p-5 cursor-pointer hover:bg-amber-100 border border-amber-500 rounded-md gap-7 flex items-center h-[100px] w-[20%]'>
          <HiOutlineChartPie className='text-[40px] text-amber-500'/>
          <div className='info w-[50%] text-amber-800'>
              <h3 className='text-[18px]'>Sales</h3>
              <b>{data.totalSales.toLocaleString(enUS)}</b>
          </div>
          <LuChartNoAxesCombined className='text-[40px] text-amber-500 ml-7'/>
      </div>
      <div className='box p-5 cursor-pointer hover:bg-emerald-100 border border-emerald-500 rounded-md gap-7 flex items-center h-[100px] w-[20%]'>
          <BsBank className='text-[40px] text-emerald-500'/>
          <div className='info w-[50%] text-emerald-800'>
              <h3 className='text-[18px]'>Revenue</h3>
              <b>₹ {data.totalRevenue.toLocaleString(enUS)}</b>
          </div>
          <LuChartNoAxesCombined className='text-[40px] text-emerald-500 ml-7'/>
      </div>
    </div>
  );
}

export default DashboardBox;