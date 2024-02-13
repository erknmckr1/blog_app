import React from "react";
import { SiGmail } from "react-icons/si";
import { FaInstagram,FaFacebook,FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="w-screen sm:h-[416px] py-16 sm:p-16 bg-black">
      <div className="w-full h-full flex justify-center">
        <div className="w-full h-full flex flex-col  text-white container">
          {/* left side */}
          <div className="w-full h-full flex flex-col sm:flex-row sm:gap-x-5 gap-y-5   ">
            <div className="flex flex-col  gap-y-5">
              {/* title */}
              <span className="text-[50px] sm:text-[32px] font-semibold">Vercel</span>
              <span>
                Tech Blog is a technology blog, we sharing marketing, news and
                gadget articles.
              </span>
              {/* iconlar */}
              <div className="flex gap-x-4 ">
                <a className="hover:bg-[#FF6347] p-1 transition-all duration-300 " href="#"><SiGmail/></a>
                <a className="hover:bg-[#FF6347] p-1 transition-all duration-300" href="#"><FaInstagram/></a>
                <a className="hover:bg-[#FF6347] p-1 transition-all duration-300" href="#"><FaFacebook/></a>
                <a className="hover:bg-[#FF6347] p-1 transition-all duration-300" href="#"><FaLinkedin/></a>
              </div>
              <div className=" flex flex-col sm:flex-row sm:items-center gap-y-3 sm:gap-10 text-black w-full h-full">
                <input className="px-3 py-4 w-auto sm:w-[350px]" type="text" placeholder="enter to email" />
                <button className="w-24 px-3 py-4 text-white bg-blue-500 text-[17px] font-semibold">
                  SUBMIT
                </button>
              </div>
            </div>
            <div className=" flex flex-col gap-y-10 sm:w-[285px] px-3 ">
              <span className="text-[25px] font-semibold ">
                Populer Categories
              </span>
              <ul className="ml-2 flex flex-col gap-y-1">
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
              </ul>
            </div>
            <div className=" flex flex-col gap-y-10 sm:w-[250px] px-3 w-full ">
              <span className="text-[25px] font-semibold">Copyrights</span>
              <ul className="ml-2 flex flex-col gap-y-1 w-full">
                <li className="tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
                <li className=" tracking-[3px] border-b border-dashed ">
                  lorembes
                </li>
              </ul>
            </div>
          </div>

          {/* right side */}
          <div className="w-full flex justify-center items-center mt-10">
            <span>© EC</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
