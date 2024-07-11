import { useSelector } from "react-redux"
import { Navigate, Outlet, useParams } from "react-router-dom"
import useSWR from "swr"
import Loading from "@/components/Loading"
import { fetcher } from "@/utils/fetcher"

const AuthMiddleware = () => {
  const params = useParams()
  const { id } = params
  const apiServer = `/api/mindmaps/${id}`
  const { data, isLoading } = useSWR(apiServer, fetcher)
  const checkStatus = data?.mindmap?.status
  const userInfo = useSelector((state) => state.auth.userInfo)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <Loading />
      </div>
    )
  }
  if (checkStatus) {
    return <Outlet />
  }
  return userInfo?.id ? <Outlet /> : <Navigate to="/signin" />
}

export default AuthMiddleware
