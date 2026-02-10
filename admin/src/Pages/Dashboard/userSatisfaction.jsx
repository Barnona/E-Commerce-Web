import React, { useState, useEffect } from 'react'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { getDashboardData } from '../../service/api';

const UserSatisfaction = () => {
  const [data, setData] = useState({ value: 77, change: 2 });

  useEffect(() => {
    const fetchUserSatisfaction = async () => {
      const data = await getDashboardData();
        if (data) {
          if (data.userSatisfaction && data.userSatisfaction.length > 0) setData(data.userSatisfaction); 
        }
        };
    fetchUserSatisfaction();
  }, []);

  if (!data) return <div className='box p-5 border border-blue-900 rounded-md'>Loading...</div>;

  return (
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md'>
      <b className='text-[22px]'>Customer Satisfaction</b>
      <div className='mt-4 flex justify-center'>
        <Gauge
            width={270}
            height={270}
            value={data.value}
            cornerRadius="50%"
            sx={{
                [`& .MuiGauge-valueText`]: { fontSize: 40 },
                [`& .${gaugeClasses.valueArc}`]: { fill: '#076083ff' },
                [`& .${gaugeClasses.referenceArc}`]: { fill: '#62cff0ff' },
            }}
            text={({value}) => `${value}%`}
        />
      </div>
      <b className='flex justify-center mt-2'>
        {data.change < 0 ? '-' : '+'}{Math.abs(data.change)}% from Last Month
      </b>
    </div>
  )
}

export default UserSatisfaction;