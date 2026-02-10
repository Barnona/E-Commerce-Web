import React from 'react'
import Signup from './pages/signup/signup.jsx'
import Login from './pages/login/login.jsx'
import Setting from './pages/setting/setting.jsx'
import ForgotPassword from './pages/forgot password/forgotPassword.jsx'
import ResetPassword from './pages/forgot password/resetPassword.jsx'
import SearchResult from './components/searchResult.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Cart from './components/Cart/Cart.jsx'
import Orders from './components/Order/Orders.jsx'
import OrderDetails from "./components/Order/orderDetails.jsx";
import Wishlist from './components/Wishlist/Wishlist.jsx'
import Checkout from './components/checkOut/checkOut.jsx'
import ProductDetails from './components/ProductDetails/ProductDetails.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Mobiles from './pages/Product-by-Category/Electronics/Mobiles/Mobiles.jsx'
import Laptops from './pages/Product-by-Category/Electronics/Laptops/Laptops.jsx'
import Cameras from './pages/Product-by-Category/Electronics/Cameras/Cameras.jsx'
import Tablets from './pages/Product-by-Category/Electronics/Tablets/Tablets.jsx'
import AudioDevices from './pages/Product-by-Category/Electronics/AudioDevices/AudioDevices.jsx'
import MenTopWear from './pages/Product-by-Category/Fashion/MenTopWear/MenTopWear.jsx'
import MenBottomWear from './pages/Product-by-Category/Fashion/MenBottomWear/MenBottomWear.jsx'
import WomenTopWear from './pages/Product-by-Category/Fashion/WomenTopWear/WomenTopWear.jsx'
import WomenBottomWear from './pages/Product-by-Category/Fashion/WomenBottomWear/WomenBottomWear.jsx'
import MenFootwear from './pages/Product-by-Category/Fashion/MenFootwear/MenFootwear.jsx'
import WomenFootwear from './pages/Product-by-Category/Fashion/WomenFootwear/WomenFootwear.jsx'
import BagsLuggages from './pages/Product-by-Category/Fashion/BagsLuggages/BagsLuggages.jsx'
import Kids from './pages/Product-by-Category/Fashion/Kids/Kids.jsx'
import KitchenAppliances from './pages/Product-by-Category/HomeAppliances/KitchenAppliances/KitchenAppliances.jsx'
import LargeAppliances from './pages/Product-by-Category/HomeAppliances/LargeAppliances/LargeAppliances.jsx'
import SmallAppliances from './pages/Product-by-Category/HomeAppliances/SmallAppliances/SmallAppliances.jsx'
import HomeComforts from './pages/Product-by-Category/HomeAppliances/HomeComforts/HomeComforts.jsx'
import FitnessEquipments from './pages/Product-by-Category/Sports/FitnessEquipment/FitnessEquipments.jsx'
import OutdoorSports from './pages/Product-by-Category/Sports/OutdoorSports/OutdoorSports.jsx'
import IndoorGames from './pages/Product-by-Category/Sports/IndoorGames/IndoorGames.jsx'
import LivingRoom from './pages/Product-by-Category/Furniture/LivingRoom/LivingRoom.jsx'
import Bedroom from './pages/Product-by-Category/Furniture/Bedroom/Bedroom.jsx'
import DiningRoom from './pages/Product-by-Category/Furniture/DiningRoom/DiningRoom.jsx'
import OfficeFurniture from './pages/Product-by-Category/Furniture/OfficeFurniture/OfficeFurniture.jsx'
import Makeup from './pages/Product-by-Category/Beauty & Health/Makeup/Makeup.jsx'
import SkinCare from './pages/Product-by-Category/Beauty & Health/Skin Care/SkinCare.jsx'
import HairCare from './pages/Product-by-Category/Beauty & Health/Hair Care/HairCare.jsx'
import ToysandGames from './pages/Product-by-Category/Books & Toys/ToysandGames/ToysandGames.jsx'
import Books from './pages/Product-by-Category/Books & Toys/Books/Books.jsx'

import HelpCenter from './components/HelpCenter.jsx'

function App() {

  return (
    <>
    <Router>
      <div className="flex flex-col min-h-screen">
        
        <div className='sticky top-0 z-50 shadow-md'>
          <Header />
        </div>

        <main className="flex-grow">
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/settings' element={<Setting/>}/>
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path='/search' element={<SearchResult/>}/>
            <Route path='/helpcenter' element={<HelpCenter/>}/>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path="/orders/:orderId" element={<OrderDetails/>} />
            <Route path='/checkout' element={<Checkout/>}/>

            <Route path='/wishlist' element={<Wishlist/>}/>
            <Route path='/product/:id' element={<ProductDetails />} />

            <Route path='/Mobiles' element={<Mobiles/>}/>
            <Route path='/Laptops' element={<Laptops/>}/>
            <Route path='/Cameras' element={<Cameras/>}/>
            <Route path='/Tablets' element={<Tablets/>}/>
            <Route path='/Audio-Devices' element={<AudioDevices/>}/>
            <Route path='/Men-Top-Wear' element={<MenTopWear/>}/>
            <Route path='/Men-Bottom-Wear' element={<MenBottomWear/>}/>
            <Route path='/Women-Top-Wear' element={<WomenTopWear/>}/>
            <Route path='/Women-Bottom-Wear' element={<WomenBottomWear/>}/>
            <Route path='/Men-Footwear' element={<MenFootwear/>}/>
            <Route path='/Women-Footwear' element={<WomenFootwear/>}/>
            <Route path='/Bags-Luggages' element={<BagsLuggages/>}/>
            <Route path='/Kids' element={<Kids/>}/>
            <Route path='/Kitchen-Appliances' element={<KitchenAppliances/>}/>
            <Route path='/Large-Appliances' element={<LargeAppliances/>}/>
            <Route path='/Small-Appliances' element={<SmallAppliances/>}/>
            <Route path='/Home-Comforts' element={<HomeComforts/>}/>
            <Route path='/Fitness-Equipment' element={<FitnessEquipments/>}/>
            <Route path='/Outdoor-Sports' element={<OutdoorSports/>}/>
            <Route path='/Indoor-Games' element={<IndoorGames/>}/>
            <Route path='/Living-Room' element={<LivingRoom/>}/>
            <Route path='/Bedroom' element={<Bedroom/>}/>
            <Route path='/Dining-Room' element={<DiningRoom/>}/>
            <Route path='/Office-Furniture' element={<OfficeFurniture/>}/>
            <Route path='/Makeup' element={<Makeup/>}/>
            <Route path='/Skin-Care' element={<SkinCare/>}/>
            <Route path='/Hair-Care' element={<HairCare/>}/>
            <Route path='/Toys-Games' element={<ToysandGames/>}/>
            <Route path='/Books' element={<Books/>}/>
          </Routes>
        </main>

        <Footer/>
      
      </div>
    </Router>
    </>
  )
}

export default App