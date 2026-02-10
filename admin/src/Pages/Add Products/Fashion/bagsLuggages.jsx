import React, { useState, useEffect } from 'react'

const BagsLuggages = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        type: '',
        material: '',
        capacity: '',
        occasion: '',
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
        
        {/* Line 1: Type */}
        <div className='mt-5'>
            <label htmlFor="type" className="block mb-2.5 text-sm font-medium text-heading">Bag Type:</label>
            <input type="text" name="type" onChange={handleChange} id="type" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Backpack, Handbag, Trolley"/>
        </div>

        {/* Line 2: Material */}
        <div className='mt-5'>
            <label htmlFor="material" className="block mb-2.5 text-sm font-medium text-heading">Material:</label>
            <input type="text" name="material" onChange={handleChange} id="material" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Leather, Polyester, Polycarbonate"/>
        </div>

        {/* Line 3: Capacity (Added for layout balance) */}
        <div className='mt-5'>
            <label htmlFor="capacity" className="block mb-2.5 text-sm font-medium text-heading">Capacity / Size:</label>
            <input type="text" name="capacity" onChange={handleChange} id="capacity" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 25L, Cabin Size, Medium"/>
        </div>

        {/* Line 4: Occasion */}
        <div className='mt-5'>
            <label htmlFor="occasion" className="block mb-2.5 text-sm font-medium text-heading">Occasion:</label>
            <input type="text" name="occasion" onChange={handleChange} id="occasion" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Travel, Office, Casual"/>
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

export default BagsLuggages