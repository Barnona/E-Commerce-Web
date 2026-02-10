import React, { useState, useEffect } from 'react'

const Makeup = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        makeupType: '',         // e.g. Face Makeup, Eye Makeup, Lip Makeup
        makeupName: '',         // e.g. CC Cream, Foundation, Mascara, Lipstick
        finish: '',             // e.g. Matte, Dewy, Satin, Natural, Shimmer (Added for 3rd line)
        skinType: '',           // e.g. All Skin Types, Oily, Dry, Sensitive (Added for 4th line)
        
        // --- Market Info (Standard) ---
        sku: '',
        stockLevel: '',
        taxClass: '',
        shippingClass: '',
        basePrice: '',
        discount: ''
    });

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        onDataChange(details);
    }, [details]);

    return (
        <div className='flex items-center gap-3'>
            {/* --- Basic Info Section --- */}
            <div className='w-[60%] bg-[#f1f1f1] px-4 rounded-md py-3'>
                <b className='text-[20px]'>Basic Info</b>
                
                {/* Line 1: Makeup Type */}
                <div className='mt-5'>
                    <label htmlFor="makeupType" className="block mb-2.5 text-sm font-medium text-heading">Makeup Type / Category:</label>
                    <input type="text" name="makeupType" onChange={handleChange} id="makeupType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Face Makeup, Eye Makeup, Lip Makeup"/>
                </div>

                {/* Line 2: Makeup Name / Sub-Type */}
                <div className='mt-5'>
                    <label htmlFor="makeupName" className="block mb-2.5 text-sm font-medium text-heading">Product Sub-Type:</label>
                    <input type="text" name="makeupName" onChange={handleChange} id="makeupName" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. CC Cream, Liquid Foundation, Volumizing Mascara"/>
                </div>

                {/* Line 3: Finish */}
                <div className='mt-5'>
                    <label htmlFor="finish" className="block mb-2.5 text-sm font-medium text-heading">Finish:</label>
                    <input type="text" name="finish" onChange={handleChange} id="finish" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Matte, Dewy, Satin, Natural, Shimmer"/>
                </div>

                {/* Line 4: Skin Type / Compatibility */}
                <div className='mt-5'>
                    <label htmlFor="skinType" className="block mb-2.5 text-sm font-medium text-heading">Skin Type / Concern:</label>
                    <input type="text" name="skinType" onChange={handleChange} id="skinType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. All Skin Types, Oily, Dry, Sensitive"/>
                </div>
            </div>

            {/* --- Market Info Section (Standard) --- */}
            <div className='w-[40%] bg-[#f1f1f1] px-4 rounded-md py-3'>
                <b className='text-[20px]'>Market Info</b>
                <div className='mt-5 flex items-center gap-5'>
                    <div className='w-[50%]'>
                        <label htmlFor="SKU" className="block mb-2.5 text-sm font-medium text-heading">SKU:</label>
                        <input type="text" name="sku" onChange={handleChange} id="SKU" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder=""/>
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="stockLevel" className="block mb-2.5 text-sm font-medium text-heading">Stock Level:</label>
                        <input type="text" name="stockLevel" onChange={handleChange} id="stockLevel" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder=""/>
                    </div>
                </div>
                <div className='mt-5'>
                    <label htmlFor="taxClass" className="block mb-2.5 text-sm font-medium text-heading">Tax Class:</label>
                    <input type="text" name="taxClass" onChange={handleChange} id="taxClass" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder=""/>
                </div>
                <div className='mt-5'>
                    <label htmlFor="shippingClass" className="block mb-2.5 text-sm font-medium text-heading">Shipping Class:</label>
                    <input type="text" name="shippingClass" onChange={handleChange} id="shippingClass" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder=""/>
                </div>
                <div className='mt-5 flex items-center gap-5'>
                    <div className='w-[50%]'>
                        <label htmlFor="basePrice" className="block mb-2.5 text-sm font-medium text-heading">Base Price:</label>
                        <input type="text" name="basePrice" onChange={handleChange} id="basePrice" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder=""/>
                    </div>
                    <div className='w-[50%]'>
                        <label htmlFor="discount" className="block mb-2.5 text-sm font-medium text-heading">Discount:</label>
                        <input type="text" name="discount" onChange={handleChange} id="discount" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Makeup;