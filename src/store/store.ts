import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import orderReducer from "./orderSlice"
import designReducer from "./designSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    order: orderReducer,
    design: designReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
