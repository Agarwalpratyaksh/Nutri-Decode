

import { Link, useNavigate } from "react-router-dom";
import notif from "./assets/notif.svg";
import account from "./assets/account.svg";
import logo from './assets/logo.png';
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function openProfile() {
    navigate("/profile");
  }

  function openHome() {
    navigate("/");
  }

  return (
    <div className="bg-green-500 h-16 flex justify-between items-center px-6 z-50 relative">
      <div className="flex items-baseline justify-center gap-2 ">
        <img
          src={logo}
          alt="logo"
          className="w-10 cursor-pointer"
          onClick={openHome}
        />
        <p className="font-medium cursor-pointer text-lg" onClick={openHome}>
          NutriDecode
        </p>
        
      </div>

      <div className="hidden md:flex items-center gap-8">
        {["Home", "Explore", "Compare", "Scan it", "Contact Us"].map((item, index) => (
          <Link key={index} to={`/${item.toLowerCase().replace(" ", "")}`} className="focus:font-medium">
            {item}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <img className="w-6 cursor-pointer" src={notif} alt="notification" />
        <img
          className="w-6 cursor-pointer"
          src={account}
          alt="account"
          onClick={openProfile}
        />
      </div>

      <div className="md:hidden flex items-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-green-500 flex flex-col items-center md:hidden z-40">
          {["Home", "Explore", "Compare", "Scan it", "Contact Us"].map((item, index) => (
            <Link
              key={index}
              to={`/${item.toLowerCase().replace(" ", "")}`}
              className="py-2 w-full text-center border-b border-green-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <div className="flex gap-4 py-4">
            <img className="w-6 cursor-pointer" src={notif} alt="notification" />
            <img
              className="w-6 cursor-pointer"
              src={account}
              alt="account"
              onClick={openProfile}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;

