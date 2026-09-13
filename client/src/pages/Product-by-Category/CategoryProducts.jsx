import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const getValue = (product, key) => {
  if (product?.[key] !== undefined) return product[key];
  if (product?.specs?.[key] !== undefined) return product.specs[key];
  if (product?.attributes?.[key] !== undefined) return product.attributes[key];
  return undefined;
};

const getFinalPrice = (product) => {
  const price = Number(product?.price ?? product?.specs?.basePrice ?? 0);
  const discount = Number(product?.discount ?? 0);
  const taxClass = Number(product?.taxClass ?? 0);
  const discountedPrice = Math.max(price - discount, 0);
  return discountedPrice + Math.round((discountedPrice * taxClass) / 100);
};

const matchesFilter = (product, key, selected) => {
  if (!Array.isArray(selected) || selected.length === 0) return true;
  const value = getValue(product, key);
  return selected.some((item) => String(item).toLowerCase() === String(value ?? "").toLowerCase());
};

const CategoryProducts = ({ filters = {}, apiData = [] }) => {
  const products = Array.isArray(apiData) ? apiData : [];

  const filteredProducts = useMemo(() => {
    const maxPrice = typeof filters.price === "number" ? filters.price : null;
    const result = products.filter((product) => {
      const filterMatches = Object.entries(filters).every(([key, selected]) => {
        if (key === "price" || key === "sort") return true;
        return matchesFilter(product, key, selected);
      });
      return filterMatches && (maxPrice === null || getFinalPrice(product) <= maxPrice);
    });

    if (filters.sort === "price-asc") return [...result].sort((a, b) => getFinalPrice(a) - getFinalPrice(b));
    if (filters.sort === "price-desc") return [...result].sort((a, b) => getFinalPrice(b) - getFinalPrice(a));
    return result;
  }, [products, filters]);

  if (filteredProducts.length === 0) {
    return <div className="text-center p-10 text-gray-500">No products found matching your filters.</div>;
  }

  return (
    <div className="h-min grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">
      {filteredProducts.map((product) => {
        const finalPrice = getFinalPrice(product);
        const images = Array.isArray(product.images) ? product.images : [];
        const id = product._id || product.id;

        return (
          <div key={id} className="border rounded-md p-4 bg-white hover:shadow-lg transition">
            <Link to={`/product/${id}`}>
              <div className="flex overflow-hidden justify-center">
                {images.length > 0 ? (
                  <Swiper navigation modules={[Navigation]} className="mySwiper w-60 h-60">
                    {images.map((img, index) => (
                      <SwiperSlide key={`${id}-${index}`}>
                        <img src={img} alt={product.name || "Product"} className="w-full h-full object-contain" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <div className="w-60 h-60 bg-gray-200 flex items-center justify-center text-gray-500">No Image</div>
                )}
              </div>
              <h3 className="text-sm font-medium mt-4 text-center sm:text-left">{product.name || "Unnamed product"}</h3>
            </Link>
            <p className="text-green-600 font-semibold mt-1 text-center sm:text-left">₹{finalPrice.toLocaleString()}</p>
            <div className="text-sm mt-3 grid grid-cols-[110px_1fr] gap-y-1">
              {[
                ["Brand", product.brand],
                ["RAM", getValue(product, "ram")],
                ["Storage", getValue(product, "rom")],
                ["Processor", getValue(product, "processor")],
                ["Display", getValue(product, "displaySize") || getValue(product, "displayType")],
              ].filter(([, value]) => value !== undefined && value !== null && value !== "").map(([label, value]) => (
                <React.Fragment key={label}>
                  <span className="font-medium text-gray-500">{label}:</span>
                  <span>{value}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryProducts;
