import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import AudioDeviceProductsData from "./AudioDeviceProductsData";

const mockProducts = AudioDeviceProductsData;

// Helper Functions

const getFinalPrice = (product) => {
  const price = Number(product.price ?? product.specs?.basePrice ?? 0);
  const discount = Number(product.discount ?? 0);
  const taxClass = Number(product.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  const taxAmount = Math.round((discountedPrice * taxClass) / 100);
  return discountedPrice + taxAmount;
};

const AudioDeviceProducts = ({ filters, apiData }) => {
  
  // Use API Data if available, else Mock
  const productsToDisplay = (apiData && apiData.length > 0) ? apiData : mockProducts;
  const maxPrice = typeof filters.price === "number" ? filters.price : null;

  let filteredProducts = productsToDisplay.filter((product) => {

    const typeMatch =  filters.type.length === 0 ||  filters.type.includes(product.specs?.type);
    const connectivityMatch = filters.connectivity.length === 0 || filters.connectivity.includes(product.specs?.connectivity);
    const noiseCancellationMatch = filters.noiseCancellation.length === 0 || filters.noiseCancellation.includes(product.specs?.noiseCancellation);
    const brandMatch = filters.brand.length === 0 || filters.brand.includes(product.brand);
    const finalPrice = getFinalPrice(product);
    const priceMatch = maxPrice !== null ? finalPrice <= maxPrice : true;

    return (
      typeMatch && 
      connectivityMatch &&
      brandMatch && 
      noiseCancellationMatch &&
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
      return <div className="text-center p-10 text-gray-500">No audio devices found matching your filters.</div>
  }

  return (
    <>
      <div className="h-min grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
        {filteredProducts.map((product) => {
          const finalPrice = getFinalPrice(product); 
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
                ₹{finalPrice.toLocaleString()}
            </p>

            <div className="text-sm mt-3 grid grid-cols-[140px_1fr] gap-y-1">

              <span className="font-medium text-gray-500">Category:</span><span>{product.specs?.type}</span>

              <span className="font-medium text-gray-500">Connectivity:</span><span>{product.specs?.connectivity}</span>

              {product.specs?.connectivity === "Bluetooth" && product.specs?.bluetoothVersion && (
                <>
                  <span className="font-medium text-gray-500">Bluetooth:</span><span>{product.specs?.bluetoothVersion}</span>
                </>
              )}

              {product.driverSize && (
                <>
                  <span className="font-medium text-gray-500">Driver Size:</span><span>{product.specs?.driverSize}</span>
                </>
              )}

              <span className="font-medium text-gray-500">Noise Cancellation:</span><span>{product.specs?.noiseCancellation}</span>

              {product.specs?.noiseCancellation === "ANC" && product.specs?.noiseCancellationValue && (
                <>
                  <span className="font-medium text-gray-500">ANC Level:</span><span>{product.specs?.noiseCancellationValue}</span>
                </>
              )}

              {product.specs?.connectivity === "Bluetooth" && product.specs?.playbacktime && (
                <>
                  <span className="font-medium text-gray-500">Playback:</span><span>{product.specs?.playbacktime}</span>
                </>
              )}

            </div>
          </div>
        )})}
      </div>
    </>
  );
};

export default AudioDeviceProducts;