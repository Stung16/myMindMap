import { BiNetworkChart } from "react-icons/bi"
import { TbWorld } from "react-icons/tb"
import { TbTrash } from "react-icons/tb"
import { MdOutlineStarOutline } from "react-icons/md"
import { Link, useLocation } from "react-router-dom"
import LogoIcon from "@/icons/LogoIcon"

function Sidebar() {
  const location = useLocation()
  const pathname = location.pathname

  return (
    <div className="flex flex-col pt-4 px-[10px] w-[240px] bg-[#242a2e] text-white min-h-[100vh]">
      <Link to={"/"} className="mb-5">
        <LogoIcon className="w-28" />
      </Link>
      <Link
        to={"/my-mindmap"}
        className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
          pathname === "/my-mindmap" && "bg-blue"
        }`}
      >
        <BiNetworkChart fontSize={"1.6rem"} />
        <span>My Maps</span>
      </Link>
      <Link
        to={"/maps/favorite"}
        className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
          pathname === "/maps/favorite" && "bg-blue"
        }`}
      >
        <MdOutlineStarOutline fontSize={"1.6rem"} />
        <span>Favorites</span>
      </Link>
      <Link
        to={"/maps/public"}
        className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
          pathname === "/maps/public" && "bg-blue"
        }`}
      >
        <TbWorld fontSize={"1.6rem"} />
        <span>Public</span>
      </Link>
      <Link
        to={"/maps/trashed"}
        className={`flex items-center gap-1 p-2 mb-3 rounded-md hover:bg-blue ${
          pathname === "/maps/trashed" && "bg-blue"
        }`}
      >
        <TbTrash fontSize={"1.6rem"} />
        <span>Trash</span>
      </Link>
    </div>
  )
}

export default Sidebar
