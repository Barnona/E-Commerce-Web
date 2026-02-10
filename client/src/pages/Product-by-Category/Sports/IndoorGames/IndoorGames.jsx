import React, { useState, useEffect } from "react";
import '../../style.css'
import IndoorGamesFilter from "./IndoorGamesFilter";
import IndoorGameProducts from "./IndoorGameProducts";
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";

const IndoorGames = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        gameType: [],
        brand: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch specifically for 'Indoor Games' subcategory
                // Note: Ensure string matches exactly what's in your DB
                const data = await getProductsByCategory("Indoor Games");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Indoor Games from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Indoor Games</section>
            
            <section className="Sports-section">
                <div className="Sports-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <IndoorGamesFilter filters={filters} setFilters={setFilters} subCategory = "Indoor Games"/>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <IndoorGameProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default IndoorGames;