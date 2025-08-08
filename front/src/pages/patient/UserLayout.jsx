import React from "react";
import NavBar from "../../Components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer";
function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className=" pt-20 flex-1 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default UserLayout;
