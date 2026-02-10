import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook for navigation

const Search = () => {
    const [text, setText] = useState("");
    const navigate = useNavigate();

    const handleSearch = () => {
        if (text.trim()) {
            // Navigate to search page with query parameter
            navigate(`/search?q=${text}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="w-full flex items-center">
            <input
                type="text"
                className="search-bar w-full h-full border border-blue-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Search Product Here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button 
                onClick={handleSearch}
                className="search-button p-2 bg-blue-600 text-white rounded ml-2 font-semibold hover:bg-blue-700 transition"
            >
                Search
            </button>
        </div>
    );
}

export default Search;