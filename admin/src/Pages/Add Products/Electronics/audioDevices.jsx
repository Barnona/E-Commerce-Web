import React, { useState, useEffect } from 'react'

const AudioDevices = ({ onDataChange }) => {

    const [details, setDetails] = useState({
        type: '', // e.g., Headphones, Earbuds, Neckband
        driverSize: '',
        bluetoothVersion: '',
        connectivity: '',
        noiseCancellation: '', // Yes/No or Type
        noiseCancellationValue: '', // e.g., 35dB
        playbackTime: '',
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
        
        {/* Line 1: Type & Driver Size */}
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[50%]'>
                <label htmlFor="type" className="block mb-2.5 text-sm font-medium text-heading">Type:</label>
                <input type="text" name="type" onChange={handleChange} id="type" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. TWS Earbuds, Over-Ear"/>
            </div>
            <div className='w-[50%]'>
                <label htmlFor="driverSize" className="block mb-2.5 text-sm font-medium text-heading">Driver Size:</label>
                <input type="text" name="driverSize" onChange={handleChange} id="driverSize" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 12mm Dynamic"/>
            </div>
        </div>

        {/* Line 2: Bluetooth & Connectivity */}
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[50%]'>
                <label htmlFor="bluetoothVersion" className="block mb-2.5 text-sm font-medium text-heading">Bluetooth Version:</label>
                <input type="text" name="bluetoothVersion" onChange={handleChange} id="bluetoothVersion" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. v5.3"/>
            </div>
            <div className='w-[50%]'>
                <label htmlFor="connectivity" className="block mb-2.5 text-sm font-medium text-heading">Connectivity:</label>
                <input type="text" name="connectivity" onChange={handleChange} id="connectivity" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Wireless / Wired / Hybrid"/>
            </div>
        </div>

        {/* Line 3: Noise Cancellation & Value */}
        <div className='mt-5 flex items-center gap-5'>
            <div className='w-[50%]'>
                <label htmlFor="noiseCancellation" className="block mb-2.5 text-sm font-medium text-heading">Noise Cancellation:</label>
                <input type="text" name="noiseCancellation" onChange={handleChange} id="noiseCancellation" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. Active (ANC) / Passive"/>
            </div>
            <div className='w-[50%]'>
                <label htmlFor="noiseCancellationValue" className="block mb-2.5 text-sm font-medium text-heading">ANC Depth:</label>
                <input type="text" name="noiseCancellationValue" onChange={handleChange} id="noiseCancellationValue" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 45 dB"/>
            </div>
        </div>

        {/* Line 4: Playback Time (Full Width) */}
        <div className='mt-5'>
            <label htmlFor="playbackTime" className="block mb-2.5 text-sm font-medium text-heading">Playback Time:</label>
            <input type="text" name="playbackTime" onChange={handleChange} id="playbackTime" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="e.g. 50 Hours (with Case)"/>
        </div>
      </div>

      {/* --- Market Info Section (Same as Previous) --- */}
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

export default AudioDevices