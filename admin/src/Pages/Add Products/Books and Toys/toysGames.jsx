import React, { useState, useEffect } from 'react'

const ToysAndGames = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        categoryType: '',       // e.g. Action Figure, Board Game, Puzzle, Doll, STEM Kit
        ageGroup: '',           // e.g. 3+ Years, 8-12 Years, Toddlers, Teens
        material: '',           // e.g. Plastic, Wood, Plush, Non-Toxic, Recycled (Added for 3rd line)
        skillSet: '',           // e.g. Motor Skills, Creativity, Strategy, Social Skills (Added for 4th line)
        
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
                
                {/* Line 1: Toy Category */}
                <div className='mt-5'>
                    <label htmlFor="categoryType" className="block mb-2.5 text-sm font-medium text-heading">Category / Type:</label>
                    <input type="text" name="categoryType" onChange={handleChange} id="categoryType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Action Figure, Board Game, Puzzle, STEM Kit"/>
                </div>

                {/* Line 2: Age Group */}
                <div className='mt-5'>
                    <label htmlFor="ageGroup" className="block mb-2.5 text-sm font-medium text-heading">Age Recommendation:</label>
                    <input type="text" name="ageGroup" onChange={handleChange} id="ageGroup" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 3+ Years, 8-12 Years, Toddlers, Teens"/>
                </div>

                {/* Line 3: Material / Build */}
                <div className='mt-5'>
                    <label htmlFor="material" className="block mb-2.5 text-sm font-medium text-heading">Material / Safety:</label>
                    <input type="text" name="material" onChange={handleChange} id="material" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Non-Toxic Plastic, Sustainable Wood, Plush"/>
                </div>

                {/* Line 4: Skill Set / Educational Value */}
                <div className='mt-5'>
                    <label htmlFor="skillSet" className="block mb-2.5 text-sm font-medium text-heading">Skill Set / Benefit:</label>
                    <input type="text" name="skillSet" onChange={handleChange} id="skillSet" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Fine Motor Skills, Critical Thinking, Creativity"/>
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

export default ToysAndGames;