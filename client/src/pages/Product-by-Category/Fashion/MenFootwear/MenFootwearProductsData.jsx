import Afrojack_Boots_Men from "../images/Afrojack-Boots-Men.webp";
import BTOM_Oxford_Men from '../images/BTOM-Oxford-For-Men.webp';
import CAMPUS_Sneakers_Men from '../images/CAMPUS-OG-43-Sneakers-For-Men.webp';
import CAMPUS_RunningShoes_Men from "../images/CAMPUS-Running-Shoes-Men.webp";
import CAMPUS_RunningShoes_Men2 from "../images/CAMPUS-Running-Shoes-Men2.webp";
import CAMPUS_RunningShoes_Men3 from "../images/CAMPUS-Running-Shoes-Men3.webp";
import Glitchez_Clogs_Men from '../images/Glitchez-Outdoor-Clogs-Sandal-Men.webp';
import Glitchez_Clogs_Men2 from '../images/Glitchez-Outdoor-Clogs-Sandal-Men2.webp';
import Glitchez_Clogs_Men3 from '../images/Glitchez-Outdoor-Clogs-Sandal-Men3.webp';
import Shimer_Men_Sandal from "../images/Shimer-Men-Sandal.webp";
import Shimer_Men_Sandal2 from "../images/Shimer-Men-Sandal2.webp";
import Shimer_Men_Sandal3 from "../images/Shimer-Men-Sandal3.webp";

import React from 'react'

const MenFootwearProductsData = [
  {
    id: 1,
    brand: "Afrojack",
    name: "Afrojack Boots For Men",
    price: 659,
    images: [Afrojack_Boots_Men],
    type: "Boots",
    material: "Leather",
    occasion: "Formal"
  },
  {
    id: 2,
    brand: "BTOM",
    name: "BTOM Oxford For Men",
    price: 729,
    images: [BTOM_Oxford_Men],
    type: "Oxford",
    material: "Leather",
    occasion: "Formal"
  },
  {
    id: 3, 
    brand: "Glitchz",
    name: "Glitchz Outdoors Clogs Sandal For Men",
    price: 249,
    images: [Glitchez_Clogs_Men, Glitchez_Clogs_Men2, Glitchez_Clogs_Men3],
    type: "Sandal",
    material: "Polyester",
    occasion: "Casual"
  },
  {
    id: 4, 
    brand: "CAMPUS",
    name: "CAMPUS Running Shoes Men",
    price: 499,
    images: [CAMPUS_RunningShoes_Men, CAMPUS_RunningShoes_Men2, CAMPUS_RunningShoes_Men3],
    type: "Running Shoes",
    material: "Rubber",
    occasion: "Casual"
  },
  {
    id: 5, 
    brand: "CAMPUS",
    name: "CAMPUS Sneakers For Men",
    price: 645,
    images: [CAMPUS_Sneakers_Men],
    type: "Sneakers",
    material: "Canvas",
    occasion: "Casual"
  },
  {
    id: 6, 
    brand: "Shimer",
    name: "Shimer Men's Sandal",
    price: 463,
    images: [Shimer_Men_Sandal, Shimer_Men_Sandal2, Shimer_Men_Sandal3],
    type: "Sandal",
    material: "Leather",
    occasion: "Festive"
  },
];

export default MenFootwearProductsData
