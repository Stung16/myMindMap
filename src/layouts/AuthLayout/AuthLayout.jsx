import { Outlet } from "react-router-dom";
import "./AuthLayout.scss";
import { Link } from "react-router-dom";

import LogoIconHome from "@/icons/LogoIconHome";
const AuthLayout = () => {
  return (
    <div className="auth">
      <Link to={"/"} className="logo">
        <LogoIconHome className="w-[120px] ml-6 mt-6" />
      </Link>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
