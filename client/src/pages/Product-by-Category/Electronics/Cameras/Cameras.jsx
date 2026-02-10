import React, { useState, useEffect } from "react";
import CamerasFilter from "./CamerasFilter";
import CameraProducts from "./CameraProducts";
import { getProductsByCategory } from "../../../../service/api"; 
import { CircularProgress } from "@mui/material";
import '../../style.css';

const Cameras = () => {
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        brand: [],
        videoResolution: [],
        shutterSpeed: [],
        effectivePixels: [],   
        connectivity: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Cameras' subcategory
                const data = await getProductsByCategory('Cameras');
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load cameras from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Cameras</section>

            <section className="Electronics-section">
                <div className="Electronics-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <CamerasFilter filters={filters} setFilters={setFilters} subCategory= "Cameras" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <CameraProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    );
};

export default Cameras;