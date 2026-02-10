import React, { useState, useEffect } from "react";
import BagsLuggagesFilter from "./BagsLuggagesFilter";
import BagsLuggagesProducts from "./BagsLuggagesProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import "../../style.css";

const BagsLuggages = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        type: [],
        material: [],
        capacity: [],
        brand: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Bags and Luggages' subcategory
                // Note: Ensure string matches exactly what's in your DB
                const data = await getProductsByCategory("Bags and Luggages");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Bags & Luggages from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">
                Bags & Luggages
            </section>

            <section className="Fashion-section">
                <div className="Fashion-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <BagsLuggagesFilter filters={filters} setFilters={setFilters} subCategory= "Bags and Luggages"/>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <BagsLuggagesProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default BagsLuggages;