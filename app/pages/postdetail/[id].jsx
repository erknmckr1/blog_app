import React from "react";
import axios from "axios";
import { Article } from "@/components/Home/Section";
import { PopularPost } from "@/components/Home/Section";
function PostDetail({ postDetail, populerNews, populerArticle }) {
  console.log(postDetail);
  return (
    <div>
      <section className="py-10 sm:px-10 lg:py-20 w-screen h-auto ">
        <div className="w-full flex justify-center">
          <div className=" lg:container w-full sm:p-1 h-auto">
            {/* left & right */}
            <div className="w-full h-full flex flex-col sm:flex-row">
              {/* left*/}
              <div className="lg:w-3/4 m-3 h-auto  ">
                <div className="w-full h-full flex flex-col items-center gap-y-2">
                  <span className="bg-orange-500 text-center p-1 font-semibold text-white">
                    {postDetail.post_category && postDetail.post_category}
                  </span>
                  <span className="p-1 text-[25px] text-center font-semibold text-black">
                    {postDetail.post_title && postDetail.post_title }
                  </span>
                  <div className="text-[10px] text-center">
                    <span className="p-1 text-black">21 JULY, 2017 /</span>
                    <span className="p-1 text-black">
                      {postDetail.user_name && postDetail.user_name}
                    </span>
                    <div
                      className="text-[15px]"
                      dangerouslySetInnerHTML={{
                        __html: postDetail.post_content,
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="lg:w-1/4 h-auto m-3">
                <div className="w-full h-auto ">
                  <div className="w-full h-full">
                    <h1 className="font-semibold mb-8 text-[18px] underline">
                      Technology News
                    </h1>
                    {populerNews.articles.slice(0, 5).map((item, index) => (
                      <Article key={index} item={item} />
                    ))}
                  </div>
                  <div className="w-full h-full mt-5">
                    <h1 className="font-semibold mb-8 text-[18px] underline">
                      Popular Article
                    </h1>
                    {populerArticle.articles.slice(0, 5).map((item, index) => (
                      <PopularPost key={index} item={item} />
                    ))}
                  </div>
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostDetail;

export const getServerSideProps = async (context) => {
  const { req, params } = context;
  const { id } = params; // 'id' parametresini almak için

  const postsResponse = await axios.get(
    `${process.env.NEXT_PUBLIC_url}content/${id}`
  );
  const populerNewsResponse = await axios.get(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a8ae07b7778c4e50aab671e9a3afc737"
  );
  const populerArtıcle = await axios.get(
    "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=a8ae07b7778c4e50aab671e9a3afc737"
  );

  return {
    props: {
      postDetail: postsResponse ? postsResponse.data : null,
      populerNews: populerNewsResponse ? populerNewsResponse.data : null,
      populerArticle: populerArtıcle ? populerArtıcle.data : null,
    },
  };
};
