import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { viewProducts } from "../../service/api2";
import ProductSpecs from "./ProductSpecs";
import SimilarProducts from "./similerProduct";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { isLoggedIn } from "../utils/auth";
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  const getProduct = async () => {
    try {
        const products = await viewProducts();
        const selectedProduct = products.find(p => p._id === id); 
    
        if (selectedProduct) {
          setProduct(selectedProduct);
          setSelectedImage(selectedProduct.images?.[0] || "");
          window.scrollTo(0, 0); 
        }
    } catch (error) {
        console.error("Error loading product", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  const discountedPrice = product.price - product.discount;
  const taxAmount = Math.round((discountedPrice * product.taxClass) / 100);
  const taxedPrice = product.price + product.price * product.taxClass/100;
  const finalPrice = discountedPrice + taxAmount;
  const rating = product.rating || 4.5;
  const totalReviews = product.reviews || 124;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) stars.push(<FaStar key={i} className="text-yellow-400" />);
      else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      else stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
    return stars;
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-8">
                    <div className="flex flex-col items-center">
                        <div className="w-full h-96 bg-white border border-gray-100 rounded-lg flex items-center justify-center p-4 mb-4 relative overflow-hidden group">
                            <img src={selectedImage} alt={product.name} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105" />
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 w-full justify-center scrollbar-hide">
                            {product.images.map((img, index) => (
                                <button key={index} onClick={() => setSelectedImage(img)} className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-md overflow-hidden transition-all duration-200 ${selectedImage === img ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200 hover:border-blue-400"}`}>
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold tracking-wide text-blue-600 uppercase mb-1">{product.brand || "Brand"}</span>
                        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-2">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="flex text-lg">{renderStars(rating)}</div>
                            <span className="text-sm text-gray-500 font-medium">({rating} / 5) based on {totalReviews} reviews</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-gray-900">₹{finalPrice.toLocaleString("en-IN")}</span>
                                <span className="text-lg text-gray-400 line-through mb-1">₹{taxedPrice.toLocaleString("en-IN")}</span>
                                <span className="text-sm font-bold text-green-600 bg-green-100 px-2 py-1 rounded mb-1">{Math.round(((taxedPrice - finalPrice) / taxedPrice) * 100)}% OFF</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
                        </div>
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                            <p className="text-gray-600 leading-relaxed text-justify">{product.description}</p>
                        </div>
                        <div className="flex gap-4 mt-auto">
                            <button onClick={() => isLoggedIn() ? addToCart(product) : alert("Login required")} className="flex-1 bg-blue-600 text-white font-semibold py-4 rounded-lg shadow-md hover:bg-blue-700 transition-all flex justify-center items-center gap-2 text-lg">
                                <FaShoppingCart /> Add to Cart
                            </button>
                            <button onClick={() => isLoggedIn() ? (isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product)) : alert("Login required")} className={`flex-1 font-semibold py-4 rounded-lg shadow-sm border transition-all flex justify-center items-center gap-2 text-lg ${isInWishlist(product._id) ? "bg-red-50 border-red-200 text-red-600" : "bg-white border-gray-300 text-gray-700"}`}>
                                {isInWishlist(product._id) ? <FaHeart /> : <FaRegHeart />} {isInWishlist(product._id) ? "Wishlisted" : "Wishlist"}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 p-8 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Product Specifications</h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <ProductSpecs product={product} />
                    </div>
                </div>

                <div className="border-t border-gray-200 p-8 bg-white">
                   <SimilarProducts 
                      category={product.subCategory} 
                      currentProductId={product.id || product._id} 
                   />
                </div>

            </div>
        </div>
    </div>
  );
};

export default ProductDetails;