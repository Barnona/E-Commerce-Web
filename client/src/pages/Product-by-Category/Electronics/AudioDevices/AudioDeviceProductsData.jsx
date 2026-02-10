import boAtRockerz480  from '../images/boAt Rockerz 480.webp';
import boAtRockerz480_2  from '../images/boAt Rockerz 480_2.webp';
import boAtRockerz480_3  from '../images/boAt Rockerz 480_3.webp';
import boAtRockerz512ANC from '../images/boAt Rockerz 512 ANC.webp';
import boAtRockerz512ANC_2 from '../images/boAt Rockerz 512 ANC_2.webp';
import boAtRockerz512ANC_3 from '../images/boAt Rockerz 512 ANC_3.webp';
import SonyEX15C from '../images/SONY IER-EX15C Type-C Earphones.webp';
import realmeT200 from '../images/realme T200 Hi-Res with 32dB ANC.webp';
import realmeT200_2 from '../images/realme T200 Hi-Res with 32dB ANC_2.webp';
import realmeT200_3 from '../images/realme T200 Hi-Res with 32dB ANC_3.webp';
import SonyWHCH520 from '../images/SONY WH-CH520.webp';
import SonyWHCH520_2 from '../images/SONY WH-CH520_2.webp';
import SonyWHCH520_3 from '../images/SONY WH-CH520_3.webp';
import boAtStone1800 from '../images/boAt Stone 1800 - 90 W speaker.webp';
import boAtStone1800_2 from '../images/boAt Stone 1800 - 90 W speaker_2.webp';


const AudioDeviceProductsData = [
  {
    id: 1,
    brand: "boAt",
    name: "boAt Rockerz 480",
    type: "Headphones",
    driverSize: "40 mm",
    connectivity: "Bluetooth",
    bluetoothVersion: "5.3",
    noiseCancellation: "ENC",
    noiseCancellationValue: null,
    playbacktime: "60 hrs",
    price: 2499,
    images: [boAtRockerz480,boAtRockerz480_2,boAtRockerz480_3]
  },
  {
    id: 2,
    brand: "boAt",
    name: "boAt Rockerz 512 ANC",
    type: "Headphones",
    driverSize: "40 mm",
    connectivity: "Bluetooth",
    bluetoothVersion: "5.4",
    noiseCancellation: "ANC",
    noiseCancellationValue: "40 dB",
    playbacktime: "80 hrs",
    price: 3999,
    images: [boAtRockerz512ANC,boAtRockerz512ANC_2,boAtRockerz512ANC_3]
  },
  {
    id: 3,
    brand: "Sony",
    name: "Sony IER-EX15C Type-C Wired Earphones",
    type: "Earphones",
    driverSize: "9 mm",
    connectivity: "Wired",
    bluetoothVersion: null,
    noiseCancellation: "Passive",
    noiseCancellationValue: null,
    playbacktime: null,
    price: 1299,
    images: [SonyEX15C]
  },
  {
    id: 4,
    brand: "Realme",
    name: "realme T200 Hi-Res ANC Bluetooth Earbuds",
    type: "Earbuds",
    driverSize: "12.4 mm",
    connectivity: "Bluetooth",
    bluetoothVersion: "5.4",
    noiseCancellation: "ANC",
    noiseCancellationValue: "32 dB",
    playbacktime: "50 hrs",
    price: 1799,
    images: [realmeT200,realmeT200_2,realmeT200_3]
  },
  {
    id: 5,
    brand: "Sony",
    name: "Sony WH-CH520 Bluetooth Headphones",
    type: "Headphones",
    driverSize: "30 mm",
    connectivity: "Bluetooth",
    bluetoothVersion: "5.2",
    noiseCancellation: "None",
    noiseCancellationValue: null,
    playbacktime: "50 hrs",
    price: 3999,
    images: [SonyWHCH520,SonyWHCH520_2,SonyWHCH520_3]
  },
  {
    id: 6,
    brand: "boAt",
    name: "boAt Stone 1800  90 W Bluetooth Speaker",
    type: "Speaker",
    driverSize: null,
    connectivity: "Bluetooth",
    bluetoothVersion: "5.0",
    noiseCancellation: "None",
    noiseCancellationValue: null,
    playbacktime: "5 hrs",
    price: 6999,
    images: [boAtStone1800,boAtStone1800_2]
  }

];

export default AudioDeviceProductsData
