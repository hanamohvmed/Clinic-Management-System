// import React from "react";
// import { IoStar } from "react-icons/io5";

// function DoctorCard({
//   id,
//   name,
//   image,
//   spec,
//   bio,
//   clinicAdderss,
//   makeappointment,
// }) {
//   return (
//     <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full ">
//       <div>
//         <h1 className="text-2xl font-semibold p-1">{name}</h1>
//       </div>
//       <div className="flex gap-4.5 ">
//         <div>
//           <img className="size-40 " src={image} alt="image" />
//         </div>
//         <div className="details">
//           <div>
//             <div className="flex gap-0.5 ">
//               <IoStar className="text-amber-300 text-2xl" />
//               <IoStar className="text-amber-300 text-2xl" />
//               <IoStar className="text-amber-300 text-2xl" />
//               <IoStar className="text-amber-300 text-2xl" />
//             </div>
//             <h4> Speciality : {spec}</h4>
//             <h4>Bio : {bio}</h4>
//             <h4>Address:{clinicAdderss}</h4>
//           </div>
//         </div>
//       </div>
//       <button onClick={() => makeappointment(id)}>Appointment</button>
//     </div>
//   );
// }

// export default DoctorCard;
//! ========================================== #2 ==================================================

// import React from "react";
// import { IoStar } from "react-icons/io5";

// function DoctorCard({
//   id,
//   name,
//   image,
//   spec,
//   bio,
//   clinicAdderss,
//   makeappointment,
// }) {
//   return (
//     <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full mx-auto">
      
//       {/* Name */}
//       <h1 className="text-2xl font-semibold p-1 text-gray-800">{name}</h1>

//       {/* Content - Responsive layout */}
//       <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
        
//         {/* Doctor Image */}
//         <img
//           className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border-2 border-sky-300"
//           src={image}
//           alt={name}
//         />

//         {/* Details */}
//         <div className="details text-center md:text-left">
          
//           {/* Stars */}
//           <div className="flex justify-center md:justify-start gap-1 mb-1">
//             {[...Array(4)].map((_, i) => (
//               <IoStar key={i} className="text-amber-400 text-xl" />
//             ))}
//           </div>

//           <h4 className="text-gray-700">
//             <span className="font-semibold">Speciality:</span> {spec}
//           </h4>
//           <h4 className="text-gray-700">
//             <span className="font-semibold">Bio:</span> {bio}
//           </h4>
//           <h4 className="text-gray-700">
//             <span className="font-semibold">Address:</span> {clinicAdderss}
//           </h4>
//         </div>
//       </div>

//       {/* Button */}
//       <button
//         onClick={() => makeappointment(id)}
//         className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300"
//       >
//         Book Appointment
//       </button>
//     </div>
//   );
// }

// export default DoctorCard;
import React from "react";
import { IoStar } from "react-icons/io5";

function DoctorCard({
  id,
  name,
  image,
  spec,
  bio,
  clinicAdderss,
  makeappointment,
}) {
  return (
    <div className="flex flex-col bg-white p-4 border border-gray-200 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 w-full mx-auto">
      
      {/* Name */}
      <h1 className="text-xl md:text-2xl font-semibold p-1 text-gray-800 text-center md:text-left">
        {name}
      </h1>

      {/* Content - Responsive layout */}
      <div className="flex flex-col md:flex-row gap-4 items-center md:items-start">
        
        {/* Doctor Image */}
        <img
          className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-full border-2 border-sky-300"
          src={image}
          alt={name}
        />

        {/* Details */}
        <div className="details w-full text-center md:text-left mt-2 md:mt-0">
          
          {/* Stars */}
          <div className="flex justify-center md:justify-start gap-1 mb-2">
            {[...Array(4)].map((_, i) => (
              <IoStar key={i} className="text-amber-400 text-lg md:text-xl" />
            ))}
          </div>

          {/* Info */}
          <div className="space-y-1 md:space-y-2">
            <p className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">Speciality:</span> {spec}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">Bio:</span> {bio}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <span className="font-semibold">Address:</span> {clinicAdderss}
            </p>
          </div>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => makeappointment(id)}
        className="mt-4 bg-sky-500 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 w-full md:w-auto"
      >
        Book Appointment
      </button>
    </div>
  );
}

export default DoctorCard;


