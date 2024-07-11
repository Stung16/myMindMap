import React from "react";
import { Outlet } from "react-router-dom";
import SideBarProfile from "./SideBarProfile";

const ProfileLayout = () => {
  return (
    <div className="flex bg-[#242a2e]">
      <SideBarProfile />
      <div className="flex-1 bg-white rounded-ss-3xl  px-[26px] pt-[15px] h-screen overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
