import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IoStorefront, IoAdd } from "react-icons/io5";

import { addProduct } from '../../service/api';

import Mobiles from './Electronics/mobiles';
import Laptops from './Electronics/laptops';
import Tablets from './Electronics/tablets';
import Cameras from './Electronics/cameras';
import AudioDevices from './Electronics/audioDevices';
import MenTopWear from './Fashion/menTopWear';
import MenBottomWear from './Fashion/menBottomWear';
import WomenTopWear from './Fashion/womenTopWear';
import WomenBottomWear from './Fashion/womenBottomWear';
import MenFootwear from './Fashion/menFootwear';
import WomenFootwear from './Fashion/womenFootwear';
import BagsLuggages from './Fashion/bagsLuggages';
import Kids from './Fashion/kids';
import KitchenAppliances from './Home Appliances/kitchenAppliances';
import LargeAppliances from './Home Appliances/largeAppliances';
import SmallAppliances from './Home Appliances/smallAppliances';
import HomeComfort from './Home Appliances/homeComfort';
import FitnessEquipment from './Sports/fitnessEquipment';
import OutdoorGames from './Sports/outdoorGames';
import IndoorGames from './Sports/indoorGames';
import Bedroom from './Furniture/bedroomProduct';
import LivingRoom from './Furniture/livingroomProduct';
import DiningRoom from './Furniture/diningroomProduct';
import OfficeFurniture from './Furniture/officeFurniture';
import Makeup from './Beauty and Health/makeup';
import HairCare from './Beauty and Health/hairCare';
import SkinCare from './Beauty and Health/skinCare';
import Books from './Books and Toys/Books';
import ToysAndGames from './Books and Toys/toysGames';

const SubCategoryComponents = {
  'Mobiles': Mobiles,
  'Laptops': Laptops,
  'Tablets': Tablets,
  'Cameras': Cameras,
  'Audio Devices': AudioDevices,
  'Men\'s Top-Wear': MenTopWear,
  'Men\'s Bottom-Wear': MenBottomWear,
  'Women\'s Top-Wear': WomenTopWear,
  'Women\'s Bottom-Wear': WomenBottomWear,
  'Men\'s Footwear': MenFootwear,
  'Women\'s Footwear': WomenFootwear,
  'Bags and Luggages': BagsLuggages,
  'Kids': Kids,
  'Kitchen Appliances': KitchenAppliances,
  'Large Appliances': LargeAppliances,
  'Small Appliances': SmallAppliances,
  'Home Comforts': HomeComfort,
  'Fitness Equipment': FitnessEquipment,
  'Outdoor Sports': OutdoorGames,
  'Indoor Games': IndoorGames,
  'Bedroom': Bedroom,
  'Living Room': LivingRoom,
  'Dining Room': DiningRoom,
  'Office Furniture': OfficeFurniture,
  'Makeup': Makeup,
  'Hair Care': HairCare,
  'Skin Care': SkinCare,
  'Books': Books,
  'Toys and Games': ToysAndGames,
};

const taxonomy = {
  Electronics: ['Mobiles', 'Laptops', 'Tablets', 'Cameras', 'Audio Devices'],
  Fashion: ['Men\'s Top-Wear', 'Men\'s Bottom-Wear', 'Women\'s Top-Wear', 'Women\'s Bottom-Wear', 'Men\'s Footwear', 'Women\'s Footwear', 'Bags and Luggages', 'Kids'],
  HomeAppliaces: ['Kitchen Appliances', 'Large Appliances', 'Small Appliances', 'Home Comforts'],
  Furniture: ['Living Room', 'Bedroom', 'Office Furniture', 'Dining Room'],
  BooksToys: ['Books', 'Toys and Games'],
  Sports: ['Fitness Equipment', 'Outdoor Sports', 'Indoor Games'],
  BeautyHealth: ['Makeup', 'Skin Care', 'Hair Care'],
};

const AddProducts = () => {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files) {

        const filesArray = Array.from(e.target.files).map((file) => ({
            file: file,
            url: URL.createObjectURL(file)
        }));

        setImages((prevImages) => {
            const updatedImages = [...prevImages, ...filesArray];
            
            if (!previewImage && updatedImages.length > 0) {
                setPreviewImage(updatedImages[0].url);
            }
            return updatedImages;
        });
    }
  };

  const [product, setProduct] = useState({
        name:'',
        brand:'',
        description:'',
  });

  const [extraFormData, setExtraFormData] = useState({});

  const onValueChange = (e) =>{
        setProduct({...product, [e.target.name] : e.target.value});
        console.log(product);
  }

  const handleExtraDataChange = (newData) => {
    setExtraFormData(newData);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(''); 
    setExtraFormData({});
  };

  const handleSubCategoryChange = (e) => {
    setSubCategory(e.target.value);
    setExtraFormData({});
  };

  const submitData = async (e) =>{
        e.preventDefault();

        if(!product.name){
            alert("Enter Product Name");
            return;
        } else if (images.length === 0) { 
            alert("Please upload at least one image");
            return;
        } else if(!category){
            alert("Select Category");
            return;
        } else if(!subCategory){
            alert("Select Sub-Category");
            return;
        }

        if (Object.keys(extraFormData).length === 0) {
            alert(`Please fill in the details for ${subCategory}`);
            return;
        }

        const hasEmptyFields = Object.values(extraFormData).some(
            (value) => value === null || value === undefined
        );

        if (hasEmptyFields) {
            alert("Please fill ALL Basic Info and Market Info fields.");
            return;
        }


        const formData = new FormData();        
        images.forEach((img) => {
          formData.append('images', img.file); 
        });
        formData.append('name', product.name);
        formData.append('brand', product.brand);
        formData.append('description', product.description || '');
        formData.append('category', category);
        formData.append('subCategory', subCategory);
        formData.append('orders', JSON.stringify([]));

        if (extraFormData.basePrice) {
            formData.append('price', extraFormData.basePrice);
        }
        if (extraFormData.stockLevel) {
            formData.append('stock', extraFormData.stockLevel);
        }
        if (extraFormData.discount) {
            formData.append('discount', extraFormData.discount);
        }
        if (extraFormData.taxClass) {
            formData.append('taxClass', extraFormData.taxClass);
        }

        Object.keys(extraFormData).forEach((key) => {
             if (key !== 'price' && key !== 'stock' && key !== 'discount' && key !== 'taxClass') {
                 formData.append(key, extraFormData[key]);
             }
        });

        console.log("Submitting the following:");
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ': ' + pair[1]); 
        }
        try {
            const res = await addProduct(formData);
            if(res.status === 201){
              alert("Product Added Successfully!");
              setCategory('');
              setSubCategory(''); 
              setProduct(null)
            } else {
                alert(res.message || "Product added successfully (check backend response)");
            }
        }catch (error) {
             console.error("Add Product Error:", error);
             alert("Failed to add product. See console for details.");
        }
  }

  const ActiveComponent = subCategory ? SubCategoryComponents[subCategory] : null;

  return (
    <>
    <div className='flex items-center justify-between pl-5 pr-5 mt-5'>
      <div className='flex items-center gap-2'><IoStorefront className='w-7 h-7'/><b className='text-[24px]'>Add New Product</b></div>
      <button type='button' className='rounded-full font-medium text-sm px-4 py-2.5 bg-[#afcbff] hover:bg-[#3F9BBF]' onClick={submitData}>Add Product</button>
    </div>
    <div className='flex items-center justify-between pl-5 pr-5 mt-10 gap-3 h-max'>
      <div className='w-[60%] bg-[#f1f1f1] px-4 rounded-md py-3'>
        <b className='text-[20px]'>General Information</b>
        <div className='mt-5'>
            <label htmlFor="name" className="block mb-2.5 text-sm font-medium text-heading">Product Name</label>
            <input type="text" name="name" id="name" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required onChange={onValueChange} />
        </div>
        <div className='mt-5'>
            <label htmlFor="brand" className="block mb-2.5 text-sm font-medium text-heading">Brand</label>
            <input type="text" name="brand" id="brand" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required onChange={onValueChange} />
        </div>
        <div className='mt-5'>
            <label htmlFor="description" className="block mb-2.5 text-sm font-medium text-heading">Product Description</label>
            <textarea id="description" name="description" rows="4" className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full p-3 shadow-xs placeholder:text-body" placeholder="" onChange={onValueChange}></textarea>
        </div>
        <div className='mt-5 flex items-center justify-between gap-5'>
          <div className='mt-5 w-[50%]'>
            <label htmlFor='category' className="block mb-2.5 text-sm font-medium text-heading">Choose Category:</label>
            <FormControl fullWidth className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body">
              <InputLabel id="category-label">Category</InputLabel>
              <Select value={category} onChange={handleCategoryChange}>
                  {Object.keys(taxonomy).map(key => <MenuItem key={key} value={key}>{key}</MenuItem>)}
               </Select>
            </FormControl>
          </div>
          <div className='mt-5 w-[50%]'>
            <label htmlFor='sub-category' className="block mb-2.5 text-sm font-medium text-heading">Choose Sub-Category:</label>
            <FormControl fullWidth disabled={!category} className="bg-[#e3e3e3] text-heading text-sm rounded-md focus:ring-[#e3e3e3] focus:border-[#e3e3e3] w-full px-3 py-2.5 shadow-xs placeholder:text-body"> 
              <InputLabel id="subcategory-label">Sub Category</InputLabel>
              <Select value={subCategory} onChange={handleSubCategoryChange}>
                  {category && taxonomy[category].map(sub => <MenuItem key={sub} value={sub}>{sub}</MenuItem>)}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
      <div className='w-[40%] bg-[#f1f1f1] px-4 rounded-md py-3 flex flex-col gap-4'>
        <b className='text-[20px]'>Upload Images</b>
        <div className='w-full h-[320px] bg-[#e3e3e3] rounded-xl flex items-center justify-center overflow-hidden p-2'>
          {previewImage ? (
            <img 
              src={previewImage} 
              alt="Product Preview" 
              className='w-full h-full object-contain' 
            />
          ) : (
            <span className='text-gray-400 font-medium'>No Image Selected</span>
          )}
        </div>

        <div className='flex items-center gap-3 mt-2 overflow-x-auto py-2 px-1'>
    
          {images.map((img, index) => (
            <div 
              key={index}
              onClick={() => setPreviewImage(img.url)}
              className={`min-w-[90px] h-[90px] rounded-lg overflow-hidden cursor-pointer border-2 transition-all 
              ${previewImage === img.url ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
            >
              <img src={img.url} alt={`thumb-${index}`} className='w-full h-full object-cover' />
            </div>
          ))}

          <label htmlFor="image-upload" className='min-w-[90px] h-[90px] border-2 border-dashed border-[#d1d5db] rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors'>
            <div className='w-8 h-8 bg-[#86efac] rounded-full flex items-center justify-center text-white'>
              <IoAdd className="text-xl"/>
            </div>
            <input 
            type="file" 
            id="image-upload" 
            multiple 
            accept="image/*"
            className="hidden" 
            onChange={handleImageChange} 
            />
          </label>

        </div>
      </div>
    </div>
    <div className='w-full pl-5 pr-5 mt-5'>
      {ActiveComponent ? (
        <ActiveComponent onDataChange={handleExtraDataChange} />
      ) : (
        subCategory && <div className="text-red-500">Form for {subCategory} not created yet.</div>
      )}
    </div>
    </>
  )
}

export default AddProducts