import React from "react";
import BrowseDoctors from "./BrowseDoctors";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <section className="bg-sky-100 px-10 dark:bg-gray-900 ">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="/img5.png"
              className="rounded-lg size-[400px]"
              alt="image"
            />
          </div>
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-bold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Your Health, Our Priority
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Book appointments with top doctors, get personalized care, and
              manage your medical records all in one place.
            </p>
            <Link
              to={"doctors-list"}
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-sky-500 hover:opacity-80 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 duration-200"
            >
              Book Appointment
            </Link>
            <a
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium bg-white text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800 duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
      {/* <BrowseDoctors/> */}
    </>
  );
}

export default Home;
