import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";


function Header({toast}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSetting, setShowSetting] = useState(false)
  const {data:session} = useSession();
  
  const toggleBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const settingSelect = () => {
    setShowSetting(!showSetting)
  }

  const handleSignOut = () => {
    if(confirm("Are you sure for sign out ? ")){
      signOut({
        redirect:false
      });
      toast.success("Successfull Exit.")
   
    }

  }
  return (
    <div className="w-full h-[75px] px-[16px] py-[8px] bg-[#49A9DF] relative z-50 ">
      <div className="w-full h-full  flex  items-center ">
        {/* logo */}
        <div className="w-[250px] text-[16px] font-semibold text-white">
          LOGO
        </div>
        {/* menu */}
        <div className={`sm:w-[calc(100%_-_250px)] w-full flex justify-between ${isMenuOpen ? 'h-[100px] sm:h-full bg-[#49A9DF]' : 'hidden sm:block'} items-center absolute sm:static left-0 top-16 transition-all duration-300 ease-in-out `}>
          <div className="w-full h-full flex flex-col items-center  sm:flex-row ">
            <nav className="sm:w-[calc(100%_-_180px)] w-full h-full ">
              <ul className="flex w-full h-full items-center text-white">
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  <a href="/">Home</a>
                </li>
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  <a href="/news">News</a>
                </li>
                <li className="px-[14px] py-[12px] text-[16px] font-semibold ">
                  Contact Us
                </li>
              </ul>
            </nav>
            {/* icons */}
            <div className="w-[180px] h-full flex  items-center justify-center gap-x-3 px-2  text-white ">
              <div className="px-2"><a href="/auth/login"><FaUser /></a></div>
              <div   className="relative w-[100px] ">
                <button className="flex items-center" onClick={settingSelect}>
                  <FiSettings />
                </button>
                {showSetting && (
                  <div className="absolute top-5 min-w-[100px]  text-black    h-[100px] bg-primary" >
                    <ul className="flex w-auto justify-center items-center flex-col p-2">
                    <li onClick={handleSignOut} className={`text-red-600 font-semibold cursor-pointer ${session?.user.email === undefined ? "hidden" : "block"}`}>Çıkış Yap</li>
                    </ul>
                  </div>
                )}
              </div>

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
