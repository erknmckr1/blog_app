import React from "react";

function Carousel({ posts}) {
  // posts data son 3 verıyı al sıralamayı tersıne cevır ve carousel de goster...
  const sortingData = posts
  
console.log(sortingData)
  
  return (
    <div className="w-screen h-[810px] m:h-[500px] lg:h-[600px] xl:h-[700px] 2xl:h-[810px] overflow-hidden duration-300 transition-all  ">
      <div className="w-full h-full flex flex-col sm:flex-row justify-between items-center py-1 ">
        {/* new card 1  */}
        <div className="h-[500px] sm:h-full sm:w-1/2 w-full relative overflow-hidden  ">
          {/* img */}
          <div className="w-full h-full sm:flex justify-center items-center sm:p-2 bg-red-300">
            <img
              className=" absolute w-full h-full hover:scale-110 duration-300 transition-all ease-in-out"
              src={`${sortingData[0].cover_img}`}
              alt=""
            />
          </div>
          {/* text */}
          <div className=" w-[400px] sm:h-[250px] ml-3 py-6 absolute bottom-0 text-black flex flex-col sm:gap-y-4 gap-y-1  font-semibold ">
            <span className="sm:w-32 w-24  px-2 py-1 h-10 bg-orange-500 text-white flex items-center justify-start rounded-md">
              {sortingData[0].post_category}
            </span>
            <span className="text-white text-[18px] font-semibold  lg:w-[700px]">
              <a href={`/postdetail/${sortingData[0].post_id}`}>{sortingData[0].post_shortdesc}</a>
            </span>
            <div className="text-white">
              <span>24 JULY, 2017</span>
              <span> {sortingData[0].user_name}</span>
            </div>

          </div>
        </div>
        {/* new cards 2  */}
        <div className="sm:w-1/2 w-full h-full flex flex-col sm:flex-row gap-x-1 mt-1 sm:mt-0 sm:ml-1">
          {sortingData.slice(1,3).map((item, index) => (
            <div key={index} className="sm:w-1/2  w-full h-full  bg-black relative overflow-hidden">
              <div className="w-full h-full sm:flex justify-center items-center sm:p-2 bg-red-300">
                <img
                  className="absolute z-0 w-full h-full hover:scale-110 duration-300 transition-all ease-in-out"
                  src={item.cover_img}
                  alt=""
                />
              </div>
              {/* text */}
              <div className="  w-full sm:h-[250px]  sm:px-4 sm:py-6 absolute  bottom-0 text-black flex flex-col sm:gap-y-4 gap-y-1  font-semibold ">
                <span className="sm:w-32 w-24  sm:px-2 sm:py-1 h-7 sm:h-10 bg-orange-500 text-white flex items-center justify-center rounded-sm">
                  {item.post_category}
                </span>
                <span className="text-white w-auto  text-[16px]">
                  {" "}
                 <a  href={`/postdetail/${item.post_id}`}> {item.post_shortdesc}</a>
                </span>
                <div className="text-white">
                  <span>24 JULY, 2017</span>
                  <span> {item.user_name}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default Carousel;
