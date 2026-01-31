import React, { useState } from "react";
import { Search } from "lucide-react";
import { useProductStore } from "../../store/productStore";

const SearchBar: React.FC = () => {
  const [localQuery, setLocalQuery] = useState("");
  const searchProducts = useProductStore((state) => state.searchProducts);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchProducts(localQuery);
  };

  const handleClear = () => {
    setLocalQuery("");
    searchProducts("");
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search products by name, category, or brand..."
          className="w-full pl-10 pr-24 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-1">
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800 mr-1"
            >
              Clear
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
