const SpecsWrapper = ({ children }) => (
  <div className="mt-6">
    <h2 className="font-semibold mb-2">Specifications</h2>
    <ul className="text-sm text-gray-600 space-y-1">
      {children}
    </ul>
  </div>
);

const Spec = ({ label, value }) => {
  if (!value) return null;
  return (
    <li>
      <b>{label}:</b> {value}
    </li>
  );
};


const ProductSpecs = ({ product }) => {
  const { subCategory, specs } = product;

  if (!specs) return null;

  switch (subCategory) {
    /* ================= MOBILES ================= */
    case "Mobiles":
      return (
        <SpecsWrapper>
          <Spec label="RAM" value={specs.ram} />
          <Spec label="ROM" value={specs.rom} />
          <Spec label="Processor" value={specs.processor} />
          <Spec label="Display Size" value={specs.displaySize} />
          <Spec label="Display Type" value={specs.displayType} />
          <Spec label="Front Camera" value={specs.frontCamera} />
          <Spec label="Back Camera" value={specs.backCamera} />
        </SpecsWrapper>
      );

    /* ================= LAPTOPS ================= */
    case "Laptops":
      return (
        <SpecsWrapper>
          <Spec label="RAM" value={specs.ram} />
          <Spec label="RAM Type" value={specs.ramType} />
          <Spec label="SSD" value={specs.ssd} />
          <Spec label="HDD" value={specs.hdd} />
          <Spec label="Processor Brand" value={specs.processorBrand} />
          <Spec label="Processor" value={specs.processor} />
          <Spec label="Processor Gen" value={specs.processorGen} />
          <Spec label="Processor Model" value={specs.processorModel} />
          <Spec label="Display Size" value={specs.displaySize} />
          <Spec label="Display Type" value={specs.displayType} />
          <Spec label="Graphics Memory" value={specs.graphicsMemory} />
          <Spec label="GPU Series" value={specs.gpuSeries} />
          <Spec label="GPU Name" value={specs.gpuName} />
        </SpecsWrapper>
      );

    /* ================= CAMERAS ================= */
    case "Cameras":
      return (
        <SpecsWrapper>
          <Spec label="Video Resolution" value={specs.videoResolution} />
          <Spec label="Shutter Speed" value={specs.shutterSpeed} />
          <Spec label="Effective Pixels" value={specs.effectivePixels} />
          <Spec label="Connectivity" value={specs.connectivity} />
        </SpecsWrapper>
      );

    /* ================= AUDIO DEVICES ================= */
    case "Audio Devices":
      return (
        <SpecsWrapper>
          <Spec label="Type" value={specs.type} />
          <Spec label="Driver Size" value={specs.driverSize} />
          <Spec label="Bluetooth Version" value={specs.bluetoothVersion} />
          <Spec label="Connectivity" value={specs.connectivity} />
          <Spec label="Noise Cancellation" value={specs.noiseCancellation} />
          <Spec label="Noise Cancellation Value" value={specs.noiseCancellationValue} />
          <Spec label="Playback Time" value={specs.playbackTime} />
        </SpecsWrapper>
      );

    /* ================= TABLETS ================= */
    case "Tablets":
      return (
        <SpecsWrapper>
          <Spec label="RAM" value={specs.ram} />
          <Spec label="ROM" value={specs.rom} />
          <Spec label="Processor" value={specs.processor} />
          <Spec label="Display Size" value={specs.displaySize} />
          <Spec label="Display Type" value={specs.displayType} />
          <Spec label="Front Camera" value={specs.frontCamera} />
          <Spec label="Back Camera" value={specs.backCamera} />
        </SpecsWrapper>
      );

    /* ================= BAGS & LUGGAGES ================= */
    case "Bags and Luggages":
      return (
        <SpecsWrapper>
          <Spec label="Type" value={specs.type} />
          <Spec label="Material" value={specs.material} />
          <Spec label="Capacity" value={specs.capacity} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= KIDS ================= */
    case "Kids":
      return (
        <SpecsWrapper>
          <Spec label="Dress Type" value={specs.dressType} />
          <Spec label="Fabric" value={specs.fabric} />
          <Spec label="Age Group" value={specs.ageGroup} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= MENS BOTTOM WEAR ================= */
    case "Men's Bottom-Wear":
      return (
        <SpecsWrapper>
          <Spec label="Dress Type" value={specs.dressType} />
          <Spec label="Fabric" value={specs.fabric} />
          <Spec label="Fit" value={specs.fit} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= MENS FOOTWEAR ================= */
    case "Men's Footwear":
      return (
        <SpecsWrapper>
          <Spec label="Type" value={specs.type} />
          <Spec label="Material" value={specs.material} />
          <Spec label="Closure Type" value={specs.closureType} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= MENS TOP WEAR ================= */
    case "Men's Top-Wear":
      return (
        <SpecsWrapper>
          <Spec label="Dress Type" value={specs.dressType} />
          <Spec label="Fabric" value={specs.fabric} />
          <Spec label="Sleeve Length" value={specs.sleeveLength} />
          <Spec label="Fit" value={specs.fit} />
          <Spec label="Closure Type" value={specs.closureType} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= WOMENS BOTTOM WEAR ================= */
    case "Women's Bottom-Wear":
      return (
        <SpecsWrapper>
          <Spec label="Dress Type" value={specs.dressType} />
          <Spec label="Fabric" value={specs.fabric} />
          <Spec label="Fit" value={specs.fit} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= WOMENS FOOTWEAR ================= */
    case "Women's Footwear":
      return (
        <SpecsWrapper>
          <Spec label="Type" value={specs.type} />
          <Spec label="Material" value={specs.material} />
          <Spec label="Heel Type" value={specs.heelType} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= WOMENS TOP WEAR ================= */
    case "Women's Top-Wear":
      return (
        <SpecsWrapper>
          <Spec label="Dress Type" value={specs.dressType} />
          <Spec label="Fabric" value={specs.fabric} />
          <Spec label="Sleeve Length" value={specs.sleeveLength} />
          <Spec label="Fit" value={specs.fit} />
          <Spec label="Occasion" value={specs.occasion} />
        </SpecsWrapper>
      );

    /* ================= BEDROOM ================= */
    case "Bedroom":
      return (
        <SpecsWrapper>
          <Spec label="Furniture Type" value={specs.furnitureType} />
          <Spec label="Structure Material" value={specs.structureMaterial} />
          <Spec label="Style" value={specs.style} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= DINING ROOM ================= */
    case "Dining Room":
      return (
        <SpecsWrapper>
          <Spec label="Furniture Type" value={specs.furnitureType} />
          <Spec label="Structure Material" value={specs.structureMaterial} />
          <Spec label="Style" value={specs.style} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= LIVING ROOM ================= */
    case "Living Room":
      return (
        <SpecsWrapper>
          <Spec label="Furniture Type" value={specs.furnitureType} />
          <Spec label="Filling Material" value={specs.fillingMaterial} />
          <Spec label="Style" value={specs.style} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= OFFICE FURNITURE ================= */
    case "Office Furniture":
      return (
        <SpecsWrapper>
          <Spec label="Furniture Type" value={specs.furnitureType} />
          <Spec label="Structure Material" value={specs.structureMaterial} />
          <Spec label="Style" value={specs.style} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );
    /* ================= Makeup ================= */
    case "Makeup":
      return (
        <SpecsWrapper>
          <Spec label="Makeup Type" value={specs.makeupType} />
          <Spec label="Product" value={specs.makeupName} />
          <Spec label="Finish" value={specs.finish} />
          <Spec label="Best for" value={specs.skinType} />
        </SpecsWrapper>
      );

    /* ================= Hair Care ================= */
    case "Hair Care":
      return (
        <SpecsWrapper>
          <Spec label="Product" value={specs.productType} />
          <Spec label="Ingredients" value={specs.ingredients} />
          <Spec label="Used for" value={specs.concern} />
          <Spec label="Best for" value={specs.hairType} />
        </SpecsWrapper>
      );

    /* ================= Skin Care ================= */
    case "Skin Care":
      return (
        <SpecsWrapper>
          <Spec label="Product" value={specs.productType} />
          <Spec label="Ingredients" value={specs.ingredients} />
          <Spec label="Used for" value={specs.concern} />
          <Spec label="Best for" value={specs.skinType} />
        </SpecsWrapper>
      );

    /* ================= BOOKS ================= */
    case "Books":
      return (
        <SpecsWrapper>
          <Spec label="Book Type" value={specs.bookType} />
          <Spec label="Author" value={specs.author} />
          <Spec label="Publisher" value={specs.publisher} />
          <Spec label="ISBN / Format" value={specs.isbn} />
        </SpecsWrapper>
      );

    /* ================= TOYS & GAMES ================= */
    case "Toys and Games":
      return (
        <SpecsWrapper>
          <Spec label="Category" value={specs.categoryType} />
          <Spec label="Age Group" value={specs.ageGroup} />
          <Spec label="Material" value={specs.material} />
          <Spec label="Skill Set" value={specs.skillSet} />
        </SpecsWrapper>
      );

    /* ================= Home Comforts ================= */
    case "Home Comforts":
      return (
        <SpecsWrapper>
          <Spec label="Product" value={specs.applianceType} />
          <Spec label="Type" value={specs.subType} />
          <Spec label="Coverage Area" value={specs.coverageArea} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= Kitchen Appliances ================= */
    case "Kitchen Appliances":
      return (
        <SpecsWrapper>
          <Spec label="Product" value={specs.applianceType} />
          <Spec label="Power" value={specs.power} />
          <Spec label="Capacity" value={specs.capacity} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= Large Appliances ================= */
    case "Large Appliances":
      return (
        <SpecsWrapper>
          <Spec label="Product" value={specs.applianceType} />
          <Spec label="Capacity Value" value={specs.capacityValue} />
          <Spec label="Capacity Unit" value={specs.capacityUnit} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= Small Appliances ================= */
    case "Small Appliances":
      return (
        <SpecsWrapper>
          <Spec label="Product" value={specs.applianceType} />
          <Spec label="Capacity Value" value={specs.capacityValue} />
          <Spec label="Capacity Unit" value={specs.capacityUnit} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= FITNESS EQUIPMENT ================= */
    case "Fitness Equipment":
      return (
        <SpecsWrapper>
          <Spec label="Product Type" value={specs.productType} />
          <Spec label="Material" value={specs.material} />
          <Spec label="Max Weight / Load" value={specs.maxWeightLoad} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= OUTDOOR SPORTS ================= */
    case "Outdoor Sports":
      return (
        <SpecsWrapper>
          <Spec label="Sport" value={specs.sport} />
          <Spec label="Material" value={specs.material} />
          <Spec label="Age Group / Size" value={specs.ageGroup} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= INDOOR GAMES ================= */
    case "Indoor Games":
      return (
        <SpecsWrapper>
          <Spec label="Game Type" value={specs.gameType} />
          <Spec label="Age Group" value={specs.ageGroup} />
          <Spec label="Number of Players" value={specs.numberOfPlayers} />
          <Spec label="Features" value={specs.features} />
        </SpecsWrapper>
      );

    /* ================= FALLBACK ================= */
    default:
      return (
        <SpecsWrapper>
          {Object.entries(specs).map(([key, value]) => (
            <Spec key={key} value={value} />
          ))}
        </SpecsWrapper>
      );
  }
};

export default ProductSpecs;

