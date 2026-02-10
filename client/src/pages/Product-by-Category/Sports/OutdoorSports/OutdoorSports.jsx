import React, { useState, useEffect } from "react";
import '../../style.css'
import OutdoorSportsFilter from "./OutdoorSportsFilter";
import OutdoorSportProducts from "./OutdoorSportProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";

const OutdoorSports = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        sport: [],
        brand: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Outdoor Sports' subcategory
                // Note: Ensure string matches exactly what's in your DB
                const data = await getProductsByCategory("Outdoor Sports");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Outdoor Sports from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Outdoor Sports</section>
            
            <section className="Sports-section">
                <div className="Sports-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <OutdoorSportsFilter filters={filters} setFilters={setFilters} subCategory= "Outdoor Sports" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <OutdoorSportProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default OutdoorSports;