import React from "react";

function  Section({ posts, pNews, pArticle }) {

  console.log(posts)

  return (
    <div>
      <section className="py-10 sm:px-10 lg:py-20 w-screen h-auto ">
        <div className="w-full flex justify-center ">
          <div className=" lg:container w-full p-1 h-auto">
            <h1 className="px-4 font-semibold text-[20px]">Recent News</h1>
            <div className="w-full h-full flex flex-col sm:flex-row">
              {/* left side */}
              <div className="lg:w-3/4 m-3 h-auto  ">
                {posts.map((item, index) => (
                  <NewCard key={index} item={item} />
                ))}
              </div>
              {/* right side */}

              <div className="lg:w-1/4 h-auto m-3">
                <div className="w-full h-auto ">
                <div className="w-full h-full">
                  <h1 className="font-semibold mb-8 text-[18px] underline">Technology News</h1>
                  {pNews.articles.slice(0, 5).map((item, index) => (
                    <Article key={index} item={item} />
                  ))}
                </div>
                <div className="w-full h-full mt-5">
                  <h1 className="font-semibold mb-8 text-[18px] underline">Popular Article</h1>
                  {pArticle.articles.slice(0, 5).map((item, index) => (
                    <PopularPost key={index} item={item} />
                  ))}
                </div>
                </div>
               
                <div>
                </div>
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
export function NewCard({ item }) {
  return (
    <div className="lg:w-[855px] lg:h-[260px] h-[580px] p-1 my-6  ">
      <div className="w-full h-full flex flex-col lg:flex-row relative">
        {/* img */}
        <img className="lg:w-1/4 w-full h-full  hover:scale-90 transition-all duration-300" src={`${item.cover_img ? item.cover_img : "/vercel.svg"}`} alt="" />
        {/* text side */}
        <div className="flex flex-col w-full h-full">
          {/* text-1 */}
          <span className="lg:text-[24px] lg:w-[700px] mt-4 py-2   px-4 bg-slate-200 static lg:absolute right-5">
           <a href={`/postdetail/${item.post_id}`}>{item.post_title && item.post_title}</a>
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

export function Article({ item }) {
  return (
    <div className="w-full h-auto mt-5 border border-1">
      <div className="h-auto">
        {/* title */}

        <div className="p-2 lg:p-0">
          {/* img */}
          <img className="h-[100px] w-full hover:scale-90 transition-all duration-300" src={item.urlToImage} alt="" />
          {/* subject */}
          <span className="p-1 font-semibold text-[14px] tracking-tighter leading-3	"><a className="hover:underline" href={item.url}>{item.title}</a></span>
        </div>
      </div>

    </div>
  )
}

// right side populer post

export function PopularPost({item}) {
  return (
    <div className="mt-10">
      <div>
        {/* 1 */}
        <div className="flex gap-x-3">
          <img className="w-[50px]" src={item.urlToImage} alt="null" />
          <div className="flex flex-col">
            <span className="font-semibold leading-[24px] text-[14px]"><a className="hover:underline" href={item.url}>{item.title}</a></span>
            <div className="flex gap-x-2">
            <span className="text-[10px] py-2">12 JAN, 2016</span>
            <span className="text-[10px] py-2">{item.author}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}





