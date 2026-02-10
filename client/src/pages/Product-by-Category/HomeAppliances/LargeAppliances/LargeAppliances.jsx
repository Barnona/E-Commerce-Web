import React, { useState, useEffect } from "react";
import LargeAppliancesFilter from "./LargeAppliancesFilter";
import LargeApplianceProducts from "./LargeApplianceProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import '../../style.css';

const LargeAppliances = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        brand: [],
        applianceType: [],
        capacity: [], 
        price: null,
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Large Appliances' subcategory
                const data = await getProductsByCategory("Large Appliances");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Large Appliances from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Large Appliances</section>
            
            <section className="Electronics-section">
                <div className="Electronics-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <LargeAppliancesFilter filters={filters} setFilters={setFilters} subCategory="Large Appliances" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <LargeApplianceProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default LargeAppliances;