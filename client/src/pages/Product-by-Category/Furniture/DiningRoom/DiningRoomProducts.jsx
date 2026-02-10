import React from "react";
import { Link } from "react-router-dom";
import DiningRoomProductsData from "./DiningRoomProductsData";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

// MOCK DATA
const mockProducts = DiningRoomProductsData;

const getFinalPrice = (product) => {
  const price = Number(product.price ?? product.specs?.basePrice ?? 0);
  const discount = Number(product.discount ?? 0);
  const taxClass = Number(product.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  const taxAmount = Math.round((discountedPrice * taxClass) / 100);
  return discountedPrice + taxAmount;
};


const DiningRoomProducts = ({ filters, apiData }) => {
  
  const productsToDisplay = (apiData && apiData.length > 0) ? apiData : mockProducts;

  const maxPrice = typeof filters.price === "number" ? filters.price : null;

  let filteredProducts = productsToDisplay.filter((product) => {

    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const furnitureTypeMatch = filters.furnitureType.length === 0 || filters.furnitureType.includes(product.specs?.furnitureType);
    const finalPrice = getFinalPrice(product);
    const priceMatch = maxPrice !== null ? finalPrice <= maxPrice : true;
    
    return (
      brandMatch && 
      furnitureTypeMatch &&
      priceMatch   
    );
  })
  // ---------- SORT ----------
  if (filters.sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => getFinalPrice(a) - getFinalPrice(b)
    );
  }

  if (filters.sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => getFinalPrice(b) - getFinalPrice(a)
    );
  }

  if (filteredProducts.length === 0) {
      return <div className="text-center p-10 text-gray-500">No Dining Room products found matching your filters.</div>
  }

  return (
    <>
        <div className="h-min grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
          {filteredProducts.map((product) => {
            const finalPrice = getFinalPrice(product);
            return(
            <div key={product.id || product._id} className="border rounded-md p-4 bg-white hover:shadow-lg transition">
              <Link to= {`/product/${product._id || product.id}`}>
                <div className="flex gap-x-8 overflow-auto scrollbar-hide">
                  <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {product.images.map((img, index) => (
                      <SwiperSlide key={index}>
                        <img 
                            key={index} 
                            src={img} 
                            alt={product.name}
                            className="w-60 h-60 object-contain flex-shrink-0"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </Link>

              <h3 className="text-sm font-medium mt-2 text-center sm:text-left">{product.name}</h3>

              <p className="text-green-600 font-semibold mt-1 text-center sm:text-left">
                ₹{finalPrice.toLocaleString()}
              </p>

              <div className="text-sm mt-3 grid grid-cols-[130px_1fr] gap-y-2">

                <span className="font-medium text-gray-500">Brand:</span><span>{product.brand}</span>
                <span className="font-medium text-gray-500">Type:</span><span>{product.specs?.furnitureType}</span>
                
                {product.structureMaterial &&(
                  <>
                    <span className="font-medium text-gray-500">Material: </span>
                    <span>{product.specs?.structureMaterial}</span>
                  </>
                )}

                {product.features && (
                  <>
                    <span className="font-medium text-gray-500">Features:</span>
                    <span className="text-justify leading-tight">{product.specs?.features}</span>
                  </>
                )}

              </div>
            </div>
          )})}
        </div>
    </>
  );
};

export default DiningRoomProducts;