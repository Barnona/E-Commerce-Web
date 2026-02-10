import React, { useState, useEffect } from "react";
import '../../style.css'
import { getProductsByCategory } from "../../../../service/api"; // Correct API path
import { CircularProgress } from "@mui/material";
import BooksFilter from "./BooksFilter";
import BookProducts from "./BookProducts";

const Books = () =>{
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [filters, setFilters] = useState({
        bookType: [],
        publisher: [],
        author: [],
        price: "",
        sort: "none"
    });

    // Fetch Data from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await getProductsByCategory("Books");
                if (data && Array.isArray(data)) {
                    setApiProducts(data);
                }
            } catch (error) {
                console.error("Failed to load Books from API.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return(
        <>
            <section className="p-4 font-bold text-2xl border-b border-gray-200">Books</section>
            
            <section className="BooksandToys-section">
                <div className="BooksandToys-bars flex flex-col md:flex-row gap-4 p-4">

                    {/* Filter Sidebar */}
                    <div className="w-full md:w-1/4 lg:w-1/5">
                        <BooksFilter filters={filters} setFilters={setFilters} subCategory= "Books"/>
                    </div>

                    {/* Product Grid */}
                    <div className="w-full md:w-3/4 lg:w-4/5">
                        {isLoading ? (
                            <div className="flex justify-center items-center h-64">
                                <CircularProgress />
                            </div>
                        ) : (
                            <BookProducts apiData={apiProducts} filters={filters}  />
                        )}
                    </div>

                </div>
            </section>
        </>
    )
}

export default Books;