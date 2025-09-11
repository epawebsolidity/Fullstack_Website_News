import React, { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "../Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Navbar />
      <main className="pt-8 md:pt-20">{children}</main>
      <Footer/>
    </>
  );
}
