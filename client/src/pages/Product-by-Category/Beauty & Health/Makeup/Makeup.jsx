import React, { useState, useEffect } from "react";
import MakeupFilter from "./MakeupFilter";
import MakeupProducts from "./MakeupProducts";
import { getProductsByCategory } from "../../../../service/api"; 
import { CircularProgress } from "@mui/material";
import '../../style.css';

const Makeup = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        brand: [],
        makeupType: [],
        price: null,
        sort: "none"
    });

    // Fetch Data from API on Mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory('Makeup');
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Makeup products from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Makeup</section>

            <section className="BeautyHealth-section">
                <div className="BeautyHealth-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <MakeupFilter filters={filters} setFilters={setFilters} subCategory="Makeup" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <MakeupProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default Makeup;