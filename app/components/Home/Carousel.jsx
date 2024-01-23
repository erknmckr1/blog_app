import React from "react";

function Carousel() {
  return (
    <div className="w-screen h-[810px]   ">
      <div className="w-full h-full flex flex-col sm:flex-row justify-between items-center py-1 ">
        {/* new card 1  */}
        <div className="h-[500px] sm:h-full sm:w-1/2 w-full relative   ">
          {/* img */}
          <div className="w-full h-full sm:flex justify-center items-center p-2 bg-red-300">
            <img
              className="object-fill hover:scale-110 duration-300 transition-all ease-in-out"
              src="/next.svg"
              alt=""
            />
          </div>
          {/* text */}
          <div className=" w-full sm:h-[250px] ml-3 py-6 absolute bottom-0 text-black flex flex-col sm:gap-y-4 gap-y-1  font-semibold ">
            <span className="sm:w-32 w-24  px-2 py-1 h-10 bg-orange-500 text-white flex items-center justify-start rounded-md">
              technology
            </span>
            <span className="text-black text-[16px] lg:w-[800px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo voluptas quaerat eaque accusamus aliquam possimus cumque
              ex voluptatibus, aut praesentium magni eius porro, sit atque
              itaque, reiciendis assumenda eum eos.
            </span>
            <span>24 JULY, 2017 BY AMANDA</span>
          </div>
        </div>
        {/* new cards 2  */}
        <div className="sm:w-1/2 w-full h-full flex flex-col sm:flex-row gap-x-1 mt-1 sm:mt-0 sm:ml-1">
            {/* 1 */}
          <div className="sm:w-1/2 w-full h-full  bg-black relative">
            <div className="w-full h-full sm:flex justify-center items-center p-2 bg-red-300">
              <img
                className="object-fill hover:scale-110 duration-300 transition-all ease-in-out"
                src="/next.svg"
                alt=""
              />
            </div>
              {/* text */}
          <div className=" w-full sm:h-[250px]  sm:px-4 sm:py-6 absolute bottom-0 text-black flex flex-col sm:gap-y-4 gap-y-1  font-semibold ">
            <span className="sm:w-32 w-24  sm:px-2 sm:py-1 sm:h-10 bg-orange-500 text-white flex items-center justify-start rounded-md">
              technology
            </span>
            <span className="text-black lg:w-[400px] text-[13px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo voluptas quaerat eaque accusamus aliquam possimus cumque
              ex voluptatibus, aut praesentium magni eius porro, sit atque
              itaque, reiciendis assumenda eum eos.
            </span>
            <span>24 JULY, 2017 BY AMANDA</span>
          </div>
          </div>
          {/* 2 */}
          <div className="sm:w-1/2 w-full h-full  bg-black relative mt-1 sm:mt-0">
            <div className="w-full h-full sm:flex justify-center items-center p-2 bg-red-300">
              <img
                className="object-fill hover:scale-110 duration-300 transition-all ease-in-out"
                src="/next.svg"
                alt=""
              />
            </div>
              {/* text */}
          <div className=" w-full sm:h-[250px]  sm:px-4 sm:py-6 absolute bottom-0 text-black flex flex-col sm:gap-y-4 gap-y-1  font-semibold ">
            <span className="sm:w-32 w-24  sm:px-2 sm:py-1 sm:h-10 bg-orange-500 text-white flex items-center justify-start rounded-md">
              technology
            </span>
            <span className="text-black text-[13px] lg:w-[400px]">
              {" "}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Explicabo voluptas quaerat eaque accusamus aliquam possimus cumque
              ex voluptatibus, aut praesentium magni eius porro, sit atque
              itaque, reiciendis assumenda eum eos.
            </span>
            <span>24 JULY, 2017 BY AMANDA</span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
