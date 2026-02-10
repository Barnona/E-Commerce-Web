import CanonR50 from "../images/Canon EOS R50 V Mirrorless Camera Body withRF-S14-30mm F4-6.3IS STMPZ Lens.webp";
import CanonR50_2 from "../images/Canon EOS R50 V Mirrorless Camera Body withRF-S14-30mm F4-6.3IS STMPZ Lens_2.webp";
import CanonR50_3 from "../images/Canon EOS R50 V Mirrorless Camera Body withRF-S14-30mm F4-6.3IS STMPZ Lens_3.webp";
import CanonR50_4 from "../images/Canon EOS R50 V Mirrorless Camera Body withRF-S14-30mm F4-6.3IS STMPZ Lens_4.webp";
import CanonR50_5 from "../images/Canon EOS R50 V Mirrorless Camera Body withRF-S14-30mm F4-6.3IS STMPZ Lens_5.webp";
import SonyAlpha from "../images/SONY Alpha ILCE-6600 APS-C Mirrorless Camera Body Only Featuring Eye AF and 4K movie recording.webp";
import SonyAlpha_2 from "../images/SONY Alpha ILCE-6600 APS-C Mirrorless Camera Body Only Featuring Eye AF and 4K movie recording_2.webp";
import SonyAlpha_3 from "../images/SONY Alpha ILCE-6600 APS-C Mirrorless Camera Body Only Featuring Eye AF and 4K movie recording_3.webp";
import PanasonicDMC from "../images/Panasonic DMC-G85KGW-K Mirrorless Camera Body with 14 - 42 mm Lens.webp";
import PanasonicDMC_2 from "../images/Panasonic DMC-G85KGW-K Mirrorless Camera Body with 14 - 42 mm Lens_2.webp";
import PanasonicDMC_3 from "../images/Panasonic DMC-G85KGW-K Mirrorless Camera Body with 14 - 42 mm Lens_3.webp";
import Canon1500D from "../images/Canon EOS 1500D DSLR Camera Body+ 18-55 mm IS II Lens.webp";
import Canon1500D_2 from "../images/Canon EOS 1500D DSLR Camera Body+ 18-55 mm IS II Lens_2.webp";
import Canon1500D_3 from "../images/Canon EOS 1500D DSLR Camera Body+ 18-55 mm IS II Lens_3.webp";
import SonyILCE6400K from "../images/SONY ILCE-6400K Mirrorless Camera Body with SELP16502 Power Zoom.webp";
import SonyILCE6400K_2 from "../images/SONY ILCE-6400K Mirrorless Camera Body with SELP16502 Power Zoom_2.webp"
import SonyILCE6400K_3 from "../images/SONY ILCE-6400K Mirrorless Camera Body with SELP16502 Power Zoom_3.webp"
import NIKONZ50 from "../images/NIKON Z50 II Mirrorless Camera Body with 16-50 Lens.webp";
import NIKONZ50_2 from "../images/NIKON Z50 II Mirrorless Camera Body with 16-50 Lens_2.webp";
import NIKONZ50_3 from "../images/NIKON Z50 II Mirrorless Camera Body with 16-50 Lens_3.webp";
import NIKONZ50_4 from "../images/NIKON Z50 II Mirrorless Camera Body with 16-50 Lens_4.webp";



const CameraProductsData = [
  {
    id: 1,
    brand: "Canon",
    name: "Canon EOS R50 V Mirrorless Camera Body with RF-S 14-30mm F4-6.3 IS STM PZ Lens",
    price: 72999,
    images: [CanonR50,CanonR50_2,CanonR50_3,CanonR50_4,CanonR50_5],
    videoResolution: "3840 x 2160",
    shutterSpeed: "1/8000 sec",
    effectivePixels: 24.2,
    connectivity: ["Wi-Fi", "Bluetooth", "USB Type-C"]
  },
  {
    id: 2,
    brand: "Sony",
    name: "SONY Alpha ILCE-6600 APS-C Mirrorless Camera Body Only Featuring Eye AF and 4K Movie Recording",
    price: 97999,
    images: [SonyAlpha,SonyAlpha_2,SonyAlpha_3],
    videoResolution: "3840 x 2160",
    shutterSpeed: "1/4000 - 30 sec",
    effectivePixels: 24.2,
    connectivity: ["Wi-Fi", "Bluetooth", "USB Type-C", "NFC"]
  },
  {
    id: 3,
    brand: "Panasonic",
    name: "Panasonic DMC-G85KGW-K Mirrorless Camera Body with 14-42 mm Lens",
    price: 57999,
    images: [PanasonicDMC,PanasonicDMC_2,PanasonicDMC_3],
    videoResolution: "3840 x 2160",
    shutterSpeed: "1/4000 - 60 sec",
    effectivePixels: 16.0,
    connectivity: ["Wi-Fi", "USB", "HDMI"]
  },
  {
    id: 4,
    brand: "Canon",
    name: "Canon EOS 1500D DSLR Camera Body + 18-55 mm IS II Lens",
    price: 41999,
    images: [Canon1500D,Canon1500D_2,Canon1500D_3],
    videoResolution: "1920 x 1080",
    shutterSpeed: "1/4000 - 30 sec",
    effectivePixels: 24.1,
    connectivity: ["Wi-Fi", "USB", "NFC"]
  },
  {
    id: 5,
    brand: "Sony",
    name: "SONY ILCE-6400K Mirrorless Camera Body with SELP16502 Power Zoom",
    price: 68999,
    images: [SonyILCE6400K,SonyILCE6400K_2,SonyILCE6400K_3],
    videoResolution: "3840 x 2160",
    shutterSpeed: "1/4000 - 30 sec",
    effectivePixels: 24.2,
    connectivity: ["Wi-Fi", "Bluetooth", "USB Type-C", "NFC"]
  },
  {
    id: 6,
    brand: "Nikon",
    name: "NIKON Z50 II Mirrorless Camera Body with 16-50mm Lens",
    price: 96999,
    images: [NIKONZ50,NIKONZ50_2,NIKONZ50_3,NIKONZ50_4],
    videoResolution: "3840 x 2160",
    shutterSpeed: "1/4000 sec",
    effectivePixels: 20.9,
    connectivity: ["Wi-Fi", "Bluetooth", "USB Type-C"]
  }
  
];

export default CameraProductsData
