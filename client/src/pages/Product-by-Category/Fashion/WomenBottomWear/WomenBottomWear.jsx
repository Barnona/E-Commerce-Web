import React, { useState, useEffect } from "react";
import WomenBottomWearFilter from "./WomenBottomWearFilter";
import WomenBottomWearProducts from "./WomenBottomWearProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import "../../style.css";

const WomenBottomWear = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        dressType: [],
        occasion:[],
        fabric: [],
        brand: [],
        fit: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Women's Bottom-Wear' subcategory
                // Note: Ensure string matches exactly what's in your DB
                const data = await getProductsByCategory("Women's Bottom-Wear");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Women's Bottom Wear from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">
                Women's Bottom-Wear
            </section>

            <section className="Fashion-section">
                <div className="Fashion-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <WomenBottomWearFilter filters={filters} setFilters={setFilters} subCategory="Women's Bottom-Wear" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <WomenBottomWearProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default WomenBottomWear;