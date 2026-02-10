import React, { useState, useEffect } from "react";
import '../../style.css'
import HairCareProducts from "./HairCareProducts";
import HairCareFilter from "./HairCareFilter";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";

const HairCare = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        brand: [],
        productType: [],
        price: null,
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory("Hair Care");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Hair Care products from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Hair Care</section>
            
            <section className="BeautyHealth-section">
                <div className="BeautyHealth-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <HairCareFilter filters={filters} setFilters={setFilters} subCategory="Hair Care"/>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <HairCareProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default HairCare;