import React, { useState, useEffect } from "react";
import WomenFootwearFilter from "./WomenFootwearFilter";
import WomenFootwearProducts from "./WomenFootwearProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import "../../style.css";

const WomenFootwear = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        type: [],
        occasion:[],
        material: [],
        brand: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Women's Footwear' subcategory
                const data = await getProductsByCategory("Women's Footwear");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Women's Footwear from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">
                Women's Footwear
            </section>

            <section className="Fashion-section">
                <div className="Fashion-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <WomenFootwearFilter filters={filters} setFilters={setFilters} subCategory = "Women's Footwear" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <WomenFootwearProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default WomenFootwear;