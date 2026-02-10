import React, { useState, useEffect } from "react";
import '../../style.css'
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import ToysandGamesFilter from "./ToysandGamesFilter";
import ToyandGameProducts from "./ToyandGameProducts";

const ToysandGames = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        categoryType: [],
        brand: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory("Toys and Games");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Toys & Games from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Toys and Games</section>
            
            <section className="BooksandToys-section">
                <div className="BooksandToys-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <ToysandGamesFilter filters={filters} setFilters={setFilters} subCategory="Toys and Games" />
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <ToyandGameProducts apiData={apiProducts} filters={filters} />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default ToysandGames;