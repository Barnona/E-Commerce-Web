import React, { useState, useEffect } from "react";
import '../../style.css';
import OfficeFurnitureFilter from "./OfficeFurnitureFilter";
import OfficeFurnitureProducts from "./OfficeFurnitureProducts";
import { getProductsByCategory } from "../../../../service/api"; // Ensure correct path
import { CircularProgress } from "@mui/material";

const OfficeFurniture = () => {
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
                const data = await getProductsByCategory("Office Furniture");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load OfficeFurniture products from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Office Furniture</section>
            
            <section className="Furniture-section">
                <div className="Furniture-bars flex flex-col md:flex-row gap-4 p-4 h-full">
                    
                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-64 flex-shrink-0">
                        <OfficeFurnitureFilter filters={filters} setFilters={setFilters} subCategory="Office Furniture"/>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1 w-full">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <OfficeFurnitureProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
}

export default OfficeFurniture;