import { createSlice } from "@reduxjs/toolkit";
import {
  requestGetUserFromToken,
  requestLogin,
  requestLoginGoogle,
  requestRegister,
  requestUpdateProfile,
} from "../middlewares/auth.middleware";

const initialState = {
  userInfo: null,
  loading: false,
  loadingLogin: true,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    const actionList = [requestLogin, requestLoginGoogle, requestRegister];
    actionList.forEach((action) => {
      builder.addCase(action.pending, (state) => {
        state.loading = true;
      });
    });
    actionList.forEach((action) => {
      builder.addCase(action.rejected, (state) => {
        state.loading = false;
      });
    });
    /**
     * requestLogin
     */
    builder.addCase(requestLogin.fulfilled, (state, action) => {
      state.userInfo = action?.payload?.metadata?.user;
      state.loading = false;
    });

    /**
     * requestLoginGoogle
     */
    builder.addCase(requestLoginGoogle.fulfilled, (state, action) => {
      state.loading = false;
    });

    /**
     * requestRegister
     */
    // builder.addCase(requestRegister.fulfilled, (state, action) => {
    //   state.userInfo = action?.payload?.metadata?.user
    //   state.loading = false
    // })

    /**
     * requestGetUserFromToken
     */
    builder.addCase(requestGetUserFromToken.pending, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(requestGetUserFromToken.rejected, (state) => {
      state.loadingLogin = true;
    });
    builder.addCase(requestGetUserFromToken.fulfilled, (state, action) => {
      state.userInfo = action.payload?.data;
      state.loadingLogin = false;
    });

    /**
     * Update profile
     */
    // builder.addCase(requestUpdateProfile.fulfilled, (state, action) => {
    //   state.userInfo = action.payload.metadata
    //   state.loadingLogin = false
    // })
  },
});

export default authSlice;
