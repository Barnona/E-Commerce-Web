import React, { useState, useEffect } from 'react'
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { getDashboardData } from '../../service/api';

const NewOrder = () => {
  const [data, setData] = useState({ total: 4038, weekly: 973, change: -2 });

  useEffect(() => {
    const fetchNewOrder = async () => {
        const data = await getDashboardData();
        if (data) {
            if (data.newOrder && data.newOrder.length > 0) setData(data.newOrder); 
        }
    };
    fetchNewOrder();
  }, []);

  if (!data) return <div className='box p-5 border border-blue-900 rounded-md'>Loading...</div>;

  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md'>
        <b className='text-[18px] flex items-center gap-2 text-purple-700'>
            <LuShoppingCart className='text-[30px]'/>Monthly New Orders
        </b>
        <div className='mt-4'><b className='text-[36px]'>{data.total}</b></div>
        <div className='flex items-center justify-between mt-5'>
            <div className='flex self-end items-center text-[15px]'>
                <b>+{data.weekly} this Week</b>
            </div>
            <div className='flex self-end items-center gap-1 text-[15px]'>
                {data.change < 0 ? <MdOutlineTrendingDown/> : <MdOutlineTrendingUp/>}
                <b>{data.change < 0 ? '-' : '+'}{Math.abs(data.change)}% from Last Week</b>
            </div>
        </div>
    </div>
  )
}

export default NewOrder;