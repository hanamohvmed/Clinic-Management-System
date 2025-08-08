import React from "react";

function Filter({ categories, selectedCategory, onChangeCategory }) {
  return (
    <div className="lg:w-1/4" >
      <select className="w-full  border rounded-lg border-sky-500 text-sky-500 size-12" value={selectedCategory} onChange={onChangeCategory}>
        <option className="text-sky-500 bg-white"  value={""} >All </option>
        {categories.map((cat) => (
          <option className="text-sky-500 bg-white" key={cat.id} value={cat.name} >{cat.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
