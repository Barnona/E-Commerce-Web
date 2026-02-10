import React, { useState, useEffect } from 'react'

const MenTopWear = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        dressType: '', // e.g. Shirt, T-Shirt, Jacket
        fabric: '',
        sleeveLength: '',
        fit: '', // e.g. Slim, Regular
        closureType: '', // e.g. Button, Zipper, Pullover
        occasion: '', // e.g. Casual, Formal
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
        
        {/* Line 1: Dress Type & Fabric */}
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[50%]'>
                <label htmlFor="dressType" className="block mb-2.5 text-sm font-medium text-heading">Dress Type:</label>
                <input type="text" name="dressType" onChange={handleChange} id="dressType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. T-Shirt, Casual Shirt"/>
            </div>
            <div className='w-[50%]'>
                <label htmlFor="fabric" className="block mb-2.5 text-sm font-medium text-heading">Fabric:</label>
                <input type="text" name="fabric" onChange={handleChange} id="fabric" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Cotton, Polyester"/>
            </div>
        </div>

        {/* Line 2: Sleeve Length & Fit */}
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[50%]'>
                <label htmlFor="sleeveLength" className="block mb-2.5 text-sm font-medium text-heading">Sleeve Length:</label>
                <input type="text" name="sleeveLength" onChange={handleChange} id="sleeveLength" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Long Sleeve, Half Sleeve"/>
            </div>
            <div className='w-[50%]'>
                <label htmlFor="fit" className="block mb-2.5 text-sm font-medium text-heading">Fit:</label>
                <input type="text" name="fit" onChange={handleChange} id="fit" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Slim Fit, Regular Fit"/>
            </div>
        </div>

        {/* Line 3: Closure Type (Full Width) */}
        <div className='mt-5'>
            <label htmlFor="closureType" className="block mb-2.5 text-sm font-medium text-heading">Closure Type:</label>
            <input type="text" name="closureType" onChange={handleChange} id="closureType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Button, Zipper, Pullover"/>
        </div>

        {/* Line 4: Occasion (Full Width) */}
        <div className='mt-5'>
            <label htmlFor="occasion" className="block mb-2.5 text-sm font-medium text-heading">Occasion:</label>
            <input type="text" name="occasion" onChange={handleChange} id="occasion" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Casual, Formal, Party"/>
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

export default MenTopWear