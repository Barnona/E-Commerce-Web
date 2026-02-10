import React, { useState, useEffect } from "react";
import MobilesFilter from "./MobilesFilter";
import MobileProducts from "./MobileProducts";
import { getProductsByCategory } from "../../../../service/api"; 
import "../../style.css";
import { CircularProgress } from "@mui/material";

const Mobiles = () => {
  const [apiProducts, setApiProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    brand: [],
    ram: [],
    rom: [],            
    displayType: [],    
    price: "",
    sort: "none"
  });


  // Fetch Data from API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getProductsByCategory('Mobiles');
        // If API returns data, use it. If empty (or error handled in api.js), apiProducts stays empty
        if (data && Array.isArray(data)) {
            setApiProducts(data);
        }
      } catch (error) {
        console.error("Failed to load mobile products from API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className="p-4 font-bold text-2xl border-b border-gray-200">
        Mobiles
      </section>

      <section className="Electronics-section">
        <div className="Electronics-bars flex flex-col md:flex-row gap-4 p-4">

          {/* Filter Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5">
            {/* <MobilesFilter filters={filters} setFilters={setFilters} /> */}
            <MobilesFilter filters={filters} setFilters={setFilters} subCategory="Mobiles"/>
          </div>

          {/* Product Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            {isLoading ? (
               <div className="flex justify-center items-center h-64">
                  <CircularProgress />
               </div>
            ) : (
               // Pass API data. If empty, MobileProducts uses its internal mock data
               <MobileProducts apiData={apiProducts} filters={filters} />
            )}
          </div>

        </div>
      </section>
    </>
  );
};

export default Mobiles;