import React, { useState, useEffect } from "react";
import MenFootwearFilter from "./MenFootwearFilter";
import MenFootwearProducts from "./MenFootwearProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import "../../style.css";

const MenFootwear = () => {
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
                // Fetch specifically for 'Men's Footwear' subcategory
                const data = await getProductsByCategory("Men's Footwear");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Men's Footwear from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">
                Men's Footwear
            </section>

            <section className="Fashion-section">
                <div className="Fashion-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <MenFootwearFilter filters={filters} setFilters={setFilters} subCategory="Men's Footwear"/>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <MenFootwearProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default MenFootwear;