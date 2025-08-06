import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-sky-950 text-white py-8 px-6">
      <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Links Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:underline">
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">About Clinic</h2>
          <p className="text-sm text-gray-300">
            We provide top medical services with the best doctors. Book your
            appointment online or get in touch with our support team anytime.
          </p>
        </div>

        {/* Social Icons Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-2xl hover:text-blue-500 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-2xl hover:text-pink-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-2xl hover:text-sky-400 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-2xl hover:text-blue-400 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} MediCore . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
