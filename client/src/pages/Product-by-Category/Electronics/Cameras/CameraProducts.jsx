import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import CameraProductsData from "./CameraProductsData";

// MOCK DATA
const mockProducts = CameraProductsData;

// Helper: Filter Logic for Pixels
const getFinalPrice = (product) => {
  const price = Number(product.price ?? product.specs?.basePrice ?? 0);
  const discount = Number(product.discount ?? 0);
  const taxClass = Number(product.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  const taxAmount = Math.round((discountedPrice * taxClass) / 100);
  return discountedPrice + taxAmount;
};

const CameraProducts = ({ filters, apiData }) => {
  
  // Use API Data if available, else Mock
  const productsToDisplay = (apiData && apiData.length > 0) ? apiData : mockProducts;

  const maxPrice = typeof filters.price === "number" ? filters.price : null;

  let filteredProducts = productsToDisplay.filter((product) => {

    const videoMatch =  filters.videoResolution.length === 0 || filters.videoResolution.includes(product.videoResolution);
    const shutterMatch = filters.shutterSpeed.length === 0 || filters.shutterSpeed.includes(product.shutterSpeed);
    const effectivePixelsMatch = filters.effectivePixels.length === 0 || filters.effectivePixels.includes(product.specs?.effectivePixels)
    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const connectivityMatch = filters.connectivity.length === 0 || filters.connectivity.includes(product.specs?.connectivity);
    const finalPrice = getFinalPrice(product);
    const priceMatch = maxPrice !== null ? finalPrice <= maxPrice : true;

    return (
      brandMatch && videoMatch && shutterMatch && effectivePixelsMatch && priceMatch && connectivityMatch
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
      return <div className="text-center p-10 text-gray-500">No products found matching your filters.</div>
  }

  if (filteredProducts.length === 0) {
      return <div className="text-center p-10 text-gray-500">No cameras found matching your filters.</div>
  }

  return (
    <div className="h-min grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
      {filteredProducts.map((product) => {
        const finalPrice = getFinalPrice(product)
        return(
        <div key={product.id || product._id} className="border rounded-md p-4 bg-white hover:shadow-lg transition">
      
          <Link to={`/product/${product._id || product.id}`}>
              <div className="flex gap-x-8 overflow-hidden justify-center">
                {product.images && product.images.length > 0 ? (
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-60 h-60">
                        {product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img key={index} src={img} alt={product.name}
                                    className="w-full h-full object-contain flex-shrink-0"/>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="w-60 h-60 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
          

          <h3 className="text-sm font-medium mt-4 text-center sm:text-left">{product.name}</h3>
          </Link>
          <p className="text-green-600 font-semibold mt-1 text-center sm:text-left">
            ₹{finalPrice?.toLocaleString()}
          </p>

          <div className="text-sm mt-3 grid grid-cols-[120px_1fr] gap-y-1">
            <span className="font-medium text-gray-500">Brand:</span><span>{product.specs?.brand}</span>
            <span className="font-medium text-gray-500">Effective Pixels:</span><span>{product.specs?.effectivePixels}</span>
            <span className="font-medium text-gray-500">Video:</span><span>{product.specs?.videoResolution}</span>
            <span className="font-medium text-gray-500">Shutter:</span><span>{product.specs?.shutterSpeed}</span>
            <span className="font-medium text-gray-500">Connectivity:</span><span>{product.specs?.connectivity}</span>
          </div>
        </div>
      )})}
    </div>
  );
};

export default CameraProducts;