import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import MobileProductsData from "./MobileProductsData";

const mockProducts = MobileProductsData;

const getFinalPrice = (product) => {
  const price = Number(product.price ?? product.specs?.basePrice ?? 0);
  const discount = Number(product.discount ?? 0);
  const taxClass = Number(product.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  const taxAmount = Math.round((discountedPrice * taxClass) / 100);
  return discountedPrice + taxAmount;
};


const MobileProducts = ({ filters, apiData }) => {
  // Use API data if available, otherwise use Mock Data
  const productsToDisplay = (apiData && apiData.length > 0) ? apiData : mockProducts;

    // ---------- PRICE NORMALIZATION ----------
  const maxPrice = typeof filters.price === "number" ? filters.price : null;

  // ---------- FILTER ----------
  let filteredProducts = productsToDisplay.filter((product) => {
    const ram = product.specs?.ram;
    const rom = product.specs?.rom;
    const displayType = product.specs?.displayType;

    const ramMatch = filters.ram.length === 0 || filters.ram.includes(ram);
    const romMatch = filters.rom.length === 0 || filters.rom.includes(rom);
    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const displayTypeMatch = filters.displayType.length === 0 || filters.displayType.includes(displayType);
    const finalPrice = getFinalPrice(product);
    const priceMatch = maxPrice !== null ? finalPrice <= maxPrice : true;

    return (
      ramMatch &&
      romMatch &&
      brandMatch &&
      displayTypeMatch &&
      priceMatch
    );
  });

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


  return (
    <div className="h-min grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
      {filteredProducts.map((product) => {
        const price =  product.price ||  product.specs?.basePrice ||  0;
        const discount = product.discount || 0;
        const taxClass = product.taxClass || 0;

        const discountedPrice = price - discount;
        const taxAmount = Math.round((discountedPrice * taxClass) / 100);
        const finalPrice = discountedPrice + taxAmount;
        
        return(
          <div key={product.id || product._id} className="border rounded-md p-4 bg-white hover:shadow-lg transition">
            <Link to={`/product/${product._id || product.id}`}>
              <div className="flex gap-x-8 overflow-hidden justify-center">
                {/* Check if images exist and are array */}
                {product.images && product.images.length > 0 ? (
                    <Swiper navigation={true} modules={[Navigation]} className="mySwiper w-60 h-60">
                      {product.images.map((img, index) => (
                        <SwiperSlide key={index}>
                          <img 
                              src={img} 
                              alt={product.name}
                              className="w-full h-full object-contain"
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                ) : (
                    <div className="w-60 h-60 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
           
            
            <h3 className="text-sm font-medium mt-4 text-center sm:text-left">{product.name}</h3>
            </Link>

            <p className="text-green-600 font-semibold mt-1 text-center sm:text-left">₹{finalPrice?.toLocaleString()}</p>

            <div className="text-sm mt-3 grid grid-cols-[90px_1fr] gap-y-1">
              <span className="font-medium text-gray-500">RAM:</span><span> {product.ram || product.specs?.ram}</span>
              <span className="font-medium text-gray-500">Storage:</span><span> {product.rom || product.specs?.rom}</span>
              <span className="font-medium text-gray-500">Processor:</span><span> {product.processor || product.specs?.processor}</span>
              <span className="font-medium text-gray-500">Display:</span><span> {product.displaySize || product.specs?.displaySize} | {product.displayType || product.specs?.displayType} Display</span>
              <span className="font-medium text-gray-500">Back Camera:</span><span> {product.rearCamera || product.specs?.backCamera}</span>
              <span className="font-medium text-gray-500">Front Camera:</span><span> {product.frontCamera || product.specs?.frontCamera}</span>
            </div>
          </div>
      )})}
    </div>
  );
};

export default MobileProducts;