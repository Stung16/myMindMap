import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  useState } from "react";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import authSlice from "@/stores/slices/auth.slice";
const { updateLoading } = authSlice.actions;
import { handleLoginWithGoogle, login } from "@/services/auth.service";
import { client } from "@/utils/clientUtils";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
function Login() {
  const [hide, sethide] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      dispatch(updateLoading(true));
      const res = await login(data);
      if (res.status === 200) {
        Cookies.set("accessToken", res.data.accessToken, {
          expires: 60 * 60 * 24 * 7,
        });
        Cookies.set("refreshToken", res.data.refreshToken, {
          expires: 60 * 60 * 24 * 30,
        });
        client.setToken(res.data.accessToken);
        toast.success("Login success!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
        toast.error("Email or Password incorrect!");
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(updateLoading(false));
    }
  };
  const handleRedirect = async () => {
    const res = await handleLoginWithGoogle();
    if (res?.status === 200) {
      window.location.href = res.metadata;
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | Mindmap</title>
        <meta name="description" content="login mindmap" />
      </Helmet>
      <div className="flex flex-col mt-16 bg-white !z-[199] relative items-center justify-center">
        <h3 className="text-[2.5rem] mb-2 font-semibold">Log In</h3>
        <form
          action=""
          className="w-[24rem] mx-auto flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="border-[#ddd] border-[2px]"
              {...register("email", {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                required: true,
              })}
            />
          </div>
          <p className="text-[#f73d7b] font-semibold text-[13.5px]">
            {errors.email && "Please enter the correct email format"}
          </p>
          <div className="grid w-full max-w-sm items-center gap-1.5 relative my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type={hide ? "text" : "password"}
              id="password"
              className="border-[#ddd] border-[2px]"
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
            <div
              onClick={() => sethide(!hide)}
              className="absolute right-2 bottom-[10px] cursor-pointer  z-10"
            >
              {!hide ? <FaRegEyeSlash /> : <FaRegEye />}
            </div>
          </div>
          <p className="text-[#f73d7b] font-semibold text-[13.5px]">
            {errors.password && "Please enter your password!"}
          </p>
          <Link to={"/account/forgot"} className="mt-2 ml-auto text-end hover:text-[#ddd] w-max select-none">
            Forgot password?
          </Link>
          <Button
            size="lg"
            type="submit"
            className="w-full h-12 mt-4 bg-[#f73d7b] hover:bg-[#f73d7be2] text-white"
          >
            Login
          </Button>
          <p className="text-center font-[500] mt-4"> OR </p>
          <div>
            <Button
              size="lg"
              onClick={handleRedirect}
              className="flex items-center w-full my-4 font-semibold border boder-[#eee] border-solid bg-transparent text-black hover:bg-slate-600 hover:text-white"
            >
              <FcGoogle fontSize={"1.4rem"} />
              Sign in with Google
            </Button>
          </div>
          <p className="text-center text-black">
            Do not you have account?{" "}
            <Link
              className="text-[#f73d7b] font-semibold"
              to={"/signup"}
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
