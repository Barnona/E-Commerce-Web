import Button from '@mui/material/Button'
import { MdDashboard } from "react-icons/md";
import { HiUsers } from "react-icons/hi2";
import { SiProducthunt } from "react-icons/si";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { HiMiniShoppingBag } from "react-icons/hi2";
import { MdHelp } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {Collapse} from 'react-collapse';
import "../style.css"

const SideBarSettings = () => {
    const [menuIndex, setIndex] = useState(null);
    const isOpen = (index) =>{
        if(menuIndex===index){
            setIndex(null);
        }else{
            setIndex(index);
        }
    }
  return (
    <div className='sideBar fixed top-0 left-0 w-[14%] h-full bg-[#fff] py-2 px-2 border-r border-blue-300 z-100'>
      <div className="logo ">
            <Link to="/">
                 <h2 className="text-3xl font-bold text-blue-900 mx-2 my-2">E-Shop</h2>
            </Link>
        </div>
        <ul className='my-10'>
            <li className='hover:bg-[#afcbff]'>
                <Link to={"/"}>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                    <MdDashboard className='w-5 h-5 flex items-center'/><span className='items-center'>Dashboard</span>
                </Button>
                </Link>
            </li>
            <li className='hover:bg-[#afcbff]'>
                <Link to={"/users"}>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                    <HiUsers className='w-5 h-5 flex items-center'/><span className='items-center'>Users</span>
                </Button>
                </Link>
            </li>
            <li className='hover:bg-[#afcbff]'>
                <Link to={"/products"}>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                    <SiProducthunt className='w-5 h-5 flex items-center'/><span className='items-center'>Products</span>
                </Button>
                </Link>
            </li>
            <li className='hover:bg-[#afcbff]'>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center' onClick={() => isOpen(1)}>
                    <BiSolidCategoryAlt className='w-5 h-5 flex items-center'/><span className='items-center'>Category</span>
                    <span className='w-[30px] h-[30px] flex items-center ml-auto justify-center'>
                        <IoIosArrowDown className={`w-5 h-5 transition-all ${menuIndex===1 ? 'rotate-180': ''}`}/>
                    </span>
                </Button>
                <Collapse isOpened={menuIndex===1 ? true : false}>
                    <ul>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/electronics-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Electronics
                            </Button>
                            </Link>
                        </li>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/fashion-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Fashion
                            </Button>
                            </Link>
                        </li>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/home-appliances-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Home Appliances
                            </Button>
                            </Link>
                        </li>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/furniture-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Furniture
                            </Button>
                            </Link>
                        </li>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/books-toys-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Books & Toys
                            </Button>
                            </Link>
                        </li>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/sports-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Sports
                            </Button>
                            </Link>
                        </li>
                        <li className='hover:bg-[#fff] pl-5'>
                            <Link to={'/beauty-health-product'}>
                            <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                                <span className='w-1 h-1 rounded-full bg-[#007bff]'/>Beauty & Health
                            </Button>
                            </Link>
                        </li>
                    </ul>
                </Collapse>
            </li>
            <li className='hover:bg-[#afcbff]'>
                <Link to={'/orders'}>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                    <HiMiniShoppingBag className='w-5 h-5 flex items-center'/><span className='items-center'>Orders</span>
                </Button>
                </Link>
            </li>
        </ul>
        <hr/>
        <ul className='mt-10'>
            <li className='hover:bg-[#afcbff]'>
                <Link to={'/help'}>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center]'>
                    <MdHelp className='w-5 h-5 flex items-center'/><span className='items-center'>Help</span>
                </Button>
                </Link>
            </li>
            <li className='bg-[#afcbff]'>
                <Link to={'/settings'}>
                <Button className='w-full h-12 !justify-start !capitalize flex items-center gap-3 text-[16px] !font-[700] items-center'>
                    <IoSettingsSharp className='w-5 h-5 flex items-center'/><span className='items-center'>Settings</span>
                </Button>
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default SideBarSettings