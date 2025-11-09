import React from "react";
import Fortipass from "../Images/Forti.png";

const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full bg-[#2C3E50] shadow-2xl h-16 flex items-center justify-center">
      <div className="w-[92%] flex items-center justify-between">
        <div className="w-auto max-w-[30%] md:max-w-[12%]">
          <img src={Fortipass} alt="Fortipass" />
        </div>

        <div className="text-white text-xs md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} FortiPass. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
