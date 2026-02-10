import React, { useState, useEffect } from 'react'
import { LuSquareUser } from "react-icons/lu";
import { MdOutlineTrendingUp, MdOutlineTrendingDown } from "react-icons/md";
import { getDashboardData } from '../../service/api';

const Visit = () => {
  const [data, setData] = useState({ total: 6152, weekly: 1503, change: 8 });

  useEffect(() => {
    const fetchVisit = async () => {
          const data = await getDashboardData();
            if (data) {
              if (data.visit && data.visit.length > 0) setData(data.visit); 
            }
            };
    fetchVisit();
  }, []);

  if (!data) return <div className='box p-5 border border-blue-900 rounded-md'>Loading...</div>;

  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md'>
        <b className='text-[18px] flex items-center gap-2 text-amber-700'>
            <LuSquareUser className='text-[30px]'/>Monthly Visitors
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

export default Visit;