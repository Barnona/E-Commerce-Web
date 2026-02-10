import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import LaptopProductsData from "./LaptopProductsData";

// MOCK DATA
const mockProducts = LaptopProductsData;

// Helper Functions

const getFinalPrice = (product) => {
  const price = Number(product.price ?? product.specs?.basePrice ?? 0);
  const discount = Number(product.discount ?? 0);
  const taxClass = Number(product.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  const taxAmount = Math.round((discountedPrice * taxClass) / 100);
  return discountedPrice + taxAmount;
};


const LaptopProducts = ({ filters, apiData }) => {
  
  // Use API Data if available, else Mock
  const productsToDisplay = (apiData && apiData.length > 0) ? apiData : mockProducts;

  const maxPrice = typeof filters.price === "number" ? filters.price : null;

  let filteredProducts = productsToDisplay.filter((product) => {

    const ram = product.specs?.ram;
    const ramType = product.specs?.ramType;
    const ssd = product.specs?.ssd;
    const hdd = product.specs?.hdd;
    const processorBrand = product.specs?.processorBrand;
    const processor = product.specs?.processor;
    const processorGen = product.specs?.processorGen;
    const gpuSeries = product.specs?.gpuSeries;
    const graphicsMemory = product.specs?.graphicsMemory;
    const displayType = product.specs?.displayType;
    const displaySize = product.specs?.displaySize;

    const ramMatch = filters.ram.length === 0 || filters.ram.includes(ram);
    const ramTypeMatch = filters.ramType.length === 0 || filters.ramType.includes(ramType);
    const ssdMatch = filters.ssd.length === 0 || filters.ssd.includes(ssd);
    const hddMatch = filters.hdd.length === 0 || filters.hdd.includes(hdd);
    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const processorBrandMatch = filters.processorBrand.length === 0 || filters.processorBrand.includes(processorBrand);
    const processorMatch = filters.processor.length === 0 || filters.processor.includes(processor);
    const processorGenMatch = filters.processorGen.length === 0 || filters.processorGen.includes(processorGen);
    const gpuSeriesMatch = filters.gpuSeries.length === 0 || filters.gpuSeries.includes(gpuSeries);
    const graphicsMemoryMatch = filters.graphicsMemory.length === 0 || filters.graphicsMemory.includes(graphicsMemory);
    const displayTypeMatch = filters.displayType.length === 0 || filters.displayType.includes(displayType);
    const finalPrice = getFinalPrice(product);
    const priceMatch = maxPrice !== null ? finalPrice <= maxPrice : true;
    const displaySizeMatch = filters.displaySize.length === 0 || filters.displaySize.includes(displaySize);

    return (
      ramMatch && 
      ramTypeMatch && 
      ssdMatch && 
      hddMatch && 
      brandMatch && 
      processorBrandMatch && 
      processorMatch && 
      processorGenMatch &&
      graphicsMemoryMatch &&
      gpuSeriesMatch &&
      displayTypeMatch && 
      priceMatch &&  
      displaySizeMatch
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
      return <div className="text-center p-10 text-gray-500">No laptops found matching your filters.</div>
  }

  return (
    <>
      <div className="h-min grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
        {filteredProducts.map((product) =>{
          const finalPrice = getFinalPrice(product)
          return(
          <div key={product.id || product._id} className="border rounded-md p-4 bg-white hover:shadow-lg transition">
            <Link to= {`/product/${product._id || product.id}`}>
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

            <p className="text-green-600 font-semibold mt-1 text-center sm:text-left">₹{finalPrice?.toLocaleString()}</p>

            {/* Specs */}
            <div className="text-sm mt-3 grid grid-cols-[100px_1fr] gap-y-1">
              
              <span className="font-medium text-gray-500">Processor:</span>
              <span>{product.specs?.processor} {product.specs?.processorGen}</span>

              <span className="font-medium text-gray-500">RAM:</span>
              <span>{product.specs?.ram} {product.specs?.ramType}</span>

              <span className="font-medium text-gray-500">Storage:</span>
              <span>
                {product.specs?.ssd && `${product.specs?.ssd} SSD`}
                {product.specs?.ssd && product.specs?.hdd && " + "}
                {product.specs?.hdd && `${product.specs?.hdd} HDD`}
              </span>
              
              <span className="font-medium text-gray-500">Graphics:</span>
              <span>{product.specs?.gpuName}</span>

              <span className="font-medium text-gray-500">Display:</span>
              <span>{product.specs?.displaySize} | {product.specs?.displayType}</span>
            </div>
          </div>
        )})}
      </div>
    </>
  );
};

export default LaptopProducts;