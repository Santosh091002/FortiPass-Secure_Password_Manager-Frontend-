import React, { useState } from "react";
import Fortipass from "../Images/Forti.png";
import hambg from "../Images/menu.png";

const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu state
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="container h-18 flex justify-center items-center text-[1rem] text-[#2C3E50] font-bold bg-gradient-to-r from-[#2C3E50] to-[#289F4C] text-white ">
      <nav className=" w-[92%] flex items-center justify-between">
        <div className="logo w-auto max-w-[40%] md:w-[14%]">
          <img src={Fortipass} alt="Fortipass" />
        </div>

        <div className="md:hidden hover:cursor-pointer hover:scale-105 active:scale-100">
            <img src={hambg} alt="menu.png" />
        </div>
        <ul className="hidden md:flex justify-between items-center space-x-6 md:space-x-10  ">
          <li className="nav-btn">
            <a href="#">Home</a>
          </li>
          <li className="nav-btn">
            <a href="#">About</a>
          </li>
          <li className="nav-btn">
            <a href="#">Contact</a>
          </li>

          <li>
            <button
              title="Github"
              className="hover:cursor-pointer active:scale-95 transition delay-50 flex items-center rounded-3xl px-2 bg-[#e4e4e4] bg-gradient-to-r bg-[#e4e4e4] text-[#289F4C] hover:bg-[#289F4C] hover:text-white ring-black ring-1">
              <lord-icon
                src="https://cdn.lordicon.com/jjxzcivr.json"
                trigger="loop-on-hover"
                delay = "100"
                stroke="bold"
                className="bg-transparent rounded-full w-9 h-9"
                colors="primary:[#289F4C],secondary:[#2C3E50]"
              ></lord-icon>
              Github
            </button>
          </li>
        </ul>
      </nav>


      
    </div>
  );
};

export default Navbar;
