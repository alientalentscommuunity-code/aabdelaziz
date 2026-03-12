import React from "react";
import CareerNav from "@/components/CareerNav";
import Footer from "@/components/Footer";

interface CareerLayoutProps {
  children: React.ReactNode;
}

const CareerLayout = ({ children }: CareerLayoutProps) => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <CareerNav />
      <main className="pt-14">{children}</main>
      <Footer />
    </div>
  );
};

export default CareerLayout;
