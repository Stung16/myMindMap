import { BiNetworkChart } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { TbTrash } from "react-icons/tb";
import { MdOutlineStarOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import "../../../src/assets/css/style.css";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import LogoIcon from "@/icons/LogoIcon";

const SideBarProfile = () => {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <div className="flex flex-col pt-4 px-[10px] w-[240px] bg-[#242a2e] text-white min-h-[100vh]">
      <Link to={"/"} className="mb-5">
        <LogoIcon className="w-28" />
      </Link>
      <Link
        to={"/profile"}
        className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
          pathname === "/profile" && "bg-blue"
        }`}
      >
        <FaUser fontSize={"1.6rem"} />
        <span>Profile</span>
      </Link>
      <Link
        to={"/profile/account"}
        className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
          pathname === "/profile/account" && "bg-blue"
        }`}
      >
        <FaKey fontSize={"1.6rem"} />
        <span>Account</span>
      </Link>
    </div>
  );
};

export default SideBarProfile;
