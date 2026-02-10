import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { getDashboardData } from '../../service/api';

const TopProduct = () =>{
    const [data, setData] = useState([
                { id: 0, value: 10, label: 'Product 1' },
                { id: 1, value: 15, label: 'Product 2' },
                { id: 2, value: 20, label: 'Product 3' },
                { id: 3, value: 10, label: 'Product 4' },
                { id: 4, value: 15, label: 'Product 5' },
          ],);

    useEffect(() => {
        const fetchTopProduct = async () => {
                  const data = await getDashboardData();
                    if (data) {
                      if (data.topProduct && data.topProduct.length > 0) setData(data.topProduct); 
                    }
                    };
        fetchTopProduct();
    }, []);

    return(
        <div className='box p-5 cursor-pointer border border-blue-900 rounded-md'>
          <b className='text-[22px]'>Top 5 Products</b>
          <div className='mt-10 flex justify-center'>
            {data.length > 0 ? (
                <PieChart
                  series={[{ data: data }]}
                  width={270}
                  height={270}
                />
            ) : <p>Loading...</p>}
          </div>
        </div>
    )
}

export default TopProduct;