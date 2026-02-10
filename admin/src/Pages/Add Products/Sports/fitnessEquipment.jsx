import React, { useState, useEffect } from 'react'

const FitnessEquipment = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        productType: '',   // e.g. Treadmill, Dumbbell, Yoga Mat, Resistance Band
        material: '',      // e.g. Alloy Steel, Rubber, PVC, Foam (Added for 2nd line)
        maxWeightLoad: '', // e.g. 120kg, 50lbs, Medium Resistance (Added for 3rd line)
        features: '',      // e.g. Foldable, Adjustable Weight, Non-Slip
        //market info
        sku:'',
        stockLevel:'',
        taxClass:'',
        shippingClass:'',
        basePrice:'',
        discount:''
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
            <label htmlFor="productType" className="block mb-2.5 text-sm font-medium text-heading">Product Type:</label>
            <input type="text" name="productType" onChange={handleChange} id="productType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Treadmill, Dumbbell, Yoga Mat"/>
        </div>

        {/* Line 2: Material (Added for layout balance) */}
        <div className='mt-5'>
            <label htmlFor="material" className="block mb-2.5 text-sm font-medium text-heading">Material / Build:</label>
            <input type="text" name="material" onChange={handleChange} id="material" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Alloy Steel, Cast Iron, High-Density Foam"/>
        </div>

        {/* Line 3: Max Load / Resistance (Added for layout balance) */}
        <div className='mt-5'>
            <label htmlFor="maxWeightLoad" className="block mb-2.5 text-sm font-medium text-heading">Max Load / Resistance:</label>
            <input type="text" name="maxWeightLoad" onChange={handleChange} id="maxWeightLoad" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 120kg User Weight, 50lbs, Heavy Resistance"/>
        </div>

        {/* Line 4: Features */}
        <div className='mt-5'>
            <label htmlFor="features" className="block mb-2.5 text-sm font-medium text-heading">Key Features:</label>
            <input type="text" name="features" onChange={handleChange} id="features" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Foldable, LCD Monitor, Adjustable, Non-Slip"/>
        </div>
      </div>

      {/* --- Market Info Section --- */}
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

export default FitnessEquipment