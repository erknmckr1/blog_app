import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "react-toastify";
function Layout({ children }) {
  return (
    <div>
      <Header toast={toast} />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
