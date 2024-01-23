import Header from "@/components/layout/Header";
import Carousel from "@/components/Home/Carousel";
import Section from "@/components/Home/Section";
import React from 'react';
import 'tailwindcss/tailwind.css';
export default function Home() {
  return (
  <div className="">
     <Header/>
     <Carousel/>
     <Section/>
  </div>
  );
}
