import React, { useEffect, useState } from "react";
import DoctorCard from "../../Components/DoctorCard";
import { IoIosSearch } from "react-icons/io";

// --------------------States----------------------
function BrowseDoctors() {
  const [users, setusers] = useState([]);
  const [filtedUsers, setfiltedUsers] = useState([]);
  //---------------------Api -----------------------
  async function fetchUsers() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (response.ok) {
        const data = await response.json();
        setusers(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  //--------Filter && Search ---------------------
  function getName(name) {
    setfiltedUsers(users.filter((user) => user.name === name));
  }
  function SearchByDoctor(name) {
    setfiltedUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(name.toLowerCase())
      )
    );
  }

  return (
    <>
      <div className=" p-6 flex flex-col w-full md:flex-row  min-h-screen gap-2.5 bg-sky-50">
        {/* ---------------------------- Left Section --------------------------------------- */}
        <div className="bg-white w-full  rounded-2xl p-8 md:w-1/4 border border-gray-200 ">
          <div className="flex items-center  justify-center gap-3">
            <h1 className="font-normal text-xl">Filter specialty </h1>
            <button
              className="cursor-pointer bg-gray-200 rounded-xl p-1  "
              onClick={() => setfiltedUsers(users)}
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-2  md:grid-cols-1  gap-2 mt-4 ">
            {users.map((item) => {
              return (
                <button
                  key={item.id}
                  className="bg-sky-300 cursor-pointer rounded-2xl px-4 "
                  onClick={() => getName(item.name)}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
        {/* ---------------------------- Right Section --------------------------------------- */}
        <div className=" flex flex-col gap-8 px-5  bg-sky-50 w-full md:w-3/4">
          <h1 className=" text-2xl md:text-4xl mt-5 text-center ">
            Find the best doctors and healthcare providers for your needs
          </h1>
          <div className="flex flex-col gap-8  ">
            {/*----------- Search--------------------- */}
            <div className=" flex items-center px-2.5 py-3.5 rounded-4xl bg-gray-50 text-sky-600 shadow-sky-500 shadow-sm  ">
              <IoIosSearch className="text-3xl mr-2.5" />
              <input
                className="w-full text-xl text-sky-600 border-none outline-none bg-transparent"
                placeholder="Enter Doctor Name"
                type="search"
                onChange={(e) => SearchByDoctor(e.target.value)}
              />
            </div>
            {/*----------- ----------------------------- */}
            <div className="flex flex-col gap-3 items-center">
              {(filtedUsers.length > 0 ? filtedUsers : users).map((doctor) => {
                return <DoctorCard name={doctor.name} email={doctor.email} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BrowseDoctors;
