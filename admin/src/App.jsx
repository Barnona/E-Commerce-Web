import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Header from './components/header'
import SideBar from './components/sideBars/sideBar'
import SideBarUsers from './components/sideBars/sideBarUsers'
import SideBarProducts from './components/sideBars/sideBarProducts'
import SideBarElectronics from './components/sideBars/sideBarElectronics'
import SideBarFashion from './components/sideBars/sideBarFashion'
import SideBarHomeAppliances from './components/sideBars/sideBarHomeAppliances'
import SideBarFurniture from './components/sideBars/sideBarFurniture'
import SideBarBooksToys from './components/sideBars/sideBarBooksToys'
import SideBarSports from './components/sideBars/sideBarSports'
import SideBarBeautyHealth from './components/sideBars/sideBarBeautyHealth'
import SideBarSettings from './components/sideBars/sideBarSettings'
import SideBarHelp from './components/sideBars/sideBarHelp'
import SideBarOrders from './components/sideBars/sideBarOrders'
import Dashboard from './Pages/Dashboard/Dashboard'
import Users from './Pages/Users/users'
import Products from './Pages/Products/products'
import Electronics from './Pages/Category/Electronics/electronics'
import Fashion from './Pages/Category/Fashion/fashion'
import HomAppliances from './Pages/Category/Home Appliances/homeAppliances'
import Furniture from './Pages/Category/Furniture/furniture'
import BooksToys from './Pages/Category/Books & Toys/BooksToys'
import Sports from './Pages/Category/Sports/sports'
import BeautyHealth from './Pages/Category/Beauty & Health/beautyHealth'
import AddProducts from './Pages/Add Products/addProducts'
import SignIn from './Pages/Login/login'
import SignUp from './Pages/Sign Up/signUp'
import ForgotPassword from './Pages/Forgot Password/forgotPassword'
import ResetPassword from './Pages/Forgot Password/resetPassword'
import Settings from './Pages/Settings/settings'
import Help from './Pages/Help Center/helpCenter'
import Orders from './Pages/Orders/orders'

import './App.css'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[14%]'>
              <SideBar/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Dashboard/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/users",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarUsers/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Users/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/products",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarProducts/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Products/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/electronics-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarElectronics/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Electronics/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/fashion-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarFashion/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Fashion/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/home-appliances-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarHomeAppliances/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <HomAppliances/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/furniture-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarFurniture/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Furniture/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/books-toys-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarBooksToys/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <BooksToys/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/sports-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarSports/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Sports/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/beauty-health-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarBeautyHealth/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <BeautyHealth/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/products/add-product",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarProducts/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <AddProducts/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/orders",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarOrders/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Orders/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/help",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarHelp/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Help/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/settings",
      element: (
        <section className='main'>
          <Header/>
          <div className='containMain flex'>
            <div className='sidebarWrapper w-[15%]'>
              <SideBarSettings/>
            </div>
            <div className='containRight py-5 px-5 w-[86%]'>
              <Settings/>
            </div>
          </div>
        </section>
      )
    },
    {
      path: "/Login",
      element: <SignIn/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    },
    {
      path: "/forgot-password",
      element: <ForgotPassword/>
    },
    {
      path: "/forgot-password/reset/:token",
      element: <ResetPassword/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
