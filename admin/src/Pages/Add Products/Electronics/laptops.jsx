import React, { useState, useEffect } from 'react'

const Laptops = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        ram: '',
        ramType: '',
        ssd:'',
        hdd:'',
        processorBrand:'',
        processor: '',
        processorGen:'',
        processorModel:'',
        displaySize:'',
        displayType:'',
        graphicsMemory:'',
        gpuSeries:'',
        gpuName:'',
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
      <div className='w-[60%] bg-[#f1f1f1] px-4 rounded-md py-3'>
        <b className='text-[20px]'>Basic Info</b>
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[25%]'>
                <label htmlFor="ram" className="block mb-2.5 text-sm font-medium text-heading">RAM:</label>
                <input type="text" name="ram" onChange={handleChange} id="ram" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 8 GB"/>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="ramType" className="block mb-2.5 text-sm font-medium text-heading">RAM Type:</label>
                <input type="text" name="ramType" onChange={handleChange} id="ramType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. DDR4"/>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="ssd" className="block mb-2.5 text-sm font-medium text-heading">SSD:</label>
                <input type="text" name="ssd" onChange={handleChange} id="ssd" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 256 GB"/>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="hdd" className="block mb-2.5 text-sm font-medium text-heading">HDD:</label>
                <input type="text" name="hdd" onChange={handleChange} id="hdd" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 1 TB"/>
            </div>
        </div>
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[50%]'>
                <label htmlFor="displaySize" className="block mb-2.5 text-sm font-medium text-heading">Display Size:</label>
                <input type="text" name="displaySize" onChange={handleChange} id="displaySize" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 15.6 inches"/>
            </div>
            <div className='w-[50%]'>
                <label htmlFor="displayType" className="block mb-2.5 text-sm font-medium text-heading">Display Type:</label>
                <input type="text" name="displayType" onChange={handleChange} id="displayType" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. LCD"/>
            </div>
        </div>
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[25%]'>
                <label htmlFor="processorBrand" className="block mb-2.5 text-sm font-medium text-heading">Processor Brand:</label>
                <input type="text" name="processorBrand" onChange={handleChange} id="processorBrand" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. AMD, Intel"/>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="processor" className="block mb-2.5 text-sm font-medium text-heading">Processor:</label>
                <input type="text" name="processor" onChange={handleChange} id="processor" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Ryzen 3, core i3"/>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="processorGen" className="block mb-2.5 text-sm font-medium text-heading">Processor Gen:</label>
                <input type="text" name="processorGen" onChange={handleChange} id="processorGen" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 11th Gen"/>
            </div>
            <div className='w-[25%]'>
                <label htmlFor="processorModel" className="block mb-2.5 text-sm font-medium text-heading">Processor Model:</label>
                <input type="text" name="processorModel" onChange={handleChange} id="processorModel" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 1115G4"/>
            </div>
        </div>
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[34%]'>
                <label htmlFor="graphicsMemory" className="block mb-2.5 text-sm font-medium text-heading">Graphics Memory:</label>
                <input type="text" name="graphicsMemory" onChange={handleChange} id="graphicsMemory" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Integrated Graphics Card"/>
            </div>
            <div className='w-[33%]'>
                <label htmlFor="gpuSeries" className="block mb-2.5 text-sm font-medium text-heading">GPU Series:</label>
                <input type="text" name="gpuSeries" onChange={handleChange} id="gpuSeries" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. NVIDIA GeForce RTX Series"/>
            </div>
            <div className='w-[33%]'>
                <label htmlFor="gpuName" className="block mb-2.5 text-sm font-medium text-heading">GPU Name:</label>
                <input type="text" name="gpuName" onChange={handleChange} id="gpuName" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. NVIDIA GeForce RTX 2050"/>
            </div>
        </div>
      </div>
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

export default Laptops