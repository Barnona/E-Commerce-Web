import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { 
    FaDumbbell, 
    FaRunning, 
    FaTrophy, 
    FaMedal 
} from 'react-icons/fa';

const Boxes = () => {
    const [stats, setStats] = useState([
        { 
            label: 'Total Equipment', 
            val: '1,850 Units', 
            icon: <FaDumbbell />, 
            color: 'text-red-600', 
            bg: 'bg-red-100',
            trend: 'Heavy logistics'
        },
        { 
            label: 'Seasonal Peaks', 
            val: 'Cricket Kits', 
            icon: <FaTrophy />, 
            color: 'text-green-600', 
            bg: 'bg-green-100',
            trend: 'High demand now'
        },
        { 
            label: 'Pro Gear Sold', 
            val: '340 Items', 
            icon: <FaMedal />, 
            color: 'text-yellow-600', 
            bg: 'bg-yellow-100',
            trend: 'Premium segment'
        }
    ]);

    useEffect(() => {
            const fetchStats = async () => {
                // Fetch specifically for category
                const data = await getCategoryData("Electronics");
                if (data) {
                    if (data.stats && data.stats.length > 0) setStats(data.stats);
                }
            };
            fetchStats();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-3 h-full">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between h-full">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-800 mt-1">{stat.val}</h3>
                        </div>
                        <div className={`p-3 rounded-full ${stat.bg} ${stat.color} text-xl`}>
                            {stat.icon}
                        </div>
                    </div>
                    <p className="text-xs font-medium text-gray-500">
                        {stat.trend}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default Boxes;