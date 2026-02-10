import React, { useState, useEffect } from "react";
import { getFilterOptions } from "../../../../service/api"; // Import API

const MenTopWearFilter = ({ filters, setFilters, subCategory }) => {

  const [open, setOpen] = useState({
    sort: true, 
    price: true,
  });

  const [openDynamic, setOpenDynamic] = useState({});
  const [dynamicFilters, setDynamicFilters] = useState({});

  const toggleDynamicOpen = (key) => {
    setOpenDynamic(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleFilter = (key, value) => {
    setFilters(prev => {
      const current = prev[key] || [];

      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  
  useEffect(() => {
    const fetchFilters = async () => {
      const data = await getFilterOptions(subCategory);

      if (!data) return;
      const mappedFilters = {
        brand: data.brand || [],
        dressType: data.dressType || [],
        fabric: data.fabric || [],
        fit: data.fit || [],
      };
      setDynamicFilters(mappedFilters);
    };
    
    fetchFilters();
  }, [subCategory]);

  useEffect(() => {
      console.log("dynamicFilters received:", dynamicFilters);
    }, [dynamicFilters]);
  

  return (
    <aside className="w-full bg-white border rounded-md p-4 shadow-sm h-min">
      <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Filters</h2>
          <button
            onClick={() =>
              setFilters({
                dressType: [], 
                fabric: [], 
                brand: [], 
                fit: [], 
                price: "", 
                sort: "none"
              })
            } 
            className="text-xs text-blue-600 hover:underline"
          >
            Clear All
          </button>
      </div>

      {/* Sort By */}
      <div className="mb-4 border-b pb-4">
        <h3
          onClick={() => setOpen({ ...open, sort: !open.sort })}
          className="font-medium cursor-pointer flex justify-between text-sm text-gray-700"
        >
          Sort By
          <span>{open.sort ? "-" : "+"}</span>
        </h3>

        {open.sort && (
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            {[
              { label: "None", value: "none" },
              { label: "Price: Low to High", value: "price-asc" },
              { label: "Price: High to Low", value: "price-desc" },
            ].map((opt) => (
              <label key={opt.value} className="flex gap-2 items-center cursor-pointer">
                <input
                  type="radio"
                  name="sort"
                  checked={filters.sort === opt.value}
                  onChange={() =>
                    setFilters({ ...filters, sort: opt.value })
                  }
                  className="accent-blue-600"
                />
                {opt.label}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* dynamic filter */}
      
      {Object.entries(dynamicFilters).map(([key, values]) => (
        (
          <div key={key} className="mb-4 border-b pb-4">

            {/* Heading */}
            <h3
              onClick={() => toggleDynamicOpen(key)}
              className="font-medium cursor-pointer flex justify-between text-sm text-gray-700 capitalize"
            >
              {key.replace(/([A-Z])/g, " $1")}
              <span>{openDynamic[key] ? "-" : "+"}</span>
            </h3>

            {/* Content */}
            {openDynamic[key] && (
              <div className="mt-3 space-y-2 text-sm text-gray-600">
                {values.filter(v => v && v.trim() !== "").map(v => (
                  <label key={v} className="flex gap-2 items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters[key]?.includes(v)}
                      onChange={() => toggleFilter(key, v)}
                      className="rounded text-blue-600 focus:ring-blue-500"
                    />
                    {v}
                  </label>
                ))}
              </div>
            )}

          </div>
        )
      ))}

    </aside>
  );
};

export default MenTopWearFilter;