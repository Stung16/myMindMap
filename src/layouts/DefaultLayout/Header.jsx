// import { IoArrowForward } from "react-icons/io5"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { IoArrowForward } from "react-icons/io5"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import LogoIconHome from "@/icons/LogoIconHome"
import { logout } from "@/services/auth.service"

function Header() {
  const location = useLocation()
  const pathname = location.pathname
  const [isHeaderActive, setIsHeaderActive] = useState(false)
  const userInfo = useSelector((state) => state.auth.userInfo)
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 200 ? setIsHeaderActive(true) : setIsHeaderActive(false)
    }
    // Thêm sự kiện cuộn
    window.addEventListener("scroll", handleScroll)
    // Xóa sự kiện khi component bị hủy
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])
  const handleLogout = async () => {
    if (userInfo?.id) {
      logout()
    }
    Cookies.remove("accessToken")
    Cookies.remove("refreshToken")
    window.location.href = "/"
  }

  return (
    <header
      className={`fixed top-0 w-full z-20 header bg-[#fff] ${
        isHeaderActive ? "active" : ""
      }`}
    >
      <div className="flex items-center justify-between px-8 py-3 mx-auto">
        <Link to={"/"} className="logo">
          <LogoIconHome className="w-[120px]" />
        </Link>
        <nav className="flex items-center gap-6 px-[10px] py-2 rounded-full bg-blue1 backdrop-blur-md ">
          <Link
            to={"/"}
            className={`${
              pathname === "/" && "bg-[#f2f2f2]"
            } px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]`}
          >
            Home
          </Link>
          <Link
            to={"/features"}
            className={`${
              pathname === "/features" && "bg-[#f2f2f2]"
            } px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]`}
          >
            Features
          </Link>
          <Link
            to={"/contact"}
            className={`${
              pathname === "/contact" && "bg-[#f2f2f2]"
            } px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]`}
          >
            Contact
          </Link>
          <Link
            to={"/my-mindmap"}
            className={`${
              pathname === "/my-mindmap" && "bg-[#f2f2f2]"
            } px-8 py-2 rounded-full text-black nav-link hover:bg-[#f2f2f2]`}
          >
            Mindmap
          </Link>
        </nav>
        {!userInfo?.id ? (
          <div className="flex items-center gap-6 login">
            <Link to={"/signin"} className="text-blue">
              Log In
            </Link>
            <Link
              to={"/signup"}
              className="flex items-center h-12 gap-2 px-6 btn-primary"
            >
              Sign Up <IoArrowForward fontSize={"22px"} />
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <h3 className="text-blue">Hi, {userInfo.name}</h3>
            <button
              className="flex items-center h-12 gap-2 px-6 btn-primary"
              onClick={handleLogout}
            >
              Log out <IoArrowForward fontSize={"22px"} />
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
