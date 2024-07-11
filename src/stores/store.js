import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/auth.slice"
import mapsSlice from "./slices/maps.slice"

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    maps: mapsSlice.reducer,
  },
})
