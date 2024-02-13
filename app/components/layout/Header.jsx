import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUser } from "react-icons/fa";

import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  console.log(isMenuOpen)
  return ( 
    <div className="w-full h-[75px] px-[16px] py-[8px] bg-[#49A9DF] relative z-50 ">
      <div className="w-full h-full  flex  items-center ">
        {/* logo */}
        <div className="w-[250px] text-[16px] font-semibold text-white">
          LOGO
        </div>
        {/* menu */}
        <div className={`sm:w-[calc(100%_-_250px)] w-full flex justify-between ${isMenuOpen ? 'h-[150px] sm:h-full bg-[#49A9DF]' : ''} items-center absolute sm:static left-0 top-16 transition-all duration-300 ease-in-out `}>
        <div className="w-full h-full flex flex-col items-center  sm:flex-row ">
            <nav className="sm:w-[calc(100%_-_180px)] w-full h-full ">
              <ul className="flex w-full h-full items-center text-white">
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  Home
                </li>
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  News
                </li>
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  Reviews
                </li>
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  Videos
                </li>
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  Contact Us
                </li>
              </ul>
            </nav>
            {/* icons */}
            <div className="w-[180px] h-full flex  items-center justify-center gap-x-3 px-2  text-white ">
              <div className="px-2"><a href="/auth/login"><FaUser /></a></div>
              <div className="px-2">a</div>
              <div className="px-2">a</div>
            </div>
          </div>
        </div>
        {/* burger ıcon */}
        <div className="sm:hidden  text-white font-semibold text-[20px] absolute right-6 ">
            <CiMenuBurger onClick={toggleBurger} />
          </div>
      </div>
    </div>
  );
}

export default Header;
