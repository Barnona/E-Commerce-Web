import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import BookProductsData from "./BookProductsData";

// MOCK DATA
const mockProducts = BookProductsData

// Helper Functions

const getFinalPrice = (product) => {
  const price = Number(product.price ?? product.specs?.basePrice ?? 0);
  const discount = Number(product.discount ?? 0);
  const taxClass = Number(product.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  const taxAmount = Math.round((discountedPrice * taxClass) / 100);
  return discountedPrice + taxAmount;
};

const BookProducts = ({ filters, apiData }) => {
  
  // Use API Data if available, else Mock
  const productsToDisplay = (apiData && apiData.length > 0) ? apiData : mockProducts;
  
  const maxPrice = typeof filters.price === "number" ? filters.price : null;

  let filteredProducts = productsToDisplay.filter((product) => {

    const publisherMatch = filters.publisher.length === 0 || filters.publisher.includes(product.specs?.publisher);
    const authorMatch = filters.author.length === 0 || filters.author.includes(product.specs?.author);
    const bookTypeMatch = filters.bookType.length === 0 || filters.bookType.includes(product.specs?.bookType);
    const finalPrice = getFinalPrice(product);
    const priceMatch = maxPrice !== null ? finalPrice <= maxPrice : true;
    
    return (
      publisherMatch && 
      authorMatch &&
      bookTypeMatch &&
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
      return <div className="text-center p-10 text-gray-500">No books found matching your filters.</div>
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

              <div className="text-sm mt-3 grid grid-cols-[100px_1fr] gap-y-2">

                {product.specs?.bookType && (
                  <>
                    <span className="font-medium text-gray-500">Product Type:</span>
                    <span>{product.specs?.bookType}</span>
                  </>
                )}

                {product.specs?.author && (
                  <>
                    <span className="font-medium text-gray-500">Author:</span>
                    <span>{product.specs?.author}</span>
                  </>
                )}

                {product.specs?.publisher && (
                  <>
                    <span className="font-medium text-gray-500">Publisher:</span>
                    <span>{product.specs?.publisher}</span>
                  </>
                )}

              </div>
            </div>
          )})}
        </div>
    </>
  );
};

export default BookProducts;