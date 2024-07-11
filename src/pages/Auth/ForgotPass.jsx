
import { useState } from "react";
import toast from "react-hot-toast";
import Header from "@/layouts/DefaultLayout/Header";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { handleForgotPassword } from "@/services/auth.service";
import { FaCheckCircle } from "react-icons/fa";
import { Link} from "react-router-dom";
import Loading from "@/components/Loading";
import { Helmet } from "react-helmet";
function ForgotPass() {
  const [hide, setHide] = useState(false);
  const [valueEmail, setValueEmail] = useState("");
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleChange = (e) => {
    const email = e.target.value;
    if (validateEmail(email) === null || valueEmail === "") {
      setErrors(true);
    } else {
      setErrors(false);
    }
    setValueEmail(email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valueEmail) {
      toast.error("Please enter your email!");
    } else if (!errors) {
      try {
        setLoading(true);
        const res = await handleForgotPassword({ email: valueEmail });
        if (res.status === 200) {
          setHide(true);
          setValueEmail("");
        } else {
          toast.error("Account not exist!");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="relative">
      <Helmet>
        <title>Forgot Password | Mindmap</title>
        <meta name="description" content="forgot password mindmap" />
      </Helmet>
      <Header />
      <div className="w-[36rem] h-[100vh] flex flex-col justify-center mx-auto">
        <form
          className="p-6 border border-solid rounded-lg shadow-xl border-blue1"
          onSubmit={handleSubmit}
        >
          <h3 className="pb-4 text-2xl">Find your account.</h3>
          <p className="py-2 text-lg">
            Please enter your email to search for your account.
          </p>
          <Input
            type="email"
            placeholder="Enter your email!"
            onChange={handleChange}
            value={valueEmail}
          />
          <p className="text-red-500">
            {errors && "Please enter the correct email format!"}
          </p>
          <div className="flex justify-end mt-4">
            <button className="px-8 py-3 !rounded-lg btn-primary">
              Search
            </button>
          </div>
        </form>
      </div>
      <AlertDialog onOpenChange={setHide} open={hide}>
        <AlertDialogTrigger asChild></AlertDialogTrigger>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-2xl">
                Success{" "}
                <FaCheckCircle className="inline-block text-green-500 text-xl" />{" "}
                !
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              Please check your email to refresh your password!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="outline-none border-none text-red-500">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction>
              <Link
                to={"/"}
                className="h-12  px-6 btn-primary flex  justify-center items-center"
              >
                Go home
              </Link>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white opacity-70">
          <Loading />
        </div>
      )}
    </div>
  );
}

export default ForgotPass;
