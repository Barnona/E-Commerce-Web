import React, { useState, useEffect } from "react";
import KitchenAppliancesFilter from "./KitchenAppliancesFilter";
import KitchenApplianceProducts from "./KitchenApplianceProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import '../../style.css';

const KitchenAppliances = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        brand: [],
        applianceType: [],
        power: [],
        capacity: [], 
        price: null,
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Kitchen Appliances' subcategory
                const data = await getProductsByCategory("Kitchen Appliances");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Kitchen Appliances from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Kitchen Appliances</section>
            
            <section className="Electronics-section">
                <div className="Electronics-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <KitchenAppliancesFilter filters={filters} setFilters={setFilters} subCategory="Kitchen Appliances" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <KitchenApplianceProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default KitchenAppliances;