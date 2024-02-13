import Carousel from "@/components/Home/Carousel";
import Section from "@/components/Home/Section";
import React from "react";
import "tailwindcss/tailwind.css";
import Head from "next/head";
export default function Home() {
  return (
    <div className="">
      <Head>
        <title>EC BLOG</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
       
      </Head>
      <>
      <Carousel />
      <Section />
      </>
      
    </div>
  );
}
