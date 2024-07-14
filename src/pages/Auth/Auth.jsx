import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
import { requestLoginGoogle } from "@/stores/middlewares/auth.middleware";
import { client } from "@/utils/clientUtils";
function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = useSelector((state) => state.auth.userInfo);
  useEffect(() => {
    if (userInfo?.id) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const handleLog = async () => {
    try {
      const actionResult = await dispatch(requestLoginGoogle(location.search));
      const res = unwrapResult(actionResult);
      if (res?.status === 200) {
        Cookies.set("accessToken", res.data.accessToken, {
          expires: 60 * 60 * 24 * 7,
        });
        Cookies.set("refreshToken", res.data.refreshToken, {
          expires: 60 * 60 * 24 * 30,
        });

        client.setToken(res.data.accessToken);
        toast.success("Login success!");
        window.location.href = "/";
      } else {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLog();
  }, []);
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Loading />
    </div>
  );
}

export default Auth;
