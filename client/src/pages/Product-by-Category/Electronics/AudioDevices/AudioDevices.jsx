import React, { useState, useEffect } from "react";
import '../../style.css'
import AudioDevicesFilter from "./AudioDevicesFilter";
import AudioDeviceProducts from "./AudioDeviceProducts";
import { getProductsByCategory } from "../../../../service/api"; // Updated API path
import { CircularProgress } from "@mui/material";

const AudioDevices = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        type: [],
        connectivity: [], 
        brand: [],
        noiseCancellation: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Audio Devices' subcategory
                const data = await getProductsByCategory('Audio Devices');
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Audio Devices from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Audio Devices</section>

            <section className="Electronics-section">
                <div className="Electronics-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <AudioDevicesFilter filters={filters} setFilters={setFilters} subCategory= "Audio Devices"/>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <AudioDeviceProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default AudioDevices;