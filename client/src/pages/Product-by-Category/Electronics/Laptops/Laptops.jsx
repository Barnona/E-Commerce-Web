import React, { useState, useEffect } from "react";
import LaptopsFilter from "./LaptopsFilter";
import LaptopProducts from "./LaptopProducts";
import { getProductsByCategory } from "../../../../service/api"; 
import { CircularProgress } from "@mui/material";
import '../../style.css';

const Laptops = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        ram: [],
        ramType: [],
        ssd: [],
        hdd: [],
        brand: [],
        processor: [],
        processorBrand: [],
        processorGen: [],
        graphicsMemory: [],
        gpuSeries: [],
        displayType: [],
        displaySize: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API on Mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory('Laptops');
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load laptops from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Laptops</section>

            <section className="Electronics-section">
                <div className="Electronics-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <LaptopsFilter filters={filters} setFilters={setFilters} subCategory= "Laptops" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <LaptopProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default Laptops;