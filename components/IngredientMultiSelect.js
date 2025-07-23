import React, { useState, useEffect } from "react";
import ingredients from "./IngredientList";

export default function IngredientMultiSelect() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [selected, setSelected] = useState([]);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 100); 

    return () => clearTimeout(timer); // Clear previous timer on each keystroke
  }, [query]);

  // Filter using debounced query
  const filteredIngredients = ingredients.filter(
    (item) =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
      !selected.some((sel) => sel.id === item.id)
  );

  const handleSelect = (item) => {
    setSelected([...selected, item]);
    setQuery("");
    setDebouncedQuery(""); // Reset filter results immediately on selection
  };

  const handleRemove = (id) => {
    setSelected(selected.filter((item) => item.id !== id));
  };
  console.log(selected)

  return (
   <div className="mx-auto p-4 w-full">
  {/* Search Input and Dropdown */}
  <div className="mb-4 relative">
    <label className="block mb-1 font-medium">Search Ingredients</label>
    <input
      type="text"
      className="w-full border border-gray-300 p-2 rounded-md"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Type to search..."
    />
    
    {/* Dropdown List */}
    {debouncedQuery && (
      <ul className="absolute z-10 w-full border border-t-0 border-gray-300 max-h-48 overflow-auto rounded-b-md bg-white shadow-md">
        {filteredIngredients.length > 0 ? (
          filteredIngredients.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
              <span className="text-sm text-gray-400"> ({item.category})</span>
            </li>
          ))
        ) : (
          <li className="px-4 py-2 text-gray-400">No results</li>
        )}
      </ul>
    )}
  </div>

  {/* Selected Tags */}
  {selected.length > 0 && (
    <div className="mt-6">
      <label className="block mb-1 font-medium">Selected Items</label>
      <div className="flex flex-wrap gap-2">
        {selected.map((item) => (
          <div
            key={item.id}
            className="flex items-center bg-blue-50 text-blue-500 px-3 py-1 rounded-full"
          >
            {item.name}
            <button
              className="ml-2 text-sm text-red-500 hover:text-red-800 cursor-pointer"
              onClick={() => handleRemove(item.id)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  )}
</div>

  );
}
