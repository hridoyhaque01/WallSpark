import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/shared/sidenav/SideNav";
import TopNav from "../components/shared/topnav/TopNav";

function Layout() {
  return (
    <div className="h-screen w-full overflow-hidden">
      <TopNav></TopNav>
      <div className="flex h-[calc(100vh-82px)] overflow-auto">
        <SideNav></SideNav>
        <div className="w-full pl-10 relative h-full overflow-auto bg-whiteSemi">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default Layout;
