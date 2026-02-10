import React, { useState, useEffect } from 'react';
import { AgCharts } from "ag-charts-react";
import { AllCommunityModule, ModuleRegistry } from "ag-charts-community";
import { getDashboardData } from '../../service/api';
import { data } from 'autoprefixer';

ModuleRegistry.registerModules([AllCommunityModule]);

const SalesChart = () => {
  const [chartOptions, setChartOptions] = useState({
    data: [
                { month: "Jan", sales: 6582 },
                { month: "Feb", sales: 7952 },
                { month: "Mar", sales: 5412 },
                { month: "Apr", sales: 4213 },
                { month: "May", sales: 3216 },
                { month: "Jun", sales: 5698 },
                { month: "Jul", sales: 2120 },
                { month: "Aug", sales: 1745 },
                { month: "Sep", sales: 8596 },
                { month: "Oct", sales: 9873 },
                { month: "Nov", sales: 6420 },
                { month: "Dec", sales: 6237 },
          ],
    series: [{ type: "bar", xKey: "month", yKey: "sales", fill: "#f0da5cff" }],
  });

  useEffect(() => {
    const fetchSaleChart = async () => {
          const data = await getDashboardData();
            if (data) {
              if (data.saleChart && data.saleChart.length > 0) setChartOptions(data.saleChart); 
            }
          };
    fetchSaleChart();
  }, []);

  return(
    <div className='box p-5 cursor-pointer border border-blue-900 rounded-md'>
        <b className='text-[22px]'>Sales Report (Last Year)</b>
        <div className='mt-10'>
            {chartOptions ? <AgCharts options={chartOptions} /> : <p>Loading Chart...</p>}
        </div>
    </div>
  )
}

export default SalesChart;