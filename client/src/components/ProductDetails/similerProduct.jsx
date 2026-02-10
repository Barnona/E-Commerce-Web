import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsByCategory } from "../../service/api"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const SimilarProducts = ({ category, currentProductId }) => {
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      console.log("--- SIMILAR PRODUCTS DEBUG ---");
      console.log("Searching for Category:", category);
      console.log("Current Product ID:", currentProductId);

      if (!category) {
        console.warn("Category is missing! Cannot fetch similar products.");
        setLoading(false);
        return;
      }
      
      try {
        const data = await getProductsByCategory(category);
        console.log("API Response Data:", data);

        if (data && Array.isArray(data)) {
          const filtered = data.filter((p) => p._id !== currentProductId && p.id !== currentProductId);
          console.log("Filtered Products (ready to render):", filtered);
          setSimilarProducts(filtered);
        } else {
            console.error("API returned invalid data (not an array):", data);
        }
      } catch (err) {
          console.error("Error in SimilarProducts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilar();
  }, [category, currentProductId]);

  if (loading) return <p className="p-4 text-gray-500">Loading similar products...</p>;

  if (similarProducts.length === 0) {
      return <p className="p-4 text-red-500 border border-red-200 bg-red-50 rounded">Debug: No similar products found for category: "{category}"</p>;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Similar Products</h2>
      
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        spaceBetween={20}
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="pb-8"
      >
        {similarProducts.map((product) => (
          <SwiperSlide key={product._id || product.id}>
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 h-full">
              <Link to={`/product/${product._id || product.id}`} className="block group">
                <div className="relative h-48 w-full mb-4 overflow-hidden rounded bg-gray-50 flex items-center justify-center">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <h3 className="text-sm font-medium text-gray-900 truncate mb-1">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">
                        ₹{(product.price - (product.discount || 0)).toLocaleString("en-IN")}
                    </span>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SimilarProducts;