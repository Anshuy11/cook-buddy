import React, { useState, useEffect, useRef } from "react";
import ingredients from "./IngredientList"; // This should be an array of { id, name, category }
import {Ingradients, IngredientMultiSelectProps } from "@/types/ingredient";

export default function IngredientMultiSelect({onSearch}:IngredientMultiSelectProps) {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [selected, setSelected] = useState<Ingradients[]>([]);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
const isThrottledRef = useRef<boolean>(false);
  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 100);
    return () => clearTimeout(timer);
  }, [query]);

  const filteredIngredients = ingredients.filter(
    (item: Ingradients) =>
      item.name.toLowerCase().includes(debouncedQuery.toLowerCase()) &&
      !selected.some((sel) => sel.id === item.id)
  );

  const handleSelect = (item:Ingradients) => {
    setSelected([...selected, item]);
    setQuery("");
    setDebouncedQuery("");
  };

  const handleRemove = (id:number) => {
    setSelected(selected.filter((item) => item.id !== id));
  };
const handleSearch = () => {
  if (isDisabled || selected.length === 0) return;

  const query = selected
    .map((item) => item.name.toLowerCase())
    .join(",");

  onSearch(query);

  setIsDisabled(true);
 
 // setTimeout(() => setIsDisabled(false), 5000);
};
useEffect(()=>{
  setIsDisabled(false);
},[selected])


  return (
    <div className="mx-auto  w-full">
      <div className="mb-4 relative">
        <label className="block mb-1 font-medium">Ingredients</label>
        <input
          type="text"
          className="w-full border border-gray-300 p-2 rounded-md"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          placeholder="Type to search..."
        />

       {debouncedQuery && (
  <div className="absolute z-10 w-full border border-t-0 border-gray-300 max-h-48 overflow-auto rounded-b-md bg-gray-100 text-black shadow-md">
    {filteredIngredients.length > 0 ? (
      filteredIngredients.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelect(item)}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        >
          {item.name}
          <span className="text-sm text-gray-400"> ({item.category})</span>
        </div>
      ))
    ) : (
      <div className="px-4 py-2 text-gray-400">No results</div>
    )}
  </div>
)}

      </div>

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
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleRemove(item.id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

     {selected.length>0 &&<button
  onClick={handleSearch}
  disabled={isDisabled}
  className={`mt-6 px-4 py-2 rounded cursor-pointer text-white ${
    isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  Search Recipes
</button>
}
    </div>
  );
}
