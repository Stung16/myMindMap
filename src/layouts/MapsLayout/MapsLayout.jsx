import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
const MapsLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 py-3 px-7">
        <Outlet />
      </div>
    </div>
  )
}

export default MapsLayout
