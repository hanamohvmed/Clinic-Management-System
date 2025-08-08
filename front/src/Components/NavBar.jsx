import React, { useState } from "react";
import { CiStethoscope } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";

function NavBar() {
  const [showMenu, setshowMenu] = useState(false);
  return (
    <>
      <div className="flex h-20 m-0 items-center px-6 justify-between py-5  border-b-gray-200 border-b-1 shadow-blue-200 bg-white shadow-sm fixed z-100 w-full ">
        <Link to={""}>
          <div className="flex items-center">
            <CiStethoscope className="text-4xl text-sky-500" />
            <h1 className="font-semibold text-2xl text-blue-950 cursor-pointer  ">
              MediCore
            </h1>
          </div>
        </Link>

        <div className="flex justify-between items-center ">
          <ul className="hidden md:flex gap-5 cursor-pointer ">
            <Link to={""}>
              <li className="hover:text-sky-500 duration-200">Home</li>
            </Link>
            <Link to={"doctors-list"}>
              <li className="hover:text-sky-500 duration-200">Doctors</li>
            </Link>
            <Link to={"my-bookings"}>
              <li className="hover:text-sky-500 duration-200">
                my Appointments
              </li>
            </Link>
          </ul>
        </div>
        <div className="flex gap-4">
          <Link to={"book-appointment"}>
            <button className="cursor-pointer hidden  md:block bg-sky-500 text-amber-50 rounded-3xl p-2 hover:opacity-80 duration-200">
              Appointment
            </button>
          </Link>

          <Link to="/WelcomePage" className="flex items-center">
            <GrLogout className="text-3xl text-sky-500 cursor-pointer" />
          </Link>
        </div>

        <div className=" text-3xl md:hidden cursor-pointer ">
          <RxHamburgerMenu onClick={() => setshowMenu(!showMenu)} />
        </div>
      </div>

      {/* ---------------- Mobile View -------------------- */}
      {showMenu && (
        <div className=" md:hidden flex flex-col  p-4 justify-center bg-white w-full rounded-b-sm ">
          <div className="mt-24 flex flex-col gap-2 justify-center items-center   ">
            <Link to={""} className="hover:text-sky-500">
              Home
            </Link>
            <Link to={"doctors-list"} className="hover:text-sky-500">
              Doctors
            </Link>
            <Link to={"my-bookings"} className="hover:text-sky-500">
              My Appointments
            </Link>
            <Link to={"book-appointment"}>
              <button className="bg-sky-500 text-white rounded-3xl px-4 py-2 hover:opacity-80">
                Appointment
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default NavBar;
