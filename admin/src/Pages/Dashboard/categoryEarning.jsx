import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { getDashboardData } from '../../service/api';

const CategoryEarning = () =>{
    const [data, setData] = useState([
                { id: 0, value: 20, label: 'Electronics', color: '#ff7171ff' },
                { id: 1, value: 20, label: 'Fashion', color: '#8cff7dff' },
                { id: 2, value: 14, label: 'Home Appliances', color: '#6fb9ffff' },
                { id: 3, value: 7, label: 'Furniture', color: '#936cd1ff' },
                { id: 4, value: 8, label: 'Grocery', color: '#f572d4ff' },
                { id: 5, value: 8, label: 'Sports', color: '#ffe75fff' },
                { id: 6, value: 15, label: 'Beauty & Health', color: '#46f3ffff' },
                { id: 7, value: 8, label: 'Books & Toys', color: '#ffa53eff' },
            ]);

    useEffect(() => {
        const fetchCategoryEarning = async () => {
        const data = await getDashboardData();
        if (data) {
            if (data.CategoryEarning && data.CategoryEarning.length > 0) setData(data.CategoryEarning); 
        }
    };
    fetchCategoryEarning();
    }, []);

    return(
        <div className='box p-5 cursor-pointer border border-blue-900 rounded-md'>
            <b className='text-[22px]'>Earnings by Category</b>
            <div className='mt-10 flex justify-center'>
                {data.length > 0 ? (
                    <PieChart
                        series={[{ data: data }]}
                        width={300}
                        height={300}
                    />
                ) : <p>Loading...</p>}
            </div>
        </div>
    )
}

export default CategoryEarning;