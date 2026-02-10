import React, { useState, useEffect } from "react";
import '../../style.css';
import BedroomFilter from "./BedroomFilter";
import BedroomProducts from "./BedroomProducts";
import { getProductsByCategory } from "../../../../service/api"; // Ensure correct path
import { CircularProgress } from "@mui/material";

const Bedroom = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        furnitureType: [],
        brand: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory("Bedroom");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Bedroom products from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Bedroom</section>
            
            <section className="Furniture-section">
                <div className="Furniture-bars flex flex-col md:flex-row gap-4 p-4 h-full">
                    
                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-64 flex-shrink-0">
                        <BedroomFilter filters={filters} setFilters={setFilters} subCategory="Bedroom"/>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 w-full">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <BedroomProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
}

export default Bedroom;