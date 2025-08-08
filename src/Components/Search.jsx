import React from "react";
import { IoIosSearch } from "react-icons/io";

function Search({ searchTerm, onSearch }) {
  return (
    <div className=" flex items-center px-2.5 py-3.5 rounded-4xl bg-gray-50 text-sky-600 shadow-sky-500 shadow-sm lg:w-3/4 ">
      <IoIosSearch className="text-3xl mr-2.5" />
      <input
        className="w-full text-xl text-sky-600 border-none outline-none bg-transparent"
        placeholder="Enter Doctor Name"
        type="search"
        value={searchTerm}
        onChange={onSearch}
      />
    </div>
  );
}

export default Search;
