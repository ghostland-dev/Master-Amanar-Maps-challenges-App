
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Toaster } from "../ui/toaster";

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
