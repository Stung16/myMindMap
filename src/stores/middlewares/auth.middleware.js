import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  getUserFromToken,
  login,
  handlerRefreshToken,
  logout,
  handleLoginWithGoogleCallback,
  handleRegister,
} from "@/services/auth.service"
import { updateProfile } from "@/services/user.service"

export const requestLogin = createAsyncThunk("auth/login", async (payload) => {
  return await login(payload)
})
export const requestLoginGoogle = createAsyncThunk(
  "auth/loginGoogle",
  async (payload) => {
    return await handleLoginWithGoogleCallback(payload)
  }
)
export const requestLogout = createAsyncThunk(
  "auth/logout",
  async (payload) => {
    return await logout(payload)
  }
)
export const requestRegister = createAsyncThunk(
  "auth/register",
  async (payload) => {
    return await handleRegister(payload)
  }
)

export const requestGetUserFromToken = createAsyncThunk(
  "auth/getUserFromToken",
  async () => {
    return await getUserFromToken()
  }
)

export const requestRefreshToken = createAsyncThunk(
  "auth/handlerRefreshToken",
  async (payload) => {
    return await handlerRefreshToken(payload)
  }
)

export const requestUpdateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (payload) => {
    const res = await updateProfile(payload)
    return res.data
  }
)
