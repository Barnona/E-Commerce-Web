import React from "react";
import { Link } from "react-router-dom";
import Electronics1 from './images/Electronics-1.jpg';
import Electronics2 from './images/Electronics-2.jpg';
import Electronics3 from './images/Electronics-3.jpg';
import Electronics4 from './images/Electronics-4.jpg';
import Fashion1 from './images/Fashion-1.jpg';
import Fashion2 from './images/Fashion-2.png';
import Fashion3 from './images/Fashion-3.jpg';
import Trend3 from './images/Trend3.jpg';
import Appliance1 from './images/Appliances-1.jpg';
import Appliance2 from './images/Appliances-2.jpg';
import Appliance3 from './images/Appliances-3.png';
import Appliance4 from './images/Appliances-4.jpg';
import Furniture1 from './images/Furniture-1.jpg';
import Furniture2 from './images/Furniture-2.jpg';
import Furniture3 from './images/Furniture-3.jpg';
import Furniture4 from './images/Furniture-4.jpg';
import Beauty1 from './images/Beauty-1.jpg';
import Beauty2 from './images/Beauty-2.jpg';
import Beauty3 from './images/Beauty-3.jpg';
import Trend5 from './images/Trend5.jpg';
import Winter1 from './images/Winter1.jpg';
import Winter2 from './images/Winter2.jpg';
import Winter3 from './images/Winter3.jpg';
import Winter4 from './images/Winter4.jpg';
import './style.css';

const DealsOnProduct = () =>{
    return(
        <>
            <div className="DealsOnProduct-containar gap-3">
                <div className="Product-containar col-l-1 col-m-1 col-s-1">
                    Deals on Electronics
                    <div className="product-view gap-2">
                        <Link to="/Mobiles" className="product-link flex flex-col items-center">
                            <img src={Electronics1} alt="Electronics Product" className="h-45"/>
                            <span>Mobile Phones</span>
                            <p className="text-green-600">50% off</p>
                        </Link>
                        <Link to="/Laptops" className="product-link flex flex-col items-center">
                            <img src={Electronics2} alt="Electronics Product" className="h-45"/>
                            <span>Laptops</span>
                            <p className="text-green-600">30% off</p>
                        </Link>
                        <Link to="/Audio-Devices" className="product-link flex flex-col items-center">
                            <img src={Electronics3} alt="Electronics Product" className="h-45"/>
                            <span>Headphones</span>
                            <p className="text-green-600">60% off</p>
                        </Link>
                        <Link to="/Audio-Devices" className="product-link flex flex-col items-center">
                            <img src={Electronics4} alt="Electronics Product" className="h-45"/>
                            <span>Speakers</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                    </div>
                </div>
                <div className="Product-containar col-l-2 col-m-2 col-s-1">
                    Deals on Fashion
                    <div className="product-view gap-2">
                        <Link to="/Women-Top-Wear" className="product-link flex flex-col items-center">
                            <img src={Fashion1} alt="Fashion Product" className="h-45"/>
                            <span>Lehenga</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/Men-Bottom-Wear" className="product-link flex flex-col items-center">
                            <img src={Fashion2} alt="Fashion Product" className="h-45"/>
                            <span>Men's Pajama</span>
                            <p className="text-green-600">50% off</p>
                        </Link>
                        <Link to="/Men-Top-Wear" className="product-link flex flex-col items-center">
                            <img src={Trend3} alt="Fashion Product" className="h-45"/>
                            <span>Blazer</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/Women-Top-Wear" className="product-link flex flex-col items-center">
                            <img src={Fashion3} alt="Fashion Product" className="h-45"/>
                            <span>Western Wear</span>
                            <p className="text-green-600">60% off</p>
                        </Link>
                    </div>
                </div>
                <div className="Product-containar col-l-3 col-m-1 col-s-1">
                    Deals on Home Appliances
                    <div className="product-view gap-2">
                        <Link to="/large-appliances" className="product-link flex flex-col items-center">
                            <img src={Appliance1} alt="Home Appliance Product" className="h-45"/>
                            <span>Television</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/large-appliances" className="product-link flex flex-col items-center">
                            <img src={Appliance2} alt="Home Appliance Product" className="h-45"/>
                            <span>Refrigerator</span>
                            <p className="text-green-600">35% off</p>
                        </Link>
                        <Link to="/large-appliances" className="product-link flex flex-col items-center">
                            <img src={Appliance3} alt="Home Appliance Product" className="h-45"/>
                            <span>Washing Machine</span>
                            <p className="text-green-600">45% off</p>
                        </Link>
                        <Link to="/home-comforts" className="product-link flex flex-col items-center">
                            <img src={Appliance4} alt="Home Appliance Product" className="h-45"/>
                            <span>Air Conditioner</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                    </div>
                </div>
                <div className="Product-containar col-l-1 col-m-2 col-s-1">
                    Deals on Furniture
                    <div className="product-view gap-2">
                        <Link to="/office-furniture" className="product-link flex flex-col items-center">
                            <img src={Furniture1} alt="Furniture Product" className="h-45"/>
                            <span>Laptop Desk</span>
                            <p className="text-green-600">60% off</p>
                        </Link>
                        <Link to="/living-room" className="product-link flex flex-col items-center">
                            <img src={Furniture2} alt="Furniture Product" className="h-45"/>
                            <span>Sofa Set</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/bedroom" className="product-link flex flex-col items-center">
                            <img src={Furniture3} alt="Furniture Product" className="h-45"/>
                            <span>Wardrobe</span>
                            <p className="text-green-600">30% off</p>
                        </Link>
                        <Link to="/dining-room" className="product-link flex flex-col items-center">
                            <img src={Furniture4} alt="Furniture Product" className="h-45"/>
                            <span>Dining Table</span>
                            <p className="text-green-600">50% off</p>
                        </Link>
                    </div>
                </div>
                <div className="Product-containar col-l-2 col-m-1 col-s-1">
                    Deals on Beauty
                    <div className="product-view gap-2">
                        <Link to="/makeup" className="product-link flex flex-col items-center">
                            <img src={Beauty1} alt="Beauty Product" className="h-45"/>
                            <span>Kajal</span>
                            <p className="text-green-600">50% off</p>
                        </Link>
                        <Link to="/skin-care" className="product-link flex flex-col items-center">
                            <img src={Beauty2} alt="Beauty Product" className="h-45"/>
                            <span>Skin Care</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/makeup" className="product-link flex flex-col items-center">
                            <img src={Beauty3} alt="Beauty Product" className="h-45"/>
                            <span>Perfume</span>
                            <p className="text-green-600">20% off</p>
                        </Link>
                        <Link to="/makeup" className="product-link flex flex-col items-center">
                            <img src={Trend5} alt="Beauty Product" className="h-45"/>
                            <span>Therapy Mask</span>
                            <p className="text-green-600">40% off</p>
                        </Link>
                    </div>
                </div>
                <div className="Product-containar col-l-3 col-m-2 col-s-1">
                    Deals on Winter Products
                    <div className="product-view gap-2">
                        <Link to="/winter" className="product-link flex flex-col items-center">
                            <img src={Winter1} alt="Winter Product" className="h-45"/>
                            <span>Sweater</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/winter" className="product-link flex flex-col items-center">
                            <img src={Winter2} alt="Winter Product" className="h-45"/>
                            <span>Hoodie</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/winter" className="product-link flex flex-col items-center">
                            <img src={Winter3} alt="Winter Product" className="h-45"/>
                            <span>Winter Cap</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                        <Link to="/winter" className="product-link flex flex-col items-center">
                            <img src={Winter4} alt="Winter Product" className="h-45"/>
                            <span>Heated Gloves</span>
                            <p className="text-green-600">Explore Now</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DealsOnProduct