import React, { useState, useEffect } from 'react'

const Bedroom = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        furnitureType: '',      // e.g. Bed Frame, Wardrobe, Nightstand, Dresser
        structureMaterial: '',  // e.g. Solid Oak, Engineered Wood, Metal, Upholstered
        style: '',              // e.g. Modern, Minimalist, Vintage, Industrial (Added for 3rd line)
        features: '',           // e.g. Storage Drawers, LED Lighting, Adjustable Headrest
        
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
                
                {/* Line 1: Furniture Type */}
                <div className='mt-5'>
                    <label htmlFor="furnitureType" className="block mb-2.5 text-sm font-medium text-heading">Furniture Type:</label>
                    <input type="text" name="furnitureType" onChange={handleChange} id="furnitureType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Bed Frame, Wardrobe, Nightstand"/>
                </div>

                {/* Line 2: Structure Material */}
                <div className='mt-5'>
                    <label htmlFor="structureMaterial" className="block mb-2.5 text-sm font-medium text-heading">Structure Material:</label>
                    <input type="text" name="structureMaterial" onChange={handleChange} id="structureMaterial" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Solid Oak, Engineered Wood, Metal, Upholstered"/>
                </div>

                {/* Line 3: Style / Design */}
                <div className='mt-5'>
                    <label htmlFor="style" className="block mb-2.5 text-sm font-medium text-heading">Style / Design:</label>
                    <input type="text" name="style" onChange={handleChange} id="style" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Modern, Minimalist, Vintage, Industrial"/>
                </div>

                {/* Line 4: Special Features */}
                <div className='mt-5'>
                    <label htmlFor="features" className="block mb-2.5 text-sm font-medium text-heading">Key Features:</label>
                    <input type="text" name="features" onChange={handleChange} id="features" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Storage Drawers, LED Lighting, Adjustable Headrest"/>
                </div>
            </div>

            {/* --- Market Info Section (Same as OutdoorGames) --- */}
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

export default Bedroom;