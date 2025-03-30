
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { Toaster } from "../ui/toaster";

interface MainLayoutProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        {children || <Outlet />}
      </main>
      <Toaster />
    </div>
  );
};

export default MainLayout;
