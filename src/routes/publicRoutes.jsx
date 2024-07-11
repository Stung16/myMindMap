import DefaultLayout from "../layouts/DefaultLayout/DefaultLayout"
import AuthLayout from "../layouts/AuthLayout/AuthLayout"
import { Route } from "react-router-dom"
import GuestMiddleware from "../middlewares/GuestMiddleware"
import Features from "@/pages/Features/Features"
import Contact from "@/pages/Contact/Contact"
import Price from "@/pages/Price/Price"
import Register from "@/pages/Auth/Register"
import Home from "@/pages/Home/Home"
import Login from "@/pages/Auth/Login"
import NotFound from "@/components/NotFound"
import ForgotPass from "@/pages/Auth/ForgotPass"
import Auth from "@/pages/Auth/Auth"
export const publicRoutes = (
  <>
    <Route element={<DefaultLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/features" element={<Features />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/price" element={<Price />} />
    </Route>
    <Route element={<AuthLayout />}>
      <Route element={<GuestMiddleware />}>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/auth/google/callback" element={<Auth />} />
        <Route path="/account/forgot" element={<ForgotPass />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </Route>
  </>
)
