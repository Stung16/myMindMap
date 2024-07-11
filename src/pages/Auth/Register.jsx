import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLoginWithGoogle, handleRegister } from "@/services/auth.service";
import Loading from "@/components/Loading";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [hide, sethide] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo?.id) {
      navigate("/");
    }
  }, [userInfo, navigate]);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await handleRegister(data);
      if (res.status === 201) {
        toast.success("Register success!");
        navigate("/signin");
      } else {
        toast.error("Some thing went wrong!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wrong!");
    } finally {
      setLoading(false);
    }
  };
  const handleRedirect = async () => {
    const res = await handleLoginWithGoogle();
    if (res.status === 200) {
      window.location.href = res.metadata;
    }
  };
  return (
    <>
      <Helmet>
        <title>Register | Mindmap</title>
        <meta name="description" content="register mindmap" />
      </Helmet>
      <div className="flex justify-center gap-6 mt-16">
        <div>
          <h3 className="text-[2.5rem] mb-2 font-bold text-black">
            Get started
          </h3>
          <p className="text-lg text-gray">with one of these services</p>
          <div>
            <Button
              onClick={handleRedirect}
              size="lg"
              className="flex items-center w-full my-4 font-semibold  border-[#eee] text-[18px] border-[3px]  border-solid bg-transparent text-[#0af] py-5 hover:text-[#48d9fa]"
            >
              <FcGoogle className="mr-2 text-[30px]" />
              Sign in with Google
            </Button>
          </div>
        </div>
        <div className="flex flex-col border-l-2 border-solid border-blue1 pl-6 bg-white !z-[199] relative items-center justify-center">
          <h3 className="mb-2 text-xl font-semibold">
            with your email address
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-[20rem] mx-auto flex flex-col"
          >
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                {...register("name", {
                  required: true,
                })}
              />
            </div>
            <p className="text-[#f73d7b] font-semibold text-[13.5px]">
              {errors.name && "Please enter your name!"}
            </p>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                {...register("password", { required: true })}
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

            <Button
              size="lg"
              className="w-full h-12 mt-4b bg-[#F73B7A] text-white"
            >
              Sign Up
            </Button>
            <p className="text-center text-black mt-2">
              Do not you have account?{" "}
              <Link className="text-[#f73d7b] font-semibold" to={"/signin"}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
      {loading && (
        <div className="w-full absolute inset-0 opacity-70 h-[100vh] bg-white flex items-center justify-center">
          <Loading />
        </div>
      )}
    </>
  );
}

export default Register;
