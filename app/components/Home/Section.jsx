import React from "react";

function Section({posts}) {

  return (
    <div>
      <section className="py-10 sm:px-10 lg:py-20 w-screen h-auto ">
      <div className="w-full h-full flex justify-center ">
        <div className=" lg:container w-full p-1">
          <h1 className="px-4 font-semibold text-[20px]">Recent News</h1>
          <div className="w-full h-full flex flex-col sm:flex-row  ">
            {/* left side */}
            <div className="lg:w-3/4 m-3 h-auto  ">
             {posts.map((item,index)=>(
              <NewCard item={item}/>
             ))}
            </div>
            {/* right side */}
            <div className="lg:w-1/4 m-3">
              <Article/>
              <PopularPost/>
              <PopularPost/>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}

export default Section;


// left side 
export function NewCard({item}) {
  return (
    <div className="lg:w-[855px] lg:h-[260px] h-[580px] p-1 my-6  ">
      <div className="w-full h-full flex flex-col lg:flex-row relative">
        {/* img */}
        <img className="lg:w-1/4 w-full h-full  hover:scale-90 transition-all duration-300" src={`${item.cover_img ? item.cover_img : "/vercel.svg"}`} alt="" />
        {/* text side */} 
        <div className="flex flex-col w-full h-full">
          {/* text-1 */}
          <span className="lg:text-[24px] lg:w-[700px] mt-4 py-2   px-4 bg-slate-200 static lg:absolute right-5">
            {item.post_title && item.post_title}
          </span>
          {/* text & date */}
          <div className="static lg:absolute lg:bottom-2 px-3 mt-2 lg:mt-0 ">
          <span className="text-[14px]">
            {item.post_shortdesc && item.post_shortdesc}
          </span>
         <div className=" text-[12px] py-2 text-gray-400">
            <span className="bg-orange-500 p-1 font-semibold text-white">{item.post_category}</span>
            <span> 21 JULY, 2017 /</span>
            <span> {item.user_name && item.user_name}</span>
            <span> {item.post_id}</span>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// right side trend

export function Article() {
  return (
    <div className="w-full h-auto mt-5 border border-1">
        <div className="h-auto">
          {/* title */}
            <h1 className="font-semibold mb-8 text-[18px] underline">Trend Videos</h1>
            <div className="p-2 lg:p-0">
              {/* img */}
              <img className="h-[210px] hover:scale-90 transition-all duration-300" src="vercel.svg" alt="" />
              {/* subject */}
              <span className="py-4 font-semibold text-[20px] tracking-tighter leading-3	">Lorem ipsum dolor sit amet consectetur.</span>
            </div>
            <div className="p-2 lg:p-0">
              {/* img */}
              <img className="h-[210px] hover:scale-90 transition-all duration-300" src="vercel.svg" alt="" />
              {/* subject */}
              <span className="py-4 font-semibold text-[20px] tracking-tighter leading-3">Lorem ipsum dolor sit amet consectetur.</span>
            </div>
            <div className="p-2 lg:p-0">
              {/* img */}
              <img className="h-[210px] hover:scale-90 transition-all duration-300" src="vercel.svg" alt="" />
              {/* subject */}
              <span className="py-4 font-semibold text-[20px] tracking-tighter leading-3  ">Lorem ipsum dolor sit amet consectetur.</span>
            </div>
        </div>
        
    </div>
  )
}

// right side populer post

export function PopularPost() {
  return (
    <div className="mt-10">
      <h1 className="font-semibold mb-8 text-[18px] underline">Populer Post</h1>
      <div>
        {/* 1 */}
        <div className="flex gap-x-3">
          <img className="w-[50px]" src="vercel.svg" alt="" />
          <div className="flex flex-col">
          <span className="font-semibold leading-[24px]">Lorem ipsum dolor sit amet consectetur.</span>
          <span className="text-[10px] py-2">12 JAN, 2016</span>
          </div>
        </div>
        {/* 2 */}
        <div className="flex gap-x-3">
          <img className="w-[50px]" src="vercel.svg" alt="" />
          <div className="flex flex-col">
          <span className="font-semibold leading-[24px]">Lorem ipsum dolor sit amet consectetur.</span>
          <span className="text-[10px] py-2">12 JAN, 2016</span>
          </div>
        </div>
        {/* 3 */}
        <div className="flex gap-x-3">
          <img className="w-[50px]" src="vercel.svg" alt="" />
          <div className="flex flex-col">
          <span className="font-semibold leading-[24px]">Lorem ipsum dolor sit amet consectetur.</span>
          <span className="text-[10px] py-2">12 JAN, 2016</span>
          </div>
        </div>
      </div>
    </div>
  )
}





