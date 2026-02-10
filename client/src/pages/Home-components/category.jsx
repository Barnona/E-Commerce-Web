import React from "react";
import Electronics from "./images/Electronics.png";
import Fashion from "./images/Fashion.png";
import Appliances from "./images/Appliances.png";
import Furniture from "./images/Furniture.png";
import Groceries from "./images/Groceries.png";
import Sports from "./images/Sports.png";
import BeautyHealth from "./images/Beauty&Health.png";
import BooksToys from "./images/Books&Toys.png";
import './style.css';
import { Link } from "react-router-dom";

const Category = ()=>{
    return(
        <>
            <div className="category-card flex">
                <div className="category-electronics">
                    <div className="flex flex-col items-center">
                    <img src={Electronics} alt="Electronics" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Electronics ▾</h3>
                    </div>
                    <div className="Electronics-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Mobiles">Mobiles</Link>
                        <Link to="/Laptops">Laptops</Link>
                        <Link to="/Cameras">Cameras</Link>
                        <Link to="/Tablets">Tablets</Link>
                        <Link to="/Audio-Devices">Audio Devices</Link>
                    </div>
                </div>
                <div className="category-fashion">
                    <div className="flex flex-col items-center">
                    <img src={Fashion} alt="Fashion" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Fashion ▾</h3>
                    </div>
                    <div className="Fashion-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Men-Top-Wear">Men's Top Wear</Link>
                        <Link to="/Men-Bottom-Wear">Men's Bottom Wear</Link>
                        <Link to="/Women-Top-Wear">Women's Top Wear</Link>
                        <Link to="/Women-Bottom-Wear">Women's Bottom Wear</Link>
                        <Link to="/Men-Footwear">Men's Footwear</Link>
                        <Link to="/Women-Footwear">Women's Footwear</Link>
                        <Link to="/Bags-Luggages">Bags & Luggages</Link>
                        <Link to="/Kids">Kids</Link>
                    </div>
                </div>
                <div className="category-home-appliances">
                    <div className="flex flex-col items-center">
                    <img src={Appliances} alt="Home Appliances" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Home Appliances ▾</h3>
                    </div>
                    <div className="Appliances-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Kitchen-Appliances">Kitchen Appliances</Link>
                        <Link to="/Large-Appliances">Large Appliances</Link>
                        <Link to="/Small-Appliances">Small Appliances</Link>
                        <Link to="/Home-Comforts">Home Comforts</Link>
                    </div>
                </div>
                <div className="category-furniture">
                    <div className="flex flex-col items-center">
                    <img src={Furniture} alt="Furniture" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Furniture ▾</h3>
                    </div>
                    <div className="Furniture-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Living-Room">Living Room</Link>
                        <Link to="/Bedroom">Bedroom</Link>
                        <Link to="/Dining-Room">Dining Room</Link>
                        <Link to="/Office-Furniture">Office Furniture</Link>
                    </div>
                </div>
                <div className="category-groceries">
                    <div className="flex flex-col items-center">
                    <img src={Groceries} alt="Groceries" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Groceries ▾</h3>
                    </div>
                    <div className="Groceries-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Fruits-Vegetables">Fruits & Vegetables</Link>
                        <Link to="/Dairy-Products">Dairy Products</Link>
                        <Link to="/Beverages">Beverages</Link>
                        <Link to="/Snacks">Snacks</Link>
                    </div>
                </div>
                <div className="category-sports">
                    <div className="flex flex-col items-center">
                    <img src={Sports} alt="Sports" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Sports ▾</h3>
                    </div>
                    <div className="Sports-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Fitness-Equipment">Fitness Equipment</Link>
                        <Link to="/Outdoor-Sports">Outdoor Sports</Link>
                        <Link to="/Indoor-Games">Indoor Games</Link>
                        <Link to="/Sportswear">Sportswear</Link>
                    </div>
                </div>
                <div className="category-beauty-health">
                    <div className="flex flex-col items-center">
                    <img src={BeautyHealth} alt="Beauty & Health" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Beauty & Health ▾</h3>
                    </div>
                    <div className="Beauty-Health-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Skincare">Skincare</Link>
                        <Link to="/Haircare">Haircare</Link>
                        <Link to="/Makeup">Makeup</Link>
                        <Link to="/Health-Supplements">Health Supplements</Link>
                    </div>
                </div>
                <div className="category-book-toys">
                    <div className="flex flex-col items-center">
                    <img src={BooksToys} alt="Books & Toys" className="w-22 h-22 object-cover" />
                    <h3 className="font-[500]">Books & Toys ▾</h3>
                    </div>
                    <div className="Books-Toys-Menu text-sm flex flex-col gap-1 font-[400]">
                        <Link to="/Books">Books</Link>
                        <Link to="/Toys-Games">Toys & Games</Link>
                        <Link to="/Stationery-Office-Supplies">Stationery & Office Supplies</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Category

