import React, { useState, useEffect } from 'react'

const SkinCare = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        productType: '',        // e.g. Moisturizer, Serum, Cleanser, Toner, Sunscreen
        skinType: '',           // e.g. Oily, Dry, Combination, Sensitive, All Skin Types
        concern: '',            // e.g. Acne, Anti-Aging, Brightening, Hydration (Added for 3rd line)
        ingredients: '',        // e.g. Vitamin C, Retinol, Hyaluronic Acid, Salicylic Acid (Added for 4th line)
        
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
                
                {/* Line 1: Product Type */}
                <div className='mt-5'>
                    <label htmlFor="productType" className="block mb-2.5 text-sm font-medium text-heading">Product Type / Category:</label>
                    <input type="text" name="productType" onChange={handleChange} id="productType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Moisturizer, Serum, Cleanser, Sunscreen"/>
                </div>

                {/* Line 2: Skin Type Compatibility */}
                <div className='mt-5'>
                    <label htmlFor="skinType" className="block mb-2.5 text-sm font-medium text-heading">Suitable Skin Type:</label>
                    <input type="text" name="skinType" onChange={handleChange} id="skinType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Oily, Dry, Combination, Sensitive, All Types"/>
                </div>

                {/* Line 3: Target Concern */}
                <div className='mt-5'>
                    <label htmlFor="concern" className="block mb-2.5 text-sm font-medium text-heading">Target Concern / Benefit:</label>
                    <input type="text" name="concern" onChange={handleChange} id="concern" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Acne Control, Anti-Aging, Brightening, Hydration"/>
                </div>

                {/* Line 4: Key Ingredients */}
                <div className='mt-5'>
                    <label htmlFor="ingredients" className="block mb-2.5 text-sm font-medium text-heading">Key Ingredients / Actives:</label>
                    <input type="text" name="ingredients" onChange={handleChange} id="ingredients" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Vitamin C, Retinol, Hyaluronic Acid, Niacinamide"/>
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

export default SkinCare;