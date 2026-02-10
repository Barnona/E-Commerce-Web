import React, {useState, useEffect} from 'react';
import { getCategoryData } from '../../../service/api';
import { 
    FaPlug, 
    FaTools, 
    FaShieldAlt,
} from 'react-icons/fa';

const Boxes = () => {
    const [stats, setStats] = useState([
        { 
            label: 'Total Units', 
            val: '3,420', 
            icon: <FaPlug />, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100',
            trend: 'Steady demand'
        },
        { 
            label: 'Installation Requests', 
            val: '85 Pending', 
            icon: <FaTools />, 
            color: 'text-orange-600', 
            bg: 'bg-orange-100',
            trend: 'Technicians alerted'
        },
        { 
            label: 'Warranty Claims', 
            val: '1.2%', 
            icon: <FaShieldAlt />, 
            color: 'text-red-600', 
            bg: 'bg-red-100',
            trend: 'Below industry avg'
        },
    ]);

    useEffect(() => {
            const fetchStats = async () => {
                // Fetch specifically for category
                const data = await getCategoryData("Home Appliances");
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