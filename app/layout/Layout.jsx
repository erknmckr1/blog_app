import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
