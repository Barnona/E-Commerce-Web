import React from "react";
import Trend1 from './images/Trend1.jpg';
import Trend2 from './images/Trend2.jpg';
import Trend3 from './images/Trend3.jpg';
import Trend4 from './images/Trend4.jpg';
import Trend5 from './images/Trend5.jpg';
import Trend6 from './images/Trend6.jpg';
import Trend7 from './images/Trend7.jpg';
import Trend8 from './images/Trend8.jpg';
import './style.css';
import { Link } from "react-router-dom";

const Trending = () =>{
    return(
        <>
            <h1 className="trending-heading">Trending</h1>
        <div className="side-scroll">
            <Link to="/small-appliances" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend1} alt="Trend 1" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Men's Trimmer</span>
                        <p className="font-[500]">from ₹1,500</p>
                    </div>
                </div>
            </Link>
            <Link to="/kitchen-appliances" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend2} alt="Trend 2" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Digital Air Fryer</span>
                        <p className="font-[500]">from ₹2,500</p>
                    </div>
                </div>
            </Link>
            <Link to="/men-top-wear" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend3} alt="Trend 3" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Men's Blazer</span>
                        <p className="font-[500]">from ₹800</p>
                    </div>
                </div>
            </Link>
            <Link to="/women-top-wear" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend4} alt="Trend 4" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Sharara Suit Set</span>
                        <p className="font-[500]">from ₹990</p>
                    </div>
                </div>
            </Link>
            <Link to="/makeup" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend5} alt="Trend 5" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>LED Light Therapy Mask</span>
                        <p className="font-[500]">from ₹1,200</p>
                    </div>
                </div>
            </Link>
            <Link to="/small-appliances" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend6} alt="Trend 6" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Shine-On Hair Straightener</span>
                        <p className="font-[500]">from ₹1,100</p>
                    </div>
                </div>
            </Link>
            <Link to="/audio-devices" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend7} alt="Trend 7" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Wireless earbuds</span>
                        <p className="font-[500]">from ₹900</p>
                    </div>
                </div>
            </Link>
            <Link to="/office-furniture" className="img-link">
                <div className="item gap-5 flex flex-col">
                    <img src={Trend8} alt="Trend 8" style={{width: '200px', height: '200px'}}/>
                    <div className="item-label">
                        <span>Foldable Study Tables</span>
                        <p className="font-[500]">from ₹2,000</p>
                    </div>
                </div>
            </Link>
        </div>
        </>
    )
}

export default Trending