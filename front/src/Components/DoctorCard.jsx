import React from "react";
import { IoStar } from "react-icons/io5";

function DoctorCard(props) {
  return (
    <div className="flex flex-col  bg-white p-3 border border-gray-300 rounded-3xl">
      <div>
        <h1 className="text-2xl font-semibold p-1">Dr.{props.name}</h1>
      </div>
      <div className="flex gap-4.5 ">
        <div>
          <img className="size-20 rounded-full" src="/img1.png" alt="image" />
        </div>
        <div className="details">
          <div>
            <div className="flex gap-0.5 ">
              <IoStar className="text-amber-300 text-2xl" />
              <IoStar className="text-amber-300 text-2xl" />
              <IoStar className="text-amber-300 text-2xl" />
              <IoStar className="text-amber-300 text-2xl" />
              
            </div>
            <h4>{props.email}</h4>
            <h4>
              description : Lorem ipsum, dolor sit amet consectetur adipisicing
              elit. Vel deleniti ducimus 
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
