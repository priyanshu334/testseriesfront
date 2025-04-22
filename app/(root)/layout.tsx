import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="min-h-screen bg-white text-black antialiased font-sans flex flex-col">
      <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      
    </div>;
}