import { useState } from "react";
import { Outlet } from "react-router";
import Topbar from "../components/topbar/Topbar";
import Sidebar from "../components/sidebar/Sidebar";


export default function DashboardLayout() {


  return (
    <div className="flex min-h-screen bg-[#F4F7FE] relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Overlay */}
      

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-25 p-4 md:p-8 bg-[#EAEAEA] min-h-screen transition-all duration-300">
        <div className="w-full">
          {/* Reusable TopBar */}
          <Topbar />

          {/* Page Content (Dashboard, Tickets, etc.) */}
          <section className="mt-2 md:pl-5">
            <Outlet />
          </section>
        </div>
      </main>
    </div>
  );
}