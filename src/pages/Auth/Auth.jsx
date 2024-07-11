import { unwrapResult } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import Loading from "@/components/Loading"
import { requestLoginGoogle } from "@/stores/middlewares/auth.middleware"
function Auth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const userInfo = useSelector((state) => state.auth.userInfo)
  useEffect(() => {
    if (userInfo?.id) {
      navigate("/")
    }
  }, [userInfo, navigate])
  const handleLog = async () => {
    try {
      const actionResult = await dispatch(requestLoginGoogle(location.search))
      const res = unwrapResult(actionResult)
      console.log(res);
      // if (res?.status === 200) {
      //   Cookies.set("accessToken", res.metadata.tokens.accessToken, {
      //     expires: 60 * 60 * 24 * 7,
      //   })
      //   Cookies.set("idUser", res.metadata.user.id, {
      //     expires: 60 * 60 * 24 * 30,
      //   })
       
      //   client.setToken(res.metadata.tokens.accessToken)
      //   client.setIdUser(res.metadata.user.id)
      //   toast.success("Login success!")
      //   navigate("/")
      // } else {
      //   navigate("/")
      //   window.location.reload()
      // }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleLog()
  }, [])
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Loading />
    </div>
  )
}

export default Auth
