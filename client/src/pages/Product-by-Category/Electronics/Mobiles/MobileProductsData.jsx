import SamsungM14 from "../images/samsung-galaxy-m14-5g.webp";
import SamsungM14_2 from "../images/samsung-galaxy-m14-5g-2.webp";
import SamsungM14_3 from "../images/samsung-galaxy-m14-5g-3.webp";
import SamsungM34 from "../images/Samsung-Galaxy-M34-5g.jpg";
import SamsungM34_2 from "../images/Samsung-Galaxy-M34-5g-2.webp";
import SamsungM34_3 from "../images/Samsung-Galaxy-M34-5g-3.webp";
import SamsungA15 from "../images/Samsung-Galaxy-A15-5g.png";
import SamsungA15_2 from "../images/Samsung-Galaxy-A15-5g-2.webp";
import SamsungA15_3 from "../images/Samsung-Galaxy-A15-5g-3.webp";
import SamsungF54 from "../images/Samsung-Galaxy-F54-5g.jfif";
import SamsungF54_2 from "../images/Samsung-Galaxy-F54-5g-2.jpg";
import SamsungF54_3 from "../images/Samsung-Galaxy-F54-5g-3.webp";
import RealmeP3x from "../images/Realme-p3x-5g.webp";
import RealmeP3x_2 from "../images/Realme-p3x-5g-2.webp";
import RealmeP3x_3 from "../images/Realme-p3x-5g-3.webp";
import Realme15pro from "../images/Realme-15-pro-5g.webp";
import Realme15pro_2 from "../images/Realme-15-pro-5g-2.webp";
import Realme15pro_3 from "../images/Realme-15-pro-5g-3.webp";
import RedmiA5 from "../images/Redmi-a5.webp";
import RedmiA5_2 from "../images/Redmi-a5-2.webp";
import RedmiA5_3 from "../images/Redmi-a5-3.webp";
import RedmiNote14ProPlus from "../images/Redmi-note-14pro+-5g.webp";
import RedmiNote14ProPlus_2 from "../images/Redmi-note-14pro+-5g-2.webp";
import OneplusNord5 from "../images/Oneplus-nord5-5g.webp"
import OneplusNord5_2 from "../images/Oneplus-nord5-5g-2.webp"
import OneplusNord5_3 from "../images/Oneplus-nord5-5g-3.webp"

const MobileProductsData = [
  {
    id: 1,
    brand: "Samsung",
    name: "Samsung Galaxy F54",
    price: 29999,
    images: [SamsungF54,SamsungF54_2,SamsungF54_3],
    ram: "8 GB",
    rom: "256 GB",
    displaySize: "6.7 inches",
    displayType: "Super AMOLED Plus",
    processor: "Samsung Exynos 1380",
    rearCamera: "108 MP",
    frontCamera: "32 MP"
  },
  {
    id: 2,
    brand: "Samsung",
    name: "Samsung Galaxy M14",
    price: 12999,
    images: [SamsungM14,SamsungM14_2,SamsungM14_3],
    ram: "4 GB",
    rom: "128 GB",
    displaySize: "6.6 inches",
    displayType: "PLS LCD",
    processor: "Samsung Exynos 1330",
    rearCamera: "50 MP",
    frontCamera: "13 MP"
  },
  {
    id: 3,
    brand: "Samsung",
    name: "Samsung Galaxy M34",
    price: 18999,
    images: [SamsungM34,SamsungM34_2,SamsungM34_3],
    ram: "6 GB",
    rom: "128 GB",
    displaySize: "6.6 inches",
    displayType: "Super AMOLED",
    processor: "Samsung Exynos 1280",
    rearCamera: "50 MP",
    frontCamera: "13 MP"
  },
  {
    id: 4,
    brand: "Samsung",
    name: "Samsung Galaxy A15",
    price: 14999,
    images: [SamsungA15,SamsungA15_2,SamsungA15_3],
    ram: "4 GB",
    rom: "128 GB",
    displaySize: "6.5 inches",
    displayType: "Super AMOLED",
    processor: "MediaTek Helio G99",
    rearCamera: "50 MP",
    frontCamera: "13 MP"
  },
  {
    id: 5,
    brand: "Realme",
    name: "Realme P3x 5G",
    price: 13999,
    images: [RealmeP3x,RealmeP3x_2,RealmeP3x_3],
    ram: "6 GB",
    rom: "128 GB",
    displaySize: "6.72 inches",
    displayType: "FHD+ LCD",
    processor: "MediaTek Dimensity 6100+",
    rearCamera: "50 MP + 2 MP",
    frontCamera: "8 MP"
  },
  {
    id: 6,
    brand: "Realme",
    name: "Realme 15 Pro 5G",
    price: 27999,
    images: [Realme15pro,Realme15pro_2,Realme15pro_3],
    ram: "8 GB",
    rom: "256 GB",
    displaySize: "6.7 inches",
    displayType: "AMOLED",
    processor: "Qualcomm Snapdragon 7 Gen 3",
    rearCamera: "50 MP + 8 MP + 2 MP",
    frontCamera: "32 MP"
  },
  {
    id: 7,
    brand: "Redmi",
    name: "REDMI A5",
    price: 9999,
    images: [RedmiA5,RedmiA5_2,RedmiA5_3],
    ram: "4 GB",
    rom: "128 GB",
    displaySize: "6.52 inches",
    displayType: "HD+ IPS LCD",
    processor: "MediaTek Helio G36",
    rearCamera: "13 MP",
    frontCamera: "5 MP"
  },
  {
    id: 8,
    brand: "Redmi",
    name: "REDMI Note 14 Pro+ 5G",
    price: 32999,
    images: [RedmiNote14ProPlus, RedmiNote14ProPlus_2],
    ram: "8 GB",
    rom: "128 GB",
    displaySize: "6.67 inches",
    displayType: "AMOLED",
    processor: "Qualcomm Snapdragon 7s Gen 2",
    rearCamera: "200 MP + 8 MP + 2 MP",
    frontCamera: "16 MP"
  },
  {
    id: 9,
    brand: "OnePlus",
    name: "OnePlus Nord 5 5G",
    price: 35999,
    images: [OneplusNord5,OneplusNord5_2,OneplusNord5_3],
    ram: "12 GB",
    rom: "256 GB",
    displaySize: "6.74 inches",
    displayType: "AMOLED",
    processor: "Qualcomm Snapdragon 7+ Gen 3",
    rearCamera: "50 MP + 8 MP",
    frontCamera: "32 MP"
  }
];

export default MobileProductsData