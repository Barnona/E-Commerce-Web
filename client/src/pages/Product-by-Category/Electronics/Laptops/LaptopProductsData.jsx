import AcerAspire7 from "../images/Acer Aspire 7 Intel Core i5 12th Gen 12450H.webp";
import HP15s from "../images/HP 15s AMD Ryzen 3 Dual Core 3250U.webp";
import HP15s_2 from "../images/HP 15s AMD Ryzen 3 Dual Core 3250U_2.webp";
import HP15s_3 from "../images/HP 15s AMD Ryzen 3 Dual Core 3250U_3.webp";
import DellInspiron3511 from "../images/DELL Inspiron Intel Core i3 11th Gen 1115G4.webp";
import DellInspiron3511_2 from "../images/DELL Inspiron Intel Core i3 11th Gen 1115G4_2.webp";
import DellInspiron3511_3 from "../images/DELL Inspiron Intel Core i3 11th Gen 1115G4_3.webp";
import AcerSwift3 from "../images/Acer Swift 3 AMD Athlon Dual Core 300U.webp";
import AcerSwift3_2 from "../images/Acer Swift 3 AMD Athlon Dual Core 300U_2.webp";
import AcerSwift3_3 from "../images/Acer Swift 3 AMD Athlon Dual Core 300U_3.webp";
import AsusTUFF15 from "../images/ASUS TUF Gaming F15.webp";
import AcerNitroLite16 from "../images/Acer NITRO LITE 16 Intel Core i5 13th Gen 13420H.webp";

const LaptopProductsData = [
  {
    id: 1,
    brand: "Acer",
    name: "Acer Aspire 7 Gaming",
    price: 54999,
    images: [AcerAspire7],
    processorBrand: "Intel",
    processor: "Core i5",
    processorGen: "12th Gen",
    processorModel: "12450H",
    graphicsMemory: "4 GB",
    gpuSeries: "NVIDIA GeForce RTX Series",
    gpuName: "NVIDIA GeForce RTX 2050",
    ram: "8 GB",
    ramType: "DDR4",
    ssd: "512 GB",
    hdd: "",
    displaySize: "15.6 inches",
    displayType: "LCD",
  },
  {
    id: 2,
    brand: "HP",
    name: "HP 15s",
    price: 38999, 
    images: [HP15s,HP15s_2,HP15s_3],
    processorBrand: "AMD",
    processor: "Ryzen 3",
    processorGen: "", 
    processorModel: "3250U",
    graphicsMemory: "Integrated Graphics Card",
    gpuSeries: "AMD Radeon Graphics Series",
    gpuName: "AMD Radeon Graphics",
    ram: "8 GB",
    ramType: "DDR4",
    ssd: "256 GB",
    hdd: "1 TB",
    displaySize: "15.6 inches",
    displayType: "LCD"
  },
  {
    id: 3,
    brand: "DELL",
    name: "DELL Inspiron 3511",
    price: 41999,
    images: [DellInspiron3511,DellInspiron3511_2,DellInspiron3511_3],
    processorBrand: "Intel",
    processor: "Core i3",
    processorGen: "11th Gen",
    processorModel: "1115G4",
    graphicsMemory: "Integrated Graphics Card",
    gpuSeries: "Intel UHD Graphics",
    gpuName: "Intel UHD Graphics",
    ram: "8 GB",
    ramType: "DDR4",
    ssd: "256 GB",
    hdd: "1 TB",
    displaySize: "15.6 inches",
    displayType: "LCD"
  },
  {
    id: 4,
    brand: "Acer",
    name: "Acer Swift 3",
    price: 29999,
    images: [AcerSwift3,AcerSwift3_2,AcerSwift3_3],
    processorBrand: "AMD",
    processor: "Athlon",
    processorGen: "",
    processorModel: "300U",
    graphicsMemory: "Integrated Graphics Card",
    gpuSeries: "AMD Radeon Graphics Series",
    gpuName: "AMD Radeon Graphics",
    ram: "4 GB",
    ramType: "DDR4",
    ssd: "",
    hdd: "1 TB",
    displaySize: "14 inches",
    displayType: "LCD"
  },
  {
    id: 5,
    brand: "ASUS",
    name: "ASUS TUF Gaming F15 Laptop",
    price: 56999, 
    images: [AsusTUFF15],
    processorBrand: "Intel",
    processor: "Core i5",
    processorGen: "11th Gen",
    processorModel: "11260H",
    graphicsMemory: "4 GB",
    gpuSeries: "NVIDIA GeForce RTX Series",
    gpuName: "NVIDIA GeForce RTX 2050",
    ram: "8 GB",
    ramType: "DDR4",
    ssd: "512 GB",
    hdd: "",
    displaySize: "15.6 inches",
    displayType: "LCD"
  },
  {
    id: 6,
    brand: "Acer",
    name: "Acer NITRO LITE 16 Gaming Laptop",
    price: 72999, 
    images: [AcerNitroLite16],
    processorBrand: "Intel",
    processor: "Core i5",
    processorGen: "13th Gen",
    processorModel: "13420H",
    graphicsMemory: "6 GB",
    gpuSeries: "NVIDIA GeForce RTX Series",
    gpuName: "NVIDIA GeForce RTX 3050",
    ram: "16 GB",
    ramType: "DDR4",
    ssd: "512 GB",
    hdd: "",
    displaySize: "16 inches",
    displayType: "LCD"
  }


];

export default LaptopProductsData
