import React from "react";
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="flex justify-between mb-7 px-35 divide-x-1 divide-blue-500">
                <div className="flex justify-between gap-35 pr-40">
                    <div className="footer-col policy-col place-items-start">
                        <h3 className="footer-title text-gray-400 mb-2">About Developers</h3>
                        <div className="text-[13px] place-items-start">
                            <div><span>Concept and Frontend by</span> <span className="text-amber-500">Kuntal Das</span></div>
                            <div><span>Design and Backend by</span> <span className="text-amber-500">Barnona Das</span></div>
                        </div>
                    </div>
                    <div className="footer-col policy-col place-items-start">
                        <h3 className="footer-title text-gray-400 mb-2">Customer Care</h3>
                        <ul className="footer-links text-[13px] place-items-start">
                            <li><a href="/helpcenter">Help Center</a></li>
                            <li><a href="/returns">Returns & Refunds</a></li>
                            <li><a href="/shipping">Shipping Policy</a></li>
                            <li><a href="/terms">Terms & Conditions</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="flex justify-between gap-35 ml-40">
                     <div className="footer-col policy-col place-items-start">
                        <h3 className="footer-title text-gray-400 mb-2">Mail Us</h3>
                        <div className="text-[13px] place-items-start">
                            <div>Module 132, Ground Floor,</div>
                            <div>SDF Building, GP Block,</div>
                            <div>Sector V, Bidhannagar,</div>
                            <div>Kolkata, 700091</div>
                            <div>West Bengal, India</div>
                        </div>
                    </div>
                    <div className="footer-col policy-col">
                        <div  className="mb-5 place-items-start">
                            <h3 className="footer-title text-gray-400 mb-2">Contact Us</h3>
                            <ul className="footer-links text-[13px] place-items-start">
                                <li><span>Email us</span> : <span>support@eshop.com</span></li>
                                <li><span>Call us</span> : <span>1800-123-456</span></li>
                            </ul>
                        </div>
                        <div className="place-items-start">
                            <h3 className="footer-title text-gray-400 mb-2">Follow Us</h3>
                            <div className="flex gap-5">
                                <a href="#" className="social-icon"><FaFacebookF /></a>
                                <a href="#" className="social-icon"><FaTwitter /></a>
                                <a href="#" className="social-icon"><FaInstagram /></a>
                                <a href="#" className="social-icon"><FaLinkedinIn /></a>
                            </div>
                        </div>    
                    </div>
                    <div className="footer-col policy-col place-items-start">
                        <h3 className="footer-title text-gray-400 mb-2">Office Address</h3>
                        <div className="text-[13px] place-items-start">
                            <div>Module 132, Ground Floor,</div>
                            <div>SDF Building, GP Block,</div>
                            <div>Sector V, Bidhannagar,</div>
                            <div>Kolkata, 700091</div>
                            <div>West Bengal, India</div>
                        </div>
                    </div>
                </div>
            </div>

            <hr className="text-[1px]"/>

            <div className="mt-5">
                <p className="footer-text">© 2026 E-Shop. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;